import { Button } from '@chakra-ui/react';

import { UploadInputPreview } from './UploadInputPreview';

import { ALLOWED_EXTENSION, FIELD_SIZE } from 'Enum';

interface UploadButtonProps {
    name: string;
    value: string;
    title: string;
    acceptFileType: Array<ALLOWED_EXTENSION>;
    size?: FIELD_SIZE;
    isLoading?: boolean;
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
    isDisabled = false,
    onChange,
    onRemove
}: UploadButtonProps) => {
    const getFormattedFilename = (filename: string, maxLength: number) => {
        if (filename.length <= maxLength) return filename;

        const extension = filename.slice(
            filename.lastIndexOf('.'),
            filename.length
        );
        const shortenedFilename = filename.slice(
            filename.lastIndexOf('/') + 1,
            filename.lastIndexOf('/') + maxLength - extension.length - 1
        );
        const formattedFilename = `${shortenedFilename}...${extension}`;
        return formattedFilename;
    };

    return value ? (
        <UploadInputPreview
            inputValue={getFormattedFilename(value, 15)}
            size={size}
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
