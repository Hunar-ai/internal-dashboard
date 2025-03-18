import { Box, Center } from '@chakra-ui/react';

import { VoiceCallMetrics } from '@components/playgroundMetrics';

import { NAVBAR_HEIGHT } from 'Constants';

export const PlaygroundMetricsContainer = () => {
    return (
        <Box height={`calc(100vh - ${NAVBAR_HEIGHT})`} overflow="scroll">
            <Center flexDirection="column" py={4} px={8}>
                <VoiceCallMetrics />
            </Center>
        </Box>
    );
};
