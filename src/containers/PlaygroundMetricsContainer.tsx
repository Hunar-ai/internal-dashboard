import { Route, Routes, useLocation } from 'react-router-dom';

import { Box, Center } from '@chakra-ui/react';

import {
    PGMetricsMasterTable,
    PGMetricsMasterChart
} from '@components/playgroundMetrics';

import { NAVBAR_HEIGHT } from 'Constants';

export const PlaygroundMetricsContainer = () => {
    const { pathname } = useLocation();
    const isChartsPage = pathname?.includes('charts');

    return (
        <Box
            height={`calc(100vh - ${NAVBAR_HEIGHT})`}
            sx={{ background: isChartsPage ? '#EFEFF5' : 'inherit' }}
            overflow="scroll"
        >
            <Center flexDirection="column" py={0} px={8}>
                <Routes>
                    <Route path="charts" element={<PGMetricsMasterChart />} />
                    <Route path="" element={<PGMetricsMasterTable />} />
                </Routes>
            </Center>
        </Box>
    );
};
