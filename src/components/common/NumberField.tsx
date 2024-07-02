import React from 'react';

import { Input } from '@chakra-ui/react';

import { FIELD_SIZE } from 'Enum';

interface NumberFieldProps {
    name: string;
    value: string | number | null;
    id?: string;
    placeholder?: string;
    size?: FIELD_SIZE;
    isExponentAllowed?: boolean;
    onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: (_: React.MouseEvent<HTMLInputElement>) => void;
}

export const NumberField = ({
    name,
    value,
    id = '',
    placeholder = '',
    size = FIELD_SIZE.md,
    isExponentAllowed = false,
    onChange,
    onClick
}: NumberFieldProps) => {
    return (
        <Input
            size={size}
            type="number"
            name={name}
            id={id}
            onChange={onChange}
            onClick={onClick}
            onKeyDown={e => {
                if (!isExponentAllowed) {
                    ['E', 'e'].includes(e.key) && e.preventDefault();
                }
            }}
            value={value || value === 0 ? value : ''}
            placeholder={placeholder}
        />
    );
};
