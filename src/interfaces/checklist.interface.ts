import { CHECKLIST_QUESTION_TYPE, CHECKLIST_RULE_ACTION } from 'Enum';

export interface ChecklistRuleFieldProps {
    dependsOnKey: string;
    dependsOnOptions: string[];
    action: CHECKLIST_RULE_ACTION;
    selectedOptions?: string[];
}

export interface ChecklistFieldProps {
    key: string;
    question: string;
    type?: CHECKLIST_QUESTION_TYPE;
    options?: string[];
    isRequired?: boolean;
    rules?: ChecklistRuleFieldProps[];
}

export interface ChecklistOptionProps {
    id: string;
    value: string;
}

export interface ChecklistRuleProps {
    id: string;
    dependentId: string;
    dependentOptions: string[];
    ruleAction: CHECKLIST_RULE_ACTION | '';
    selectedOptions: string[];
}

export interface ChecklistQuestionProps {
    key: string;
    question: string;
    type: CHECKLIST_QUESTION_TYPE;
    options: ChecklistOptionProps[];
    isRequired: boolean;
    rules: ChecklistRuleProps[];
}

export type ChecklistFormProps = ChecklistQuestionProps[];

interface FieldErrorProps {
    error: boolean;
    errorMsg?: string;
}

export interface ChecklistRuleErrorProps {
    dependentId?: FieldErrorProps;
    dependentOptions?: FieldErrorProps;
    ruleAction?: FieldErrorProps;
    selectedOptions?: FieldErrorProps;
}

export interface ChecklistQuestionErrorProps {
    question?: FieldErrorProps;
    options?: Record<string, FieldErrorProps>;
    optionsErrorMsg?: string;
    rules?: Record<string, ChecklistRuleErrorProps>;
}

export type ChecklistFormErrorStateProps = Record<
    string,
    ChecklistQuestionErrorProps
>;
