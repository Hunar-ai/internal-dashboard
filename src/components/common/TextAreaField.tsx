import {
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Textarea
} from '@chakra-ui/react';
import React from 'react';

interface TextAreaFieldProps {
    label: string;
    name: string;
    value: string;
    placeholder?: string;
    minLength?: number;
    maxLength?: number;
    isInvalid?: boolean;
    isRequired?: boolean;
    isDisabled?: boolean;
    isCharHelpTextEnabled?: boolean;
    helperText?: React.ReactNode;
    onChange: (_: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaField = ({
    label,
    name,
    value,
    placeholder = '',
    minLength = 0,
    maxLength = 200,
    isInvalid = false,
    isRequired = false,
    isDisabled = false,
    isCharHelpTextEnabled = false,
    helperText = '',
    onChange
}: TextAreaFieldProps) => {
    const characterCountText = React.useMemo(() => {
        const numberOfCharacters = value ? value.length : 0;
        const remainingCharacters = maxLength - numberOfCharacters;

        if (numberOfCharacters < minLength) {
            const requiredCharacters = minLength - numberOfCharacters;
            const suffix = numberOfCharacters
                ? 'more character required'
                : 'characters required';
            return `${requiredCharacters} ${suffix}`;
        }

        const suffix = numberOfCharacters
            ? 'characters remaining'
            : 'characters';
        return numberOfCharacters > 3 ? `${remainingCharacters} ${suffix}` : '';
    }, [maxLength, minLength, value]);

    return (
        <FormControl
            isInvalid={isInvalid}
            isRequired={isRequired}
            isDisabled={isDisabled}
        >
            <FormLabel>{label}</FormLabel>
            <Textarea
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            <Flex justifyContent="space-between">
                {helperText}
                {isCharHelpTextEnabled && (
                    <>
                        {isInvalid ? (
                            <FormErrorMessage fontSize="xs">
                                {characterCountText}
                            </FormErrorMessage>
                        ) : (
                            <FormHelperText fontSize="xs">
                                {characterCountText}
                            </FormHelperText>
                        )}
                    </>
                )}
            </Flex>
        </FormControl>
    );
};
