import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';

import RetryIcon from 'assets/retry.svg?react';
import React from 'react';
import { DomainStatusText } from './DomainStatusText';

interface DomainStatusProps {
    iconSrc: string;
    title: string;
    isSuccessful: boolean;
    isRetrying: boolean;
    isRetryVisible: boolean;
    errorMessage?: string;
    onRetryClick: VoidFunction;
}

export const DomainStatus = ({
    iconSrc,
    title,
    isSuccessful,
    isRetrying,
    isRetryVisible,
    errorMessage = '',
    onRetryClick
}: DomainStatusProps) => {
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
                    <DomainStatusText isSuccessful={isSuccessful} />
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
