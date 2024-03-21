import React from 'react';
import { createSearchParams, Navigate, useLocation } from 'react-router-dom';

import { useToken } from 'hooks';
import { SettingsContext } from 'contexts';

import { PERSONNEL_TYPE } from 'Enum';

interface ProtectedProps {
    children: React.ReactNode;
}

const unauthorizedRedirectionPath = '/';

export const ProtectedRoute = ({ children }: ProtectedProps) => {
    const { loggedInPersonnel } = React.useContext(SettingsContext);

    const location = useLocation();
    const { token } = useToken();

    const isAuthorized = React.useMemo(
        () =>
            token && loggedInPersonnel?.type === PERSONNEL_TYPE.HUNAR_PERSONNEL,
        [loggedInPersonnel?.type, token]
    );
    const isAuthenticated = React.useMemo(() => !!token, [token]);

    return !isAuthorized || !isAuthenticated ? (
        <Navigate
            to={{
                pathname: unauthorizedRedirectionPath,
                search: createSearchParams({
                    next: `${location.pathname}${location.search}`
                }).toString()
            }}
            replace
        />
    ) : (
        <>{children}</>
    );
};
