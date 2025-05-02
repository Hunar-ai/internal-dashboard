import { NehaAgentsMasterTable } from '@components/nehaAgents';
import { Box, Grid, ThemeProvider } from '@mui/material';

import { NAVBAR_HEIGHT } from 'Constants';
import { theme } from 'theme';

export const NehaAgentsDashboard = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box height={`calc(100vh - ${NAVBAR_HEIGHT})`} overflow="auto">
                <Grid container justifyContent="center" py={2} px={4}>
                    <NehaAgentsMasterTable />
                </Grid>
            </Box>
        </ThemeProvider>
    );
};
