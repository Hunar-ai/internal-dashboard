import { Button } from '@chakra-ui/react';

import { UploadInputPreview } from './UploadInputPreview';

import { ALLOWED_EXTENSION, FIELD_SIZE } from 'Enum';

interface UploadButtonProps {
    name: string;
    value: string;
    title: string;
    acceptFileType: Array<ALLOWED_EXTENSION>;
    size?: string;
    isLoading?: boolean;
    isRequired?: boolean;
    isDisabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (_: string) => void;
}

export const UploadButton = ({
    name,
    value,
    title,
    acceptFileType,
    size = FIELD_SIZE.sm,
    isLoading = false,
    isRequired = false,
    isDisabled = false,
    onChange,
    onRemove
}: UploadButtonProps) => {
    // TODO: Handle isRequired logic
    // TODO: handle filename truncation logic

    return value ? (
        <UploadInputPreview
            inputValue={value}
            isRequired={isRequired}
            onRemove={() => onRemove(name)}
        />
    ) : (
        <Button
            colorScheme="blue"
            variant="outline"
            size={size}
            isLoading={isLoading}
            isDisabled={isDisabled}
            as="label"
        >
            {title}
            <input
                type="file"
                hidden
                onChange={onChange}
                value={value}
                name={`${name}`}
                accept={acceptFileType?.join(',')}
            />
        </Button>
    );
};
