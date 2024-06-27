import { Flex, IconButton, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { FIELD_SIZE } from 'Enum';

interface UploadInputPreviewProps {
    inputValue: string;
    size: FIELD_SIZE;
    onRemove: VoidFunction;
}

export const UploadInputPreview = ({
    inputValue,
    size,
    onRemove
}: UploadInputPreviewProps) => {
    return (
        <Flex alignItems="center">
            <Text variant="body2" lineHeight="inherit" px={1}>
                {inputValue}
            </Text>
            <IconButton
                onClick={onRemove}
                size={size}
                aria-label="Remove"
                variant="ghost"
                icon={<CloseIcon fontSize="small" />}
            />
        </Flex>
    );
};
