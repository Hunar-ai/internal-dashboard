import { Typography } from '@mui/material';

interface DataCellProps {
    cell: any;
}

export const DataCell = ({ cell }: DataCellProps) => {
    return (
        <Typography variant="body2" noWrap>
            {cell?.value ?? ''}
        </Typography>
    );
};
