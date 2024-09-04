import { Navigate, useSearchParams } from 'react-router-dom';

import { UserDeactivateForm } from '@components/user';

export const UserContainer = () => {
    const [searchParams] = useSearchParams();

    if (searchParams.has('deactivate')) {
        return <UserDeactivateForm />;
    } else {
        return <Navigate to="/not-found" replace />;
    }
};
