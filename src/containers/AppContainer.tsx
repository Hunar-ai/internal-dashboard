import { Navigate, Route, Routes } from 'react-router-dom';

import { Menubar, ProtectedRoute } from '@components/common';
import { ResetPasswordContainer } from 'containers';

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
            <Menubar />
            <ProtectedRoute>
                <Routes>
                    <Route
                        path="/client-reset-password"
                        element={<ResetPasswordContainer />}
                    />
                    <Route path="/reset-something" element={<>Page 2</>} />
                    <Route path="/custom-settings" element={<>Page 3</>} />
                    <Route path="/custom-settings/:id" element={<>Page 3a</>} />
                    <Route path="/password-place" element={<>Page 4</>} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </ProtectedRoute>
        </SettingsContext.Provider>
    );
};
