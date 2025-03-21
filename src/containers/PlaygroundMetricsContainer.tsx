import { useSearchParams } from 'react-router-dom';

import { Box, Center } from '@chakra-ui/react';

import {
    PGMetricsMasterTable,
    PGMetricsMasterChart
} from '@components/playgroundMetrics';

import { NAVBAR_HEIGHT } from 'Constants';

export const PlaygroundMetricsContainer = () => {
    const [searchParams] = useSearchParams();

    return (
        <Box height={`calc(100vh - ${NAVBAR_HEIGHT})`} overflow="scroll">
            <Center flexDirection="column" py={4} px={8}>
                {searchParams?.has('charts') ? (
                    <PGMetricsMasterChart />
                ) : (
                    <PGMetricsMasterTable />
                )}
            </Center>
        </Box>
    );
};
