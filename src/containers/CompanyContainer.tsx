import { Flex } from '@chakra-ui/react';

import { CompanyCreationForm } from '@components/company';

export const CompanyContainer = () => {
    return (
        <Flex justifyContent="center" alignItems="center" my={6}>
            <CompanyCreationForm />
        </Flex>
    );
};
