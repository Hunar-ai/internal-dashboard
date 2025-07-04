import { Route, Routes } from 'react-router-dom';

import { Box, ThemeProvider } from '@mui/material';

import { LoiView, LoiDetailsView } from '@components/loi';

import { NAVBAR_HEIGHT } from 'Constants';
import { theme } from 'theme';

export const LoiContainer = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box
                height={`calc(100vh - ${NAVBAR_HEIGHT})`}
                overflow="scroll"
                py={2}
                px={4}
            >
                <Routes>
                    <Route
                        path=":companyId/:loi"
                        element={<LoiDetailsView />}
                    />
                    <Route path="*" element={<LoiView />} />
                </Routes>
            </Box>
        </ThemeProvider>
    );
};
