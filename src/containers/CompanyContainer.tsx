import { Navigate, useSearchParams } from 'react-router-dom';

import { CompanyAddForm, CompanyCareerPageForm } from '@components/company';

export const CompanyContainer = () => {
    const [searchParams] = useSearchParams();

    if (searchParams.has('add')) {
        return <CompanyAddForm />;
    } else if (searchParams.has('career')) {
        return <CompanyCareerPageForm />;
    } else {
        return <Navigate to="/not-found" replace />;
    }
};
