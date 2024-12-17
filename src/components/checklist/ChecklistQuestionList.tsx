import { ChecklistQuestionField } from './ChecklistQuestionField';

import type { ChecklistFormProps } from 'interfaces';

interface ChecklistQuestionListProps {
    checklistForm: ChecklistFormProps;
    onQuestionChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
    onQuestionDelete: (fieldKey: string) => void;
}

export const ChecklistQuestionList = ({
    checklistForm,
    onQuestionChange,
    onQuestionDelete
}: ChecklistQuestionListProps) => {
    return (
        <>
            {Object.values(checklistForm).map((checklistField, index) => (
                <ChecklistQuestionField
                    key={checklistField.key}
                    index={index}
                    fieldKey={checklistField.key}
                    question={checklistField.question}
                    onQuestionChange={onQuestionChange}
                    onQuestionDelete={onQuestionDelete}
                />
            ))}
        </>
    );
};
