import { Box, Center } from '@chakra-ui/react';

import { NehaSelectMasterTable } from '@components/nehaSelect';

import { NAVBAR_HEIGHT } from 'Constants';

export const NehaSelectContainer = () => {
    return (
        <Box height={`calc(100vh - ${NAVBAR_HEIGHT})`} overflow="auto">
            <Center flexDirection="column" py={4} px={8}>
                <NehaSelectMasterTable />
            </Center>
        </Box>
    );
};
