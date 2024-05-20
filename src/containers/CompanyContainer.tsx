import { Navigate, useSearchParams } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

import { CompanyCreationForm } from '@components/company';

export const CompanyContainer = () => {
    const [searchParams] = useSearchParams();

    if (!searchParams.has('add')) {
        return <Navigate to="/not-found" replace />;
    }

    return (
        <Flex justifyContent="center" alignItems="center" my={6}>
            <CompanyCreationForm />
        </Flex>
    );
};
