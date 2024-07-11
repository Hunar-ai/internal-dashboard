import { FormControl, FormLabel, Select } from '@chakra-ui/react';

import type { OptionsProps } from 'interfaces';

interface SelectFieldProps {
    label: string;
    name: string;
    value: string;
    options: OptionsProps;
    placeholder?: string;
    isInvalid?: boolean;
    isRequired?: boolean;
    isDisabled?: boolean;
    helperText?: React.ReactNode;
    onChange: (_: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectField = ({
    label,
    name,
    value,
    options,
    placeholder = '',
    isInvalid = false,
    isRequired = false,
    isDisabled = false,
    helperText = '',
    onChange
}: SelectFieldProps) => {
    return (
        <FormControl isRequired={isRequired} isInvalid={isInvalid}>
            <FormLabel>{label}</FormLabel>
            <Select
                placeholder={placeholder}
                name={name}
                isDisabled={isDisabled}
                value={value}
                onChange={onChange}
            >
                {options.map(option => (
                    <option value={option.value} key={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
            {helperText}
        </FormControl>
    );
};
