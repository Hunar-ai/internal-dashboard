import { Typography } from '@mui/material';

import { Column } from './PaginatedTable';

interface HeaderCellProps {
    column: Column;
}

export const HeaderCell = ({ column }: HeaderCellProps) => {
    return <Typography fontWeight="bold">{column?.headerText}</Typography>;
};
