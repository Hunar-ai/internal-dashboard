import { Navigate, useSearchParams } from 'react-router-dom';

import {
    CompanyAddForm,
    CompanyCareerPageForm,
    CompanyReferralPageForm
} from '@components/company';

export const CompanyContainer = () => {
    const [searchParams] = useSearchParams();

    if (searchParams.has('add')) {
        return <CompanyAddForm />;
    } else if (searchParams.has('career')) {
        return <CompanyCareerPageForm />;
    } else if (searchParams.has('referral')) {
        return <CompanyReferralPageForm />;
    } else {
        return <Navigate to="/not-found" replace />;
    }
};
