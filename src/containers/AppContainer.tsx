import { Navigate, Route, Routes } from 'react-router-dom';

import { Navbar, ProtectedRoute } from '@components/common';
import { CompanyContainer, ResetPasswordContainer } from 'containers';

import { SettingsContext } from 'contexts';
import { useGetLoggedInPersonnel, useToken } from 'hooks';

export const AppContainer = () => {
    const { token } = useToken();
    const { data: personnel, isLoading } = useGetLoggedInPersonnel({
        enabled: !!token
    });

    return token && isLoading ? (
        <></>
    ) : (
        <SettingsContext.Provider
            value={{
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
            <Navbar />
            <ProtectedRoute>
                <Routes>
                    <Route
                        path="/client-reset-password"
                        element={<ResetPasswordContainer />}
                    />
                    <Route
                        path="/create-company"
                        element={<CompanyContainer />}
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </ProtectedRoute>
        </SettingsContext.Provider>
    );
};
