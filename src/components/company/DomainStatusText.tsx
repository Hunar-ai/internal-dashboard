import { Text } from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon } from '@chakra-ui/icons';

interface DomainStatusTextProps {
    isSuccessful: boolean;
}

export const DomainStatusText = ({ isSuccessful }: DomainStatusTextProps) => {
    return (
        <>
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
        </>
    );
};
