import { Flex, IconButton, Text, useTheme } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

import { FIELD_SIZE } from 'Enum';

interface UploadInputPreviewProps {
    inputValue: string;
    size: FIELD_SIZE;
    isDisabled: boolean;
    onRemove: VoidFunction;
}

export const UploadInputPreview = ({
    inputValue,
    size,
    isDisabled,
    onRemove
}: UploadInputPreviewProps) => {
    const theme = useTheme();

    return (
        <Flex alignItems="center">
            <Text
                variant="body2"
                lineHeight="inherit"
                px={1}
                opacity={isDisabled ? theme.palette.action.disabledOpacity : 1}
            >
                {inputValue}
            </Text>
            <IconButton
                onClick={onRemove}
                size={size}
                aria-label="Remove"
                variant="ghost"
                isDisabled={isDisabled}
                icon={<CloseIcon fontSize="small" />}
            />
        </Flex>
    );
};
