import { useSearchParams } from 'react-router-dom';

import { Box, Center } from '@chakra-ui/react';

import {
    PGMetricsMasterTable,
    PGMetricsMasterChart
} from '@components/playgroundMetrics';

import { NAVBAR_HEIGHT } from 'Constants';

export const PlaygroundMetricsContainer = () => {
    const [searchParams] = useSearchParams();
    const isChartsPage = searchParams?.has('charts');

    return (
        <Box
            height={`calc(100vh - ${NAVBAR_HEIGHT})`}
            sx={{ background: isChartsPage ? '#EFEFF5' : 'inherit' }}
            overflow="scroll"
        >
            <Center flexDirection="column" py={0} px={8}>
                {isChartsPage ? (
                    <PGMetricsMasterChart />
                ) : (
                    <PGMetricsMasterTable />
                )}
            </Center>
        </Box>
    );
};
