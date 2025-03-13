import React from 'react';
import { useTable, useBlockLayout, useFilters } from 'react-table';
import { useSticky } from 'react-table-sticky';
import MaUTable from '@mui/material/Table';
import {
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    TableBody
} from '@mui/material';
import { ReactElement } from 'interfaces';
import { useIsMobile } from 'hooks';
import { COLUMN_STICKY_TYPE } from 'Enum';

export interface Data {
    [key: string]: any;
}

export interface Cell {
    row: {
        original: never;
    };
    value: never;
}

export interface Column {
    id: string;
    accessor: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    Header: string | Function | ReactElement;
    // eslint-disable-next-line @typescript-eslint/ban-types
    Cell?: Function | ReactElement;
    isVisible?: boolean;
    headerText: string;
    exportId?: string;
    sticky?: COLUMN_STICKY_TYPE;
    width?: string | number;
    defaultCanSort?: boolean;
    Filter?: any;
    // columnActionsProps?: ColumnActionsProps;
    maxWidth?: number;
    minWidth?: number;
    isForceEnabled?: boolean;
}

export interface PaginatedTableProps {
    id?: string;
    title?: ReactElement | string | null;
    columns: any;
    data: Data[];
    isLoading: boolean;
    size?: 'small' | 'medium';
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (_: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PaginatedTable = ({
    id,
    // title = 'Title',
    columns = [],
    data = [],
    size,
    isLoading
}: // handleChangePage,
// handleChangeRowsPerPage
PaginatedTableProps) => {
    const isMobile = useIsMobile();
    const extra = isMobile ? useBlockLayout : useSticky;
    const { getTableProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data
        },
        useFilters,
        useSticky,
        extra
    );

    return (
        <TableContainer id={id}>
            Paginated Table
            <MaUTable
                {...getTableProps()}
                stickyHeader
                className="table sticky"
                size={size}
            >
                <TableHead sx={{ height: 50 }}>
                    {headerGroups.map((headerGroup, i) => (
                        <React.Fragment key={i}>
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(
                                    (column: any, columnIndex) => (
                                        <React.Fragment key={columnIndex}>
                                            <TableCell
                                                {...column.getHeaderProps()}
                                            >
                                                <Grid
                                                    container
                                                    justifyContent="space-between"
                                                    height="100%"
                                                    alignItems="center"
                                                >
                                                    <Grid item>
                                                        {column.render(
                                                            'Header'
                                                        )}
                                                    </Grid>
                                                    <Grid item>
                                                        <Grid
                                                            container
                                                            flexDirection="column"
                                                            alignItems="center"
                                                        >
                                                            {column?.canFilter &&
                                                            column?.Filter
                                                                ? column.render(
                                                                      'Filter'
                                                                  )
                                                                : null}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </React.Fragment>
                                    )
                                )}
                            </TableRow>
                        </React.Fragment>
                    ))}
                </TableHead>
                <TableBody>
                    {isLoading ? (
                        <>Loadinng...</>
                    ) : (
                        <>
                            {rows.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <React.Fragment key={i}>
                                        <TableRow {...row.getRowProps()}>
                                            {row.cells.map((cell: any, i) => {
                                                return (
                                                    <React.Fragment key={i}>
                                                        <TableCell
                                                            {...cell.getCellProps()}
                                                        >
                                                            {cell.render(
                                                                'Cell'
                                                            )}
                                                        </TableCell>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </TableRow>
                                    </React.Fragment>
                                );
                            })}
                        </>
                    )}
                </TableBody>
            </MaUTable>
        </TableContainer>
    );
};
