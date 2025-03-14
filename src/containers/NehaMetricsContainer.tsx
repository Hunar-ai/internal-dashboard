import { Box, Center } from '@chakra-ui/react';
import { CallMetrics } from '@components/neha';
import { NAVBAR_HEIGHT } from 'Constants';

export const NehaMetricsContainer = () => {
    return (
        <Box height={`calc(100vh - ${NAVBAR_HEIGHT})`} overflow="scroll">
            <Center flexDirection="column" py={4} px={8}>
                <CallMetrics />
            </Center>
        </Box>
    );
};
