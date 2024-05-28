import { Button, Flex, HStack, Text } from '@chakra-ui/react';

import RetryIcon from 'assets/retry.svg?react';

import { CheckCircleIcon, InfoIcon } from '@chakra-ui/icons';

interface CompanyDomainStatusProps {
    title: string;
    isSuccessful: boolean;
    isRetrying: boolean;
    isRetryBtnVisible: boolean;
    isDefaultView: boolean;
    onRetryClick: VoidFunction;
}

export const CompanyDomainStatus = ({
    title,
    isSuccessful,
    isRetrying,
    isRetryBtnVisible,
    isDefaultView,
    onRetryClick
}: CompanyDomainStatusProps) => {
    return (
        <Flex
            alignItems="center"
            justifyContent="space-between"
            bgColor={
                isDefaultView
                    ? 'gray.100'
                    : isSuccessful
                    ? 'green.100'
                    : 'red.100'
            }
            width="100%"
            borderLeft="5px solid"
            borderLeftColor={
                isDefaultView
                    ? 'gray.500'
                    : isSuccessful
                    ? 'green.500'
                    : 'red.500'
            }
            px={2}
            py={1}
            minHeight={10}
            borderRadius="md"
        >
            <HStack>
                <Text fontSize="sm" fontWeight={600}>
                    {title}
                </Text>

                {isDefaultView ? (
                    <></>
                ) : isSuccessful ? (
                    <CheckCircleIcon color="green.500" />
                ) : (
                    <InfoIcon color="red.500" />
                )}
            </HStack>
            {isDefaultView ? (
                <Text fontSize="xs">
                    Status will be updated once you try creating a company
                </Text>
            ) : (
                isRetryBtnVisible &&
                !isSuccessful && (
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
                )
            )}
        </Flex>
    );
};
