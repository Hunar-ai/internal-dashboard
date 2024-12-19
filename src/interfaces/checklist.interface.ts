export interface ChecklistFieldProps {
    key: string;
    question: string;
}

export type ChecklistFormProps = Record<string, ChecklistFieldProps>;
