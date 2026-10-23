import _ from 'lodash';
import {
    CHECKLIST_RULE_ACTIONS_BY_TYPE,
    DEFAULT_QUESTION_TYPE,
    INITIAL_OPTION_ROWS,
    LEGACY_QUESTION_TYPE
} from '../ChecklistConstants';

import { CHECKLIST_QUESTION_TYPE, CHECKLIST_RULE_ACTION } from 'Enum';

import type {
    ChecklistFieldProps,
    ChecklistFormProps,
    ChecklistOptionProps,
    ChecklistQuestionProps,
    ChecklistRuleFieldProps,
    ChecklistRuleProps
} from 'interfaces';

let optionIdCounter = 0;
let ruleIdCounter = 0;

export const createOption = (value = ''): ChecklistOptionProps => {
    optionIdCounter += 1;
    return { id: `opt_${optionIdCounter}`, value };
};

export const toOptions = (
    values: string[],
    blankRows = 1
): ChecklistOptionProps[] =>
    values.length
        ? values.map(createOption)
        : Array.from({ length: blankRows }, () => createOption());

export const createRule = (
    rule: Partial<Omit<ChecklistRuleProps, 'id'>> = {}
): ChecklistRuleProps => {
    ruleIdCounter += 1;
    return {
        id: `rule_${ruleIdCounter}`,
        dependentId: '',
        dependentOptions: [],
        ruleAction: '',
        selectedOptions: [],
        ...rule
    };
};

const getNextQuestionKey = (checklistForm: ChecklistFormProps) => {
    const highest = checklistForm.reduce((max, { key }) => {
        const index = Number(key.replace('q_', ''));
        return Number.isNaN(index) ? max : Math.max(max, index);
    }, 0);

    return `q_${highest + 1}`;
};

export const createQuestion = (
    checklistForm: ChecklistFormProps,
    question: Partial<Omit<ChecklistQuestionProps, 'key'>> = {}
): ChecklistQuestionProps => ({
    key: getNextQuestionKey(checklistForm),
    question: '',
    type: DEFAULT_QUESTION_TYPE,
    options: toOptions([], INITIAL_OPTION_ROWS),
    isRequired: true,
    rules: [],
    ...question
});

export const getQuestionIndex = (
    checklistForm: ChecklistFormProps,
    questionKey: string
) => checklistForm.findIndex(({ key }) => key === questionKey);

export const getSourceQuestion = (
    checklistForm: ChecklistFormProps,
    dependentId: string
) => checklistForm.find(({ key }) => key === dependentId);

// only MCQ can have options
export const canHaveOptions = (type: CHECKLIST_QUESTION_TYPE) =>
    type === CHECKLIST_QUESTION_TYPE.MULTIPLE_CHOICE;

const getRepeatedIds = <T>(
    entries: T[],
    getId: (entry: T) => string,
    getText: (entry: T) => string
) => {
    const seen = new Set<string>();

    return entries.reduce((repeatedIds: string[], entry) => {
        const normalisedText = getText(entry).trim().toLowerCase();

        if (!normalisedText) {
            return repeatedIds;
        }

        if (seen.has(normalisedText)) {
            return [...repeatedIds, getId(entry)];
        }

        seen.add(normalisedText);

        return repeatedIds;
    }, []);
};

export const getDuplicateOptionIds = (options: ChecklistOptionProps[]) =>
    getRepeatedIds(
        options,
        ({ id }) => id,
        ({ value }) => value
    );

export const getDuplicateQuestionKeys = (checklistForm: ChecklistFormProps) =>
    getRepeatedIds(
        checklistForm,
        ({ key }) => key,
        ({ question }) => question
    );

export const getFilledOptions = (options: ChecklistOptionProps[]) =>
    options.filter(({ value }) => !!value.trim());

export const getAvailableSources = (
    checklistForm: ChecklistFormProps,
    questionKey: string
): ChecklistFormProps => {
    const index = getQuestionIndex(checklistForm, questionKey);

    return index <= 0
        ? []
        : checklistForm
              .slice(0, index)
              .filter(({ type }) => canHaveOptions(type));
};

