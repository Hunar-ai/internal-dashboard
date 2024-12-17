import {
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

interface ChecklistQuestionFieldProps {
    index: number;
    fieldKey: string;
    question: string;
    onQuestionChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
    onQuestionDelete: (fieldKey: string) => void;
}

export const ChecklistQuestionField = ({
    index,
    fieldKey,
    question,
    onQuestionChange,
    onQuestionDelete
}: ChecklistQuestionFieldProps) => {
    return (
        <FormControl isRequired>
            <Flex alignItems="center" justifyContent="space-between">
                <FormLabel>{`Question ${index + 1}`}</FormLabel>
                <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete question"
                    variant="ghost"
                    onClick={() => onQuestionDelete(fieldKey)}
                />
            </Flex>
            <Input
                name={fieldKey}
                value={question}
                placeholder="Add your question here"
                isRequired
                onChange={onQuestionChange}
            />
        </FormControl>
    );
};
