import { Grid } from '@mui/material';

import { type ReactElement } from 'interfaces';

interface PageLayoutProps {
    height?: number | string;
    tableHeaderCTA?: ReactElement;
    pl?: number;
    pr?: number;
    pt?: number;
    pb?: number;
    minHeight?: number;
}

export const PaginatedTableHeader = ({
    minHeight,
    height = 36,
    tableHeaderCTA,
    pl = 1.5,
    pr = 2,
    pt,
    pb
}: PageLayoutProps) => {
    return (
        <Grid
            id="paginated-table-header"
            container
            height={minHeight ? undefined : height}
            pl={pl}
            pr={pr}
            pt={pt}
            pb={pb}
            bgcolor="white"
            justifyContent="space-between"
            alignItems="center"
            minHeight={minHeight}
        >
            {tableHeaderCTA}
        </Grid>
    );
};
