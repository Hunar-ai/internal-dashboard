import React from 'react';

import { Button } from '@chakra-ui/react';

import { UploadInputPreview } from './UploadInputPreview';

import { ALLOWED_EXTENSION, FIELD_SIZE } from 'Enum';

const FILENAME_LENGTH_LIMIT = 15;

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

    const filename = React.useMemo(() => {
        return getFormattedFilename(value, FILENAME_LENGTH_LIMIT);
    }, [value]);

    return (
        <>
            {value ? (
                <UploadInputPreview
                    inputValue={filename}
                    size={size}
                    isDisabled={isDisabled}
                    onRemove={() => onRemove(name)}
                />
            ) : (
                <Button
                    colorScheme="blue"
                    variant="outline"
                    size={size}
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                    cursor="pointer"
                    as="label"
                >
                    {title}
                    <input
                        type="file"
                        hidden
                        disabled={isDisabled}
                        onChange={onChange}
                        value={value}
                        name={name}
                        accept={acceptFileType?.join(',')}
                    />
                </Button>
            )}
        </>
    );
};
