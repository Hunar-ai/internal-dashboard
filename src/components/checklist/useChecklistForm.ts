import React from 'react';

import { useToast } from 'hooks/useToast';
import { useValidationHelper } from 'hooks';

import {
    CHECKLIST_CONFIRMATION,
    CSV_UPLOAD_ERROR_MSG,
    MAX_CHECKLIST_OPTIONS,
    MAX_CHECKLIST_QUESTIONS,
    MAX_RULES_PER_QUESTION,
    type ChecklistConfirmationProps
} from './ChecklistConstants';
import {
    changeQuestionType,
    createOption,
    createQuestion,
    createRule,
    hasDependentRules,
    hasOptionDeleteRuleImpact,
    hasRulesUsingOptionValue,
    hasTypeChangeRuleImpact,
    getSourceQuestion,
    removeOption,
    removeQuestion,
    removeRulesUsingOptionValue,
    toChecklistForm
} from './helpers/ChecklistUtils';
import { getChecklistFormErrors } from './helpers/ChecklistValidation';
import { parseChecklistCsv } from './helpers/ChecklistCsv';

import type { ConfirmationDialogProps } from '@components/common';
import type { ChecklistUploadModalProps } from './components/ChecklistUploadModal';

import { CHECKLIST_QUESTION_TYPE } from 'Enum';

import type {
    ChecklistFieldProps,
    ChecklistFormErrorStateProps,
    ChecklistFormProps,
    ChecklistQuestionProps,
    ChecklistRuleProps
} from 'interfaces';

type ActiveOperationProps =
    | { type: 'CSVUploadModal'; data: ChecklistUploadModalProps }
    | { type: 'ConfirmationModal'; data: ConfirmationDialogProps };

export interface ChecklistHandlers {
    onExpand: (questionKey: string) => void;
    onQuestionChange: (questionKey: string, value: string) => void;
    onTypeChange: (questionKey: string, type: CHECKLIST_QUESTION_TYPE) => void;
    onRequiredChange: (questionKey: string, isRequired: boolean) => void;
    onQuestionDelete: (questionKey: string) => void;
    onOptionChange: (
        questionKey: string,
        optionId: string,
        value: string
    ) => void;
    onOptionAdd: (questionKey: string) => void;
    onOptionDelete: (questionKey: string, optionId: string) => void;
    onOptionFocus: (questionKey: string, optionId: string) => void;
    onQuestionBlur: (questionKey: string) => void;
    onRuleAdd: (questionKey: string) => void;
    onRuleChange: (
        questionKey: string,
        ruleId: string,
        patch: Partial<Omit<ChecklistRuleProps, 'id'>>
    ) => void;
    onRuleDelete: (questionKey: string, ruleId: string) => void;
}

