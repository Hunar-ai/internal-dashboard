import { Flex, IconButton, Text } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface UploadInputPreviewProps {
    inputValue: string;
    isRequired: boolean;
    onRemove: VoidFunction;
}

export const UploadInputPreview = ({
    inputValue,
    // isRequired,
    onRemove
}: UploadInputPreviewProps) => {
    return (
        <Flex alignItems="center">
            <Text variant="body2" lineHeight="inherit" px={1}>
                {inputValue}
            </Text>
            <IconButton
                onClick={onRemove}
                size="xs"
                aria-label="Remove"
                variant="ghost"
                icon={<CloseIcon fontSize="small" />}
            />
        </Flex>
    );
};
