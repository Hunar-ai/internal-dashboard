import { Route, Routes } from 'react-router-dom';

import { Box } from '@chakra-ui/react';

import { LoiView, LoiDetailsView } from '@components/loi';

import { NAVBAR_HEIGHT } from 'Constants';

export const LoiContainer = () => {
    return (
        <Box height={`calc(100vh - ${NAVBAR_HEIGHT})`} overflow="scroll">
            <Routes>
                <Route path=":companyId/:loi" element={<LoiDetailsView />} />
                <Route path="*" element={<LoiView />} />
            </Routes>
        </Box>
    );
};
