import { ReactNode } from 'react';

import { Grid } from '@mui/material';

interface NestedGridWrapperProps {
    children: ReactNode;
    parentXs?: number;
    childGridSpacing?: number;
}

export const NestedGridWrapper = ({
    children,
    parentXs = 12,
    childGridSpacing = 4
}: NestedGridWrapperProps) => {
    return (
        <Grid item xs={parentXs}>
            <Grid container spacing={childGridSpacing}>
                {children}
            </Grid>
        </Grid>
    );
};
