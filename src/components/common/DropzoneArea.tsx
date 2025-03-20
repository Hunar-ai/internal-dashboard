import * as React from 'react';

import { useDropzone } from 'react-dropzone';

import { Box } from '@mui/material';

import { getDropzoneSx } from './styles';
import { DropzoneDisplayArea } from './DropzoneDisplayArea';
import { DropzoneUploadArea } from './DropzoneUploadArea';

const fileTypes = {
    all: {
        name: 'all',
        extensions: ['*'],
        uploadText: 'Drag & Drop your files here',
        ctaText: 'Upload Document'
    },
    csv: {
        name: 'csv',
        extensions: ['.csv'],
        uploadText: 'Drag & Drop your CSV file here',
        ctaText: 'Upload CSV'
    },
    images: {
        name: 'images',
        extensions: ['.jpeg', '.png', '.jpg'],
        uploadText: 'Drag & Drop your image files here',
        ctaText: 'Upload Image'
    }
};

interface DropzoneAreaProps {
    isLoading?: boolean;
    boxWidth?: number | 'inherit' | string;
    type?: 'csv' | 'images';
    value?: string;
    hasRequiredError?: boolean;
    isDisabled?: boolean;
    onDrop: (acceptedFiles: File[]) => void;
    onClick?: (_: React.BaseSyntheticEvent) => void;
    onRemoveClick?: (_: React.BaseSyntheticEvent) => void;
}

export const DropzoneArea = ({
    isLoading = false,
    boxWidth = 'inherit',
    value = undefined,
    type = 'csv',
    hasRequiredError = false,
    isDisabled = false,
    onDrop,
    onClick = undefined,
    onRemoveClick = undefined
}: DropzoneAreaProps) => {
    const dropzoneSx = React.useMemo(
        () =>
            getDropzoneSx({
                isLoading,
                hasRequiredError,
                value,
                isDisabled
            }),
        [isLoading, hasRequiredError, value, isDisabled]
    );

    const handleOnDrop = React.useCallback(
        (acceptedFiles: File[]) => {
            onDrop(acceptedFiles);
        },
        [onDrop]
    );

    const uploadType = type ? fileTypes[type] : fileTypes.all;

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        disabled: isDisabled,
        onDrop: handleOnDrop,
        accept: uploadType.extensions
    });

    return (
        <Box id="dropzone-box" width={boxWidth} height="100%" sx={dropzoneSx}>
            <>
                <div
                    {...getRootProps({
                        className: 'dropzone',
                        disabled: isDisabled
                    })}
                >
                    {value ? (
                        <DropzoneDisplayArea
                            value={value}
                            isDisabled={isDisabled}
                            onRemoveClick={onRemoveClick}
                            onClick={onClick}
                        />
                    ) : (
                        <>
                            <input
                                {...getInputProps({
                                    onClick,
                                    disabled: isLoading || isDisabled
                                })}
                            />
                            <DropzoneUploadArea
                                isDragActive={isDragActive}
                                isLoading={isLoading}
                                uploadType={uploadType}
                            />
                        </>
                    )}
                </div>
            </>
        </Box>
    );
};
