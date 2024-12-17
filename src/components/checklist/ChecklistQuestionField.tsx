import {
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Input
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { HelperText } from '@components/common';

interface ChecklistQuestionFieldProps {
    index: number;
    fieldKey: string;
    question: string;
    errorMsg: string;
    hasError: boolean;
    onQuestionChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
    onQuestionDelete: (fieldKey: string) => void;
}

export const ChecklistQuestionField = ({
    index,
    fieldKey,
    question,
    errorMsg,
    hasError,
    onQuestionChange,
    onQuestionDelete
}: ChecklistQuestionFieldProps) => {
    return (
        <FormControl isRequired isInvalid={hasError}>
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
                isInvalid={hasError}
                onChange={onQuestionChange}
            />
            <HelperText errorMsg={errorMsg} hasError={hasError} />
        </FormControl>
    );
};
