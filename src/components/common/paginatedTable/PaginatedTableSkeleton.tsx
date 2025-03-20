import { Skeleton, TableCell, TableRow } from '@mui/material';

interface PaginatedTableSkeletonProps {
    rowCount: number;
    columnCount: number;
}

export const PaginatedTableSkeleton = ({
    rowCount,
    columnCount
}: PaginatedTableSkeletonProps) => {
    return (
        <>
            {Array.from(Array(rowCount).keys()).map((_, i) => (
                <TableRow key={`row_${i}`}>
                    {Array.from(Array(columnCount).keys()).map((_, j) => (
                        <TableCell key={`column_${j}`} height="41.8">
                            <Skeleton />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
};
