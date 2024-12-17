import { ChecklistQuestionField } from './ChecklistQuestionField';

import type { ChecklistFormProps, FormErrorStateProps } from 'interfaces';

interface ChecklistQuestionListProps {
    checklistForm: ChecklistFormProps;
    checklistFormErrorState: FormErrorStateProps;
    onQuestionChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
    onQuestionDelete: (fieldKey: string) => void;
}

export const ChecklistQuestionList = ({
    checklistForm,
    checklistFormErrorState,
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
                    errorMsg={
                        checklistFormErrorState[checklistField.key]?.errorMsg ||
                        ''
                    }
                    hasError={
                        checklistFormErrorState[checklistField.key]?.error ||
                        false
                    }
                    onQuestionChange={onQuestionChange}
                    onQuestionDelete={onQuestionDelete}
                />
            ))}
        </>
    );
};
