import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';

interface TextAreaFieldProps {
    label: string;
    name: string;
    value: string;
    placeholder?: string;
    isInvalid?: boolean;
    isRequired?: boolean;
    isDisabled?: boolean;
    helperText?: React.ReactNode;
    onChange: (_: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaField = ({
    label,
    name,
    value,
    placeholder = '',
    isInvalid = false,
    isRequired = false,
    isDisabled = false,
    helperText = '',
    onChange
}: TextAreaFieldProps) => {
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
            {helperText}
        </FormControl>
    );
};
