import {
    MAX_OPTION_LENGTH,
    MAX_QUESTION_LENGTH,
    MIN_OPTION_LENGTH,
    MIN_QUESTION_LENGTH,
    MIN_CHECKLIST_OPTIONS
} from '../ChecklistConstants';
import {
    canHaveOptions,
    filtersOptions,
    getDuplicateQuestionKeys,
    getFilledOptions,
    getAvailableActions,
    getDuplicateOptionIds,
    getQuestionIndex,
    getSourceQuestion
} from './ChecklistUtils';

import { CHECKLIST_RULE_ACTION } from 'Enum';

import type {
    ChecklistFormErrorStateProps,
    ChecklistOptionProps,
    ChecklistFormProps,
    ChecklistQuestionErrorProps,
    ChecklistQuestionProps,
    ChecklistRuleErrorProps,
    ChecklistRuleProps
} from 'interfaces';

type FieldError = { error: boolean; errorMsg?: string } | undefined;

type FieldValidator = (
    value: string | null,
    isRequired?: boolean,
    meta?: { min?: number; max?: number }
) => { hasError: boolean; errorMsg: string | undefined };

const invalid = (errorMsg: string) => ({ error: true, errorMsg });

const toFieldError = ({
    hasError,
    errorMsg
}: {
    hasError: boolean;
    errorMsg?: string;
}) => ({ error: hasError, errorMsg });

const listMissing = (values: string[], available: string[]) =>
    values.filter(value => !available.includes(value));

const optionValues = (question?: ChecklistQuestionProps) =>
    (question?.options ?? []).map(({ value }) => value);

/* ------------------------------------------------------------------ rules */

const getDependentIdError = (
    checklistForm: ChecklistFormProps,
    question: ChecklistQuestionProps,
    rule: ChecklistRuleProps
): FieldError => {
    if (!rule.dependentId) {
        return invalid('Select a question');
    }

    const source = getSourceQuestion(checklistForm, rule.dependentId);

    if (!source) {
        return invalid('That question was deleted');
    }
    if (
        getQuestionIndex(checklistForm, source.key) >=
        getQuestionIndex(checklistForm, question.key)
    ) {
        return invalid('Must reference an earlier question');
    }
    if (!canHaveOptions(source.type)) {
        return invalid('That question is no longer a choice question');
    }

    return undefined;
};

const getDependentOptionsError = (
    checklistForm: ChecklistFormProps,
    rule: ChecklistRuleProps
): FieldError => {
    if (!rule.dependentOptions.length) {
        return invalid('Select a value');
    }

    const source = getSourceQuestion(checklistForm, rule.dependentId);

    if (!source) {
        return undefined; // already reported against dependentId
    }

    const missing = listMissing(rule.dependentOptions, optionValues(source));

    return missing.length
        ? invalid(`No longer an option: ${missing.join(', ')}`)
        : undefined;
};

const getRuleActionError = (
    question: ChecklistQuestionProps,
    rule: ChecklistRuleProps
): FieldError => {
    if (!rule.ruleAction) {
        return invalid('Select an action');
    }

    return getAvailableActions(question.type).includes(rule.ruleAction)
        ? undefined
        : invalid('Not allowed for this question type');
};

const getSelectedOptionsError = (
    question: ChecklistQuestionProps,
    rule: ChecklistRuleProps
): FieldError => {
    if (!filtersOptions(rule.ruleAction)) {
        return undefined;
    }
    if (!rule.selectedOptions.length) {
        return invalid(
            rule.ruleAction === CHECKLIST_RULE_ACTION.ONLY_HIDE
                ? 'Select at least one option to hide'
                : 'Select at least one option to show'
        );
    }

    const missing = listMissing(rule.selectedOptions, optionValues(question));

    return missing.length
        ? invalid(`No longer an option: ${missing.join(', ')}`)
        : undefined;
};