export const getAvailableTriggerOptions = (
    checklistForm: ChecklistFormProps,
    question: ChecklistQuestionProps,
    rule: ChecklistRuleProps
): ChecklistOptionProps[] => {
    const source = getSourceQuestion(checklistForm, rule.dependentId);

    const takenValues = question.rules
        .filter(
            sibling =>
                sibling.id !== rule.id &&
                sibling.dependentId === rule.dependentId
        )
        .flatMap(({ dependentOptions }) => dependentOptions);

    return getFilledOptions(source?.options ?? []).filter(
        ({ value }) => !takenValues.includes(value.trim())
    );
};

export const getAvailableActions = (type: CHECKLIST_QUESTION_TYPE) =>
    CHECKLIST_RULE_ACTIONS_BY_TYPE[type];

export const filtersOptions = (ruleAction: CHECKLIST_RULE_ACTION | '') =>
    ruleAction === CHECKLIST_RULE_ACTION.ONLY_SHOW ||
    ruleAction === CHECKLIST_RULE_ACTION.ONLY_HIDE;

export const getQuestionLabel = (
    checklistForm: ChecklistFormProps,
    question: ChecklistQuestionProps
) =>
    `Question ${getQuestionIndex(checklistForm, question.key) + 1}: ${
        question.question || 'Untitled'
    }`;

export const toChecklistForm = (
    selectionChecklist: ChecklistFieldProps[]
): ChecklistFormProps =>
    selectionChecklist.map(
        ({ key, question, type, options, isRequired, rules }) => ({
            key,
            question,
            type: type ?? LEGACY_QUESTION_TYPE,
            options: toOptions(options ?? []),
            isRequired: isRequired ?? true,
            rules: (rules ?? []).map(rule =>
                createRule({
                    dependentId: rule.dependsOnKey,
                    dependentOptions: rule.dependsOnOptions ?? [],
                    ruleAction: rule.action,
                    selectedOptions: rule.selectedOptions ?? []
                })
            )
        })
    );

type CompleteRuleProps = ChecklistRuleProps & {
    ruleAction: CHECKLIST_RULE_ACTION;
};

const isCompleteRule = (rule: ChecklistRuleProps): rule is CompleteRuleProps =>
    !!rule.ruleAction && !!rule.dependentId && canRuleStillFire(rule);

const toRuleField = ({
    dependentId,
    dependentOptions,
    ruleAction,
    selectedOptions
}: CompleteRuleProps): ChecklistRuleFieldProps => ({
    dependsOnKey: dependentId,
    dependsOnOptions: dependentOptions,
    action: ruleAction,
    ...(filtersOptions(ruleAction) ? { selectedOptions } : {})
});

export const toChecklistPayload = (
    checklistForm: ChecklistFormProps
): ChecklistFieldProps[] =>
    checklistForm.map(
        ({ key, question, type, options, isRequired, rules }) => ({
            key,
            question: question.trim(),
            type,
            isRequired,
            ...(canHaveOptions(type)
                ? {
                      options: getFilledOptions(options).map(({ value }) =>
                          value.trim()
                      )
                  }
                : {}),
            rules: rules.filter(isCompleteRule).map(toRuleField)
        })
    );

export const hasDependentRules = (
    checklistForm: ChecklistFormProps,
    questionKey: string
) =>
    checklistForm.some(({ rules }) =>
        rules.some(({ dependentId }) => dependentId === questionKey)
    );

const withoutRulesAimedAt = (
    question: ChecklistQuestionProps,
    questionKey: string
): ChecklistQuestionProps => ({
    ...question,
    rules: question.rules.filter(
        ({ dependentId }) => dependentId !== questionKey
    )
});

// Removing a question also removes every rule that pointed at it
export const removeQuestion = (
    checklistForm: ChecklistFormProps,
    questionKey: string
): ChecklistFormProps =>
    checklistForm
        .filter(({ key }) => key !== questionKey)
        .map(question => withoutRulesAimedAt(question, questionKey));

