import { FormControl, FormLabel, Input } from '@chakra-ui/react';

interface TextFieldProps {
    label: string;
    name: string;
    value: string;
    placeholder?: string;
    isInvalid?: boolean;
    isRequired?: boolean;
    isDisabled?: boolean;
    helperText?: React.ReactNode;
    onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = ({
    label,
    name,
    value,
    placeholder = '',
    isInvalid = false,
    isRequired = false,
    isDisabled = false,
    helperText = '',
    onChange
}: TextFieldProps) => {
    return (
        <FormControl
            isInvalid={isInvalid}
            isRequired={isRequired}
            isDisabled={isDisabled}
        >
            <FormLabel>{label}</FormLabel>
            <Input
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {helperText}
        </FormControl>
    );
};
