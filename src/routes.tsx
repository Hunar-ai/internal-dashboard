import { AppContainer } from 'containers';
import { SigninContainer } from 'containers/SigninContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const RoutesContainer = () => {
    const renderRoutes = () => {
        return (
            <Routes>
                <>
                    <Route path="/" element={<SigninContainer />} />
                    <Route path="*" element={<AppContainer />} />
                </>
            </Routes>
        );
    };

    return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
};

export default RoutesContainer;
