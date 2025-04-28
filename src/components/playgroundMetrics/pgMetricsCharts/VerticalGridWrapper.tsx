import { ReactNode } from 'react';

import { Grid } from '@mui/material';

interface VerticalGridWrapperProps {
    children: ReactNode;
    md?: number;
    xs?: number;
    gap?: number;
}

export const VerticalGridWrapper = ({
    md = 4,
    xs = 12,
    gap = 4,
    children
}: VerticalGridWrapperProps) => {
    return (
        <Grid
            item
            md={md}
            xs={xs}
            sx={{ display: 'flex', flexDirection: 'column', gap: gap }}
        >
            {children}
        </Grid>
    );
};
