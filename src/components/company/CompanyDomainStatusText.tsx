import { Text } from '@chakra-ui/react';
import { CheckCircleIcon, InfoIcon } from '@chakra-ui/icons';

interface CompanyDomainStatusTextProps {
    isSuccessful: boolean;
}

export const CompanyDomainStatusText = ({
    isSuccessful
}: CompanyDomainStatusTextProps) => {
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
