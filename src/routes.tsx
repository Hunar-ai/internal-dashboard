import { SigninContainer } from 'containers/SigninContainer';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

const RoutesContainer = () => {
    const renderRoutes = () => {
        return (
            <Routes>
                <>
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path="/" element={<SigninContainer />} />
                </>
            </Routes>
        );
    };

    return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
};

export default RoutesContainer;
