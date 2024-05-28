import { Navigate, useSearchParams } from 'react-router-dom';

import { CompanyAddForm } from '@components/company';

export const CompanyContainer = () => {
    const [searchParams] = useSearchParams();

    if (!searchParams.has('add')) {
        return <Navigate to="/not-found" replace />;
    }

    return <CompanyAddForm />;
};
