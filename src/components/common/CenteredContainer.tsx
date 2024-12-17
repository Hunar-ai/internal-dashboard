import { Box, Center } from '@chakra-ui/react';

import { NAVBAR_HEIGHT } from 'Constants';

interface CenteredContainerProps {
    children: React.ReactNode;
}

export const CenteredContainer = ({ children }: CenteredContainerProps) => {
    return (
        <Box height={`calc(100vh - ${NAVBAR_HEIGHT})`} overflow="scroll">
            <Center py={6} px={8}>
                {children}
            </Center>
        </Box>
    );
};
