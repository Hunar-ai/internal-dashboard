import { Navigate, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from '@components/common';
import { ResetPasswordContainer } from 'containers';

import { settingsInitialState, SettingsContext } from 'contexts';
import { useGetLoggedInPersonnel, useToken } from 'hooks';

export const AppContainer = () => {
    const { token } = useToken();
    const { data: personnel, isLoading } = useGetLoggedInPersonnel({
        enabled: !!token
    });

    if (token && isLoading) {
        return <></>;
    }

    return (
        <SettingsContext.Provider
            value={{
                ...settingsInitialState,
                loggedInPersonnel: {
                    personnelId: personnel?.personnelId || '',
                    fullName: personnel?.fullName,
                    role: personnel?.role,
                    email: personnel?.email,
                    mobileNumber: personnel?.mobileNumber,
                    personalizationDetails: personnel?.personalizationDetails,
                    type: personnel?.type
                }
            }}
        >
            <ProtectedRoute>
                <Routes>
                    <Route
                        path="/client-reset-password"
                        element={<ResetPasswordContainer />}
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </ProtectedRoute>
        </SettingsContext.Provider>
    );
};
