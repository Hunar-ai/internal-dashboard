import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppContainer, NotFound, SigninContainer } from 'containers';

const RoutesContainer = () => {
    const renderRoutes = () => {
        return (
            <Routes>
                <>
                    <Route path="/" element={<SigninContainer />} />
                    <Route path="/not-found" element={<NotFound />} />
                    <Route path="*" element={<AppContainer />} />
                </>
            </Routes>
        );
    };

    return <BrowserRouter>{renderRoutes()}</BrowserRouter>;
};

export default RoutesContainer;
