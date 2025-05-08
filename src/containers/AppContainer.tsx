import { Navigate, Route, Routes } from 'react-router-dom';

import { Navbar, ProtectedRoute } from '@components/common';
import {
    CompanyContainer,
    UserContainer,
    ResetPasswordContainer,
    ChecklistContainer,
    AssessmentContainer,
    NehaSelectContainer,
    PlaygroundMetricsContainer,
    NehaAgentsDashboard
} from 'containers';

import { useGetFormFields, useGetLoggedInPersonnel, useToken } from 'hooks';
import { SettingsContext, settingsInitialState } from 'contexts';

const PLAYGROUND_METRICS_USERS =
    import.meta.env.VITE_PLAYGROUND_METRICS_USERS?.split(',') ?? [];

export const AppContainer = () => {
    const { token } = useToken();
    const { data } = useGetFormFields();
    const { data: personnel, isLoading } = useGetLoggedInPersonnel({
        enabled: !!token
    });

    return token && isLoading ? (
        <></>
    ) : (
        <SettingsContext.Provider
            value={{
                formFields: data || settingsInitialState.formFields,
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
                    <Route path="/user" element={<UserContainer />} />
                    <Route path="/company" element={<CompanyContainer />} />
                    <Route path="/checklist" element={<ChecklistContainer />} />
                    <Route
                        path="/assessment"
                        element={<AssessmentContainer />}
                    />
                    {PLAYGROUND_METRICS_USERS?.includes(personnel?.email) && (
                        <>
                            <Route
                                path="/playground-metrics/*"
                                element={<PlaygroundMetricsContainer />}
                            />
                            <Route
                                path="/neha-select"
                                element={<NehaSelectContainer />}
                            />
                            <Route
                                path="/neha-agents"
                                element={<NehaAgentsDashboard />}
                            />
                        </>
                    )}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </ProtectedRoute>
        </SettingsContext.Provider>
    );
};