export const useChecklistForm = () => {
    const { showError } = useToast();
    const { getStandardFieldValidity } = useValidationHelper();

    const [checklistForm, setChecklistForm] =
        React.useState<ChecklistFormProps>([]);
    const [checklistFormErrorState, setChecklistFormErrorState] =
        React.useState<ChecklistFormErrorStateProps>({});
    const [expandedQuestionKey, setExpandedQuestionKey] = React.useState('');
    const [activeOperation, setActiveOperation] =
        React.useState<ActiveOperationProps | null>(null);

    const closeActiveOperation = () => setActiveOperation(null);

    const editedOption = React.useRef<{
        questionKey: string;
        optionId: string;
        value: string;
    } | null>(null);

    const openUploadModal = () =>
        setActiveOperation({
            type: 'CSVUploadModal',
            data: {
                isOpen: true,
                onClose: closeActiveOperation,
                onFileSelect: importCsv
            }
        });

    const openConfirmation = (
        { description, detail, submitText }: ChecklistConfirmationProps,
        onConfirm: VoidFunction,
        onCancel?: VoidFunction
    ) =>
        setActiveOperation({
            type: 'ConfirmationModal',
            data: {
                isOpen: true,
                title: 'Are you sure?',
                description,
                detail,
                submitText,
                cancelText: 'Cancel',
                isDestructive: true,
                onSubmitClick: () => {
                    onConfirm();
                    closeActiveOperation();
                },
                onCancelClick: () => {
                    onCancel?.();
                    closeActiveOperation();
                }
            }
        });

    const updateQuestion = (
        key: string,
        getModifiedQuestion: (
            question: ChecklistQuestionProps
        ) => ChecklistQuestionProps
    ) =>
        setChecklistForm(prevForm =>
            prevForm.map(question =>
                question.key === key ? getModifiedQuestion(question) : question
            )
        );

    //called when user suddenly chagnes company id dropdown
    const replaceForm = (modifiedForm: ChecklistFormProps) => {
        setChecklistForm(modifiedForm);
        setChecklistFormErrorState({});
        setExpandedQuestionKey(modifiedForm[0]?.key ?? '');
    };

    const loadCompanyChecklist = (selectionChecklist: ChecklistFieldProps[]) =>
        replaceForm(toChecklistForm(selectionChecklist));

    const onQuestionAdd = () => {
        if (checklistForm.length >= MAX_CHECKLIST_QUESTIONS) {
            return;
        }

        const newQuestion = createQuestion(checklistForm);
        setChecklistForm(prevForm => [...prevForm, newQuestion]);
        setExpandedQuestionKey(newQuestion.key);
    };

    const deleteQuestion = (key: string) => {
        const modifiedForm = removeQuestion(checklistForm, key);

        setChecklistForm(modifiedForm);
        setChecklistFormErrorState(prevState => {
            const remainingErrors = { ...prevState };
            delete remainingErrors[key];
            return remainingErrors;
        });

        //just to make sure something is expanded afte deletion
        if (expandedQuestionKey === key) {
            setExpandedQuestionKey(modifiedForm[0]?.key ?? '');
        }
    };

    const onQuestionDelete = (key: string) => {
        if (!hasDependentRules(checklistForm, key)) {
            deleteQuestion(key);
            return;
        }

        openConfirmation(CHECKLIST_CONFIRMATION.DELETE_QUESTION, () =>
            deleteQuestion(key)
        );
    };

    //removing an option that is dependent deletes are rules that reference it
    const onOptionDelete = (key: string, optionId: string) => {
        const hasAffectedRules = hasOptionDeleteRuleImpact(
            checklistForm,
            key,
            optionId
        );

        if (!hasAffectedRules) {
            setChecklistForm(prevForm => removeOption(prevForm, key, optionId));
            return;
        }

        openConfirmation(CHECKLIST_CONFIRMATION.DELETE_OPTION, () =>
            setChecklistForm(prevForm => removeOption(prevForm, key, optionId))
        );
    };

    const onQuestionBlur = (questionKey: string) => {
        const { formErrorState } = getChecklistFormErrors(
            checklistForm,
            getStandardFieldValidity
        );

        setChecklistFormErrorState(prevState => ({
            ...prevState,
            [questionKey]: {
                ...prevState[questionKey],
                question: formErrorState[questionKey]?.question,
                options: formErrorState[questionKey]?.options
            }
        }));

        confirmOptionEdit(questionKey);
    };

    const confirmOptionEdit = (questionKey: string) => {
        const edited = editedOption.current;
        editedOption.current = null;

        if (!edited || edited.questionKey !== questionKey) {
            return;
        }

        const currentValue = getSourceQuestion(checklistForm, questionKey)
            ?.options.find(({ id }) => id === edited.optionId)
            ?.value.trim();

        const hasChanged =
            currentValue !== undefined && currentValue !== edited.value.trim();

        const hasBrokenRules = hasRulesUsingOptionValue(
            checklistForm,
            questionKey,
            edited.value.trim()
        );

        if (!hasChanged || !hasBrokenRules) {
            return;
        }

        openConfirmation(
            CHECKLIST_CONFIRMATION.EDIT_OPTION,
            () =>
                setChecklistForm(prevForm =>
                    removeRulesUsingOptionValue(
                        prevForm,
                        questionKey,
                        edited.value.trim()
                    )
                ),
            () =>
                updateQuestion(questionKey, question => ({
                    ...question,
                    options: question.options.map(option =>
                        option.id === edited.optionId
                            ? { ...option, value: edited.value }
                            : option
                    )
                }))
        );
    };

    const handlers: ChecklistHandlers = {
        onExpand: setExpandedQuestionKey,
        onQuestionDelete,

        onQuestionChange: (key, value) =>
            updateQuestion(key, question => ({ ...question, question: value })),

        onTypeChange: (key, type) => {
            if (!hasTypeChangeRuleImpact(checklistForm, key)) {
                setChecklistForm(prevForm =>
                    changeQuestionType(prevForm, key, type)
                );
                return;
            }

            openConfirmation(CHECKLIST_CONFIRMATION.CHANGE_QUESTION_TYPE, () =>
                setChecklistForm(prevForm =>
                    changeQuestionType(prevForm, key, type)
                )
            );
        },

        onRequiredChange: (key, isRequired) =>
            updateQuestion(key, question => ({ ...question, isRequired })),

        onOptionChange: (key, optionId, value) =>
            updateQuestion(key, question => ({
                ...question,
                options: question.options.map(option =>
                    option.id === optionId ? { ...option, value } : option
                )
            })),

        onOptionAdd: key =>
            updateQuestion(key, question =>
                question.options.length >= MAX_CHECKLIST_OPTIONS
                    ? question
                    : {
                          ...question,
                          options: [...question.options, createOption()]
                      }
            ),

        onOptionDelete,

        onOptionFocus: (key, optionId) => {
            const value = getSourceQuestion(checklistForm, key)?.options.find(
                ({ id }) => id === optionId
            )?.value;

            editedOption.current =
                value === undefined
                    ? null
                    : { questionKey: key, optionId, value };
        },

        onQuestionBlur,

        onRuleAdd: key =>
            updateQuestion(key, question =>
                question.rules.length >= MAX_RULES_PER_QUESTION
                    ? question
                    : { ...question, rules: [...question.rules, createRule()] }
            ),

        onRuleChange: (key, ruleId, patch) =>
            updateQuestion(key, question => ({
                ...question,
                rules: question.rules.map(rule =>
                    rule.id === ruleId ? { ...rule, ...patch } : rule
                )
            })),

        onRuleDelete: (key, ruleId) =>
            updateQuestion(key, question => ({
                ...question,
                rules: question.rules.filter(rule => rule.id !== ruleId)
            }))
    };

    const importCsv = async (file: File) => {
        const result = await parseChecklistCsv(file);

        if (result.error) {
            showError({
                title: 'Error',
                description: CSV_UPLOAD_ERROR_MSG[result.error]
            });
            return;
        }

        replaceForm(result.checklistForm);

        const { formErrorState } = getChecklistFormErrors(
            result.checklistForm,
            getStandardFieldValidity
        );
        setChecklistFormErrorState(formErrorState);
    };

    const validate = () => {
        const { hasFormError, formErrorState, firstErrorKey } =
            getChecklistFormErrors(checklistForm, getStandardFieldValidity);

        setChecklistFormErrorState(formErrorState);

        if (firstErrorKey) {
            setExpandedQuestionKey(firstErrorKey);
        }

        return { hasError: hasFormError, firstErrorKey };
    };

    //an empty form is the only state the button blocks, because there is no card

    const isSaveDisabled = !checklistForm.length;

    return {
        checklistForm,
        checklistFormErrorState,
        expandedQuestionKey,
        handlers,
        onQuestionAdd,
        openUploadModal,
        isSaveDisabled,
        activeOperation,
        loadCompanyChecklist,
        validate
    };
};