const pruneOptionFromRule = ({
    rule,
    ruleOwnerKey,
    optionOwnerKey,
    value
}: OptionValueRefProps): ChecklistRuleProps => ({
    ...rule,
    dependentOptions:
        rule.dependentId === optionOwnerKey
            ? rule.dependentOptions.filter(option => option !== value)
            : rule.dependentOptions,
    selectedOptions:
        ruleOwnerKey === optionOwnerKey
            ? rule.selectedOptions.filter(option => option !== value)
            : rule.selectedOptions
});

interface OptionValueRefProps {
    rule: ChecklistRuleProps;
    ruleOwnerKey: string;
    optionOwnerKey: string;
    value: string;
}

const usesOptionValue = ({
    rule,
    ruleOwnerKey,
    optionOwnerKey,
    value
}: OptionValueRefProps) =>
    (rule.dependentId === optionOwnerKey &&
        rule.dependentOptions.includes(value)) ||
    (ruleOwnerKey === optionOwnerKey && rule.selectedOptions.includes(value));

export const removeRulesUsingOptionValue = (
    checklistForm: ChecklistFormProps,
    optionOwnerKey: string,
    value: string
): ChecklistFormProps =>
    checklistForm.map(question => ({
        ...question,
        rules: question.rules.filter(
            rule =>
                !usesOptionValue({
                    rule,
                    ruleOwnerKey: question.key,
                    optionOwnerKey,
                    value
                })
        )
    }));

export const hasRulesUsingOptionValue = (
    checklistForm: ChecklistFormProps,
    optionOwnerKey: string,
    value: string
) =>
    checklistForm.some(question =>
        question.rules.some(rule =>
            usesOptionValue({
                rule,
                ruleOwnerKey: question.key,
                optionOwnerKey,
                value
            })
        )
    );

export const changeQuestionType = (
    checklistForm: ChecklistFormProps,
    questionKey: string,
    type: CHECKLIST_QUESTION_TYPE
): ChecklistFormProps =>
    checklistForm.map(question => {
        if (question.key === questionKey) {
            return {
                ...question,
                type,
                options: canHaveOptions(type)
                    ? question.options
                    : toOptions([], INITIAL_OPTION_ROWS),
                rules: []
            };
        }

        return withoutRulesAimedAt(question, questionKey);
    });

export const hasTypeChangeRuleImpact = (
    checklistForm: ChecklistFormProps,
    questionKey: string
) => {
    const question = getSourceQuestion(checklistForm, questionKey);

    return (
        !!question?.rules.length ||
        hasDependentRules(checklistForm, questionKey)
    );
};

// no options left in the rules therefore rule cannot fire
const canRuleStillFire = (rule: ChecklistRuleProps) =>
    rule.dependentOptions.length > 0 &&
    (!filtersOptions(rule.ruleAction) || rule.selectedOptions.length > 0);

export const removeOption = (
    checklistForm: ChecklistFormProps,
    questionKey: string,
    optionId: string
): ChecklistFormProps => {
    const removedValue = getSourceQuestion(
        checklistForm,
        questionKey
    )?.options.find(({ id }) => id === optionId)?.value;

    if (removedValue === undefined) {
        return checklistForm;
    }

    return checklistForm.map(question => ({
        ...question,
        options:
            question.key === questionKey
                ? question.options.filter(({ id }) => id !== optionId)
                : question.options,
        rules: question.rules
            .map(rule =>
                pruneOptionFromRule({
                    rule,
                    ruleOwnerKey: question.key,
                    optionOwnerKey: questionKey,
                    value: removedValue
                })
            )
            .filter(canRuleStillFire)
    }));
};

const countRules = (checklistForm: ChecklistFormProps) =>
    checklistForm.reduce((count, { rules }) => count + rules.length, 0);

export const hasOptionDeleteRuleImpact = (
    checklistForm: ChecklistFormProps,
    questionKey: string,
    optionId: string
): boolean => {
    const after = removeOption(checklistForm, questionKey, optionId);

    const hasChangedRules = after.some(question => {
        const before = checklistForm.find(({ key }) => key === question.key);

        return question.rules.some(rule => {
            const previous = before?.rules.find(({ id }) => id === rule.id);
            return previous !== undefined && !_.isEqual(previous, rule);
        });
    });

    const hasRemovedRules = countRules(after) < countRules(checklistForm);

    return hasRemovedRules || hasChangedRules;
};
