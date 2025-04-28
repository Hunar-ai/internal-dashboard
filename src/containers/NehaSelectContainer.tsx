import { Box, Grid, ThemeProvider } from '@mui/material';

import { NehaSelectMasterTable } from '@components/nehaSelect';

import { NAVBAR_HEIGHT } from 'Constants';
import { theme } from 'theme';

export const NehaSelectContainer = () => {
    return (
        <ThemeProvider theme={theme}>
            <Box height={`calc(100vh - ${NAVBAR_HEIGHT})`} overflow="auto">
                <Grid container justifyContent="center" py={2} px={4}>
                    <NehaSelectMasterTable />
                </Grid>
            </Box>
        </ThemeProvider>
    );
};