const getRuleErrors = (
    checklistForm: ChecklistFormProps,
    question: ChecklistQuestionProps,
    rule: ChecklistRuleProps
): ChecklistRuleErrorProps =>
    dropEmpty({
        dependentId: getDependentIdError(checklistForm, question, rule),
        dependentOptions: getDependentOptionsError(checklistForm, rule),
        ruleAction: getRuleActionError(question, rule),
        selectedOptions: getSelectedOptionsError(question, rule)
    });

const dropEmpty = (errors: Record<string, FieldError>) =>
    Object.entries(errors).reduce(
        (kept, [field, error]) => (error ? { ...kept, [field]: error } : kept),
        {}
    );

/* -------------------------------------------------------------- questions */

type OptionErrors = NonNullable<ChecklistQuestionErrorProps['options']>;
type RuleErrors = NonNullable<ChecklistQuestionErrorProps['rules']>;

const getOptionErrorsById = (
    options: ChecklistOptionProps[],
    validateField: FieldValidator
): OptionErrors => {
    const duplicateIds = getDuplicateOptionIds(options);

    return getFilledOptions(options).reduce<OptionErrors>(
        (optionErrors, { id, value }) => {
            const optionError = duplicateIds.includes(id)
                ? invalid('Duplicate MCQ Options')
                : toFieldError(
                      validateField(value, false, {
                          min: MIN_OPTION_LENGTH,
                          max: MAX_OPTION_LENGTH
                      })
                  );

            return { ...optionErrors, [id]: optionError };
        },
        {}
    );
};

const getMissingOptionsMsg = (options: ChecklistOptionProps[]) =>
    getFilledOptions(options).length < MIN_CHECKLIST_OPTIONS
        ? `Add at least ${MIN_CHECKLIST_OPTIONS} option`
        : undefined;

const getRuleErrorsById = (
    checklistForm: ChecklistFormProps,
    question: ChecklistQuestionProps
): RuleErrors =>
    question.rules.reduce<RuleErrors>(
        (ruleErrors, rule) => ({
            ...ruleErrors,
            [rule.id]: getRuleErrors(checklistForm, question, rule)
        }),
        {}
    );

const getQuestionErrors = (
    checklistForm: ChecklistFormProps,
    question: ChecklistQuestionProps,
    validateField: FieldValidator,
    isDuplicate: boolean
): ChecklistQuestionErrorProps => ({
    question: isDuplicate
        ? invalid('Duplicate question')
        : toFieldError(
              validateField(question.question, true, {
                  min: MIN_QUESTION_LENGTH,
                  max: MAX_QUESTION_LENGTH
              })
          ),
    ...(canHaveOptions(question.type)
        ? {
              options: getOptionErrorsById(question.options, validateField),
              optionsErrorMsg: getMissingOptionsMsg(question.options)
          }
        : {}),
    ...(question.rules.length
        ? { rules: getRuleErrorsById(checklistForm, question) }
        : {})
});

const hasAnyError = ({
    question,
    options,
    optionsErrorMsg,
    rules
}: ChecklistQuestionErrorProps) =>
    !!question?.error ||
    !!optionsErrorMsg ||
    Object.values(options ?? {}).some(({ error }) => error) ||
    Object.values(rules ?? {}).some(
        ruleError => Object.keys(ruleError).length > 0
    );

export const getChecklistFormErrors = (
    checklistForm: ChecklistFormProps,
    validateField: FieldValidator
) => {
    const duplicateKeys = getDuplicateQuestionKeys(checklistForm);

    const formErrorState = checklistForm.reduce(
        (errorState, question) => ({
            ...errorState,
            [question.key]: getQuestionErrors(
                checklistForm,
                question,
                validateField,
                duplicateKeys.includes(question.key)
            )
        }),
        {} as ChecklistFormErrorStateProps
    );

    return {
        formErrorState,
        hasFormError: Object.values(formErrorState).some(hasAnyError),
        firstErrorKey: checklistForm.find(({ key }) =>
            hasAnyError(formErrorState[key])
        )?.key
    };
};
