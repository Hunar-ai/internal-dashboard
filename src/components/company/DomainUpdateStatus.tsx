import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon } from '@chakra-ui/icons';

import RetryIcon from 'assets/retry.svg?react';
import React from 'react';

interface DomainUpdateStatusProps {
    iconSrc: string;
    title: string;
    isSuccessful: boolean;
    isRetrying: boolean;
    isRetryVisible: boolean;
    errorMessage?: string;
    onRetryClick: VoidFunction;
}

export const DomainUpdateStatus = ({
    iconSrc,
    title,
    isSuccessful,
    isRetrying,
    isRetryVisible,
    errorMessage = '',
    onRetryClick
}: DomainUpdateStatusProps) => {
    const errorMsg = React.useMemo(() => {
        return isRetryVisible
            ? errorMessage
            : errorMessage +
                  ' Please reach out to the dev team to resolve the issue.';
    }, [errorMessage, isRetryVisible]);

    return (
        <VStack width="100%" spacing={4}>
            <Flex width="100%" justifyContent="space-between">
                <HStack spacing={3}>
                    <img src={iconSrc} alt={title} />
                    <Text fontSize="md" fontWeight={700}>
                        {title}
                    </Text>
                </HStack>
                <HStack spacing={1}>
                    {isSuccessful ? (
                        <>
                            <Text>Completed</Text>
                            <CheckCircleIcon color="green.500" />
                        </>
                    ) : (
                        <>
                            <Text>Failed</Text>
                            <InfoIcon color="red.500" />
                        </>
                    )}
                </HStack>
            </Flex>
            {!isSuccessful && (
                <Flex
                    p={3}
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                    gap={6}
                    bgColor="gray.50"
                    borderRadius="base"
                    minHeight={12}
                >
                    <Text color="gray.600">{errorMsg}</Text>
                    {isRetryVisible && (
                        <Button
                            colorScheme="blue"
                            size="sm"
                            isLoading={isRetrying}
                            rightIcon={<RetryIcon />}
                            onClick={onRetryClick}
                        >
                            Retry
                        </Button>
                    )}
                </Flex>
            )}
        </VStack>
    );
};
