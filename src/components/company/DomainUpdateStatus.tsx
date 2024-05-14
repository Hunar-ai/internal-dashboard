import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon } from '@chakra-ui/icons';

import RetryIcon from 'assets/retry.svg?react';

interface DomainUpdateStatusProps {
    iconSrc: string;
    title: string;
    isSuccessful: boolean;
    isRetrying: boolean;
    errorMessage?: string;
    onRetryClick: VoidFunction;
}

export const DomainUpdateStatus = ({
    iconSrc,
    title,
    isSuccessful,
    isRetrying,
    errorMessage = '',
    onRetryClick
}: DomainUpdateStatusProps) => {
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
                >
                    <Text color="gray.600">{errorMessage}</Text>
                    <Button
                        colorScheme="blue"
                        size="sm"
                        isLoading={isRetrying}
                        rightIcon={<RetryIcon />}
                        onClick={onRetryClick}
                    >
                        Retry
                    </Button>
                </Flex>
            )}
        </VStack>
    );
};
