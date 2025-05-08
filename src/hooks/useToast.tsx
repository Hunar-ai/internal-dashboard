import React from 'react';

import { useToast as useChakraToast } from '@chakra-ui/react';

interface ShowToastProps {
    description: string;
    title?: string;
}

export const useToast = () => {
    const toast = useChakraToast();

    const showError = React.useCallback(
        ({ title = 'Error', description }: ShowToastProps) => {
            toast({
                title,
                description,
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        },
        [toast]
    );

    const showSuccess = React.useCallback(
        ({ title, description }: ShowToastProps) => {
            toast({
                title,
                description,
                status: 'success',
                duration: 9000,
                isClosable: true
            });
        },
        [toast]
    );

    const showInfo = React.useCallback(
        ({ title, description }: ShowToastProps) => {
            toast({
                title,
                description,
                status: 'info',
                duration: 9000,
                isClosable: true
            });
        },
        [toast]
    );

    return {
        showError,
        showSuccess,
        showInfo
    };
};
