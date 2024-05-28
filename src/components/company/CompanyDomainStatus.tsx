import { Button, Flex, HStack, Text } from '@chakra-ui/react';

import RetryIcon from 'assets/retry.svg?react';

import { CheckCircleIcon, InfoIcon } from '@chakra-ui/icons';

interface CompanyDomainStatusProps {
    title: string;
    isSuccessful: boolean;
    isRetrying: boolean;
    isRetryBtnVisible: boolean;
    onRetryClick: VoidFunction;
}

export const CompanyDomainStatus = ({
    title,
    isSuccessful,
    isRetrying,
    isRetryBtnVisible,
    onRetryClick
}: CompanyDomainStatusProps) => {
    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            bgColor={isSuccessful ? 'green.100' : 'red.100'}
            width="100%"
            borderLeft="5px solid"
            borderLeftColor={isSuccessful ? 'green.500' : 'red.500'}
            px={1}
            py={1}
            minHeight={10}
            borderRadius="md"
        >
            <HStack>
                <Text>{title}</Text>
                {isSuccessful ? (
                    <CheckCircleIcon color="green.500" />
                ) : (
                    <InfoIcon color="red.500" />
                )}
            </HStack>
            {isRetryBtnVisible && !isSuccessful && (
                <Button
                    colorScheme="blue"
                    size="sm"
                    isLoading={isRetrying}
                    rightIcon={<RetryIcon />}
                    onClick={onRetryClick}
                    minWidth="84px"
                >
                    Retry
                </Button>
            )}
        </Flex>
    );
};
