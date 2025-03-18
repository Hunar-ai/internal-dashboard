import React from 'react';

import { useSticky } from 'react-table-sticky';
import { useTable, useFilters, HeaderGroup } from 'react-table';

import {
    Grid,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    useTheme
} from '@mui/material';
import MaUTable from '@mui/material/Table';
import { grey } from '@mui/material/colors';

import {
    PaginatedTableHeader,
    PaginatedTableSkeleton,
    TextOverFlow
} from 'components/common';
import { DisabledRowMask } from './DisabledRowMask';

import type { ColumnActionsProps, ReactElement } from 'interfaces';
import { useIsMobile } from 'hooks/useIsMobile';
import { COLUMN_STICKY_TYPE } from 'Enum';

export interface PaginationInfo {
    currentPage: number;
    numberOfPages: number;
    total: number;
    itemsPerPage: number;
    page?: number;
}

export interface Data {
    [key: string]: any;
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
    columnActionsProps?: ColumnActionsProps;
    maxWidth?: number;
    minWidth?: number;
    isForceEnabled?: boolean;
}

export interface Cell {
    row: {
        original: never;
    };
    value: never;
}

const paginationInfoInitialState: PaginationInfo = {
    currentPage: 1,
    numberOfPages: 1,
    total: 0,
    itemsPerPage: 100,
    page: 1
};

interface Props {
    id?: string;
    NoDataFound?: any;
    activeSortColumn?: string;
    activeFilterColumns?: string[];
    sort?: any;
    onSort?: any;
    data: Data[];
    title?: ReactElement | string | null;
    columns: any;
    rowsPerPageOptions?: number[];
    paginationInfo?: PaginationInfo;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (_: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    selectedRows?: string[];
    disabledRowMap?: Record<string, boolean>;
    isAllSelected?: boolean;
    size?: 'small' | 'medium';
    tableHeaderCTA: ReactElement;
    subHeader?: { [key: string]: string };
    footer?: ReactElement;
    isPaginationEnabled?: boolean;
    tableHeight?: number | string;
}

export const Table = ({
    id = 'table-container',
    data,
    columns,
    isLoading,
    rowsPerPageOptions,
    paginationInfo = paginationInfoInitialState,
    footer,
    handleChangePage,
    handleChangeRowsPerPage,
    selectedRows = [],
    disabledRowMap = {},
    isAllSelected = false,
    activeSortColumn,
    activeFilterColumns,
    NoDataFound,
    size = 'small',
    tableHeaderCTA,
    subHeader,
    isPaginationEnabled = true,
    tableHeight = 'calc(100vh - 176px)'
}: Props) => {
    const isMobile = useIsMobile();
    const theme = useTheme();
    const { currentPage, itemsPerPage, total } = paginationInfo;
    const { getTableProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data
        },
        useFilters,
        useSticky
    );

    const generateEmptyRows = React.useCallback(() => {
        const rowsToGenerate =
            rows.length === 0 ? itemsPerPage : itemsPerPage - rows.length;
        return Array.from(Array(rowsToGenerate).keys()).map((_, i) => (
            <TableRow key={i}>
                {columns.map((_: any, j: number) => (
                    <TableCell key={j} height="41.8" />
                ))}
            </TableRow>
        ));
    }, [columns, itemsPerPage, rows.length]);

    const hasActiveColumnAction = React.useCallback(
        (column: HeaderGroup<Data>) => {
            const columnHeadingArr = column.id.split('.');
            return (
                activeSortColumn === column.id ||
                activeFilterColumns?.includes(
                    columnHeadingArr.length > 1
                        ? columnHeadingArr[1]
                        : columnHeadingArr[0]
                )
            );
        },
        [activeFilterColumns, activeSortColumn]
    );

    const getIsRowDisabled = React.useCallback(
        (rowId: string) => {
            return disabledRowMap[rowId] ?? false;
        },
        [disabledRowMap]
    );

    const getIsCellForceEnabled = React.useCallback(
        (rowId: string, cellColumn: Column) => {
            const isRowDisabled = getIsRowDisabled(rowId);
            const isForceEnabled = isRowDisabled
                ? cellColumn.isForceEnabled ?? false
                : true;
            return isForceEnabled;
        },
        [getIsRowDisabled]
    );

    const onHandleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        handleChangeRowsPerPage(event);
    };

    const onHandleChangePage = (event: unknown, page: number) => {
        handleChangePage(event, page);
    };

    return (
        <>
            <PaginatedTableHeader tableHeaderCTA={tableHeaderCTA} />
            <TableContainer
                id={id}
                sx={{
                    '.MuiTableCell-stickyHeader': {
                        fontWeight: 900
                    },
                    height: tableHeight,
                    paddingBottom: '16px',
                    overflow: 'scroll',
                    fontFamily: 'Lato',
                    '.MuiTableCell-root': {
                        fontFamily: 'Lato',
                        padding: size === 'medium' ? '10.5px 16px' : '4px 16px',
                        fontSize: '0.85rem',
                        '.MuiTypography-root': {
                            fontSize: '0.85rem'
                        },
                        '.MuiButtonBase-root': {
                            padding: 0.8
                        }
                    },

                    backgroundColor:
                        rows.length === 0 && !isLoading && NoDataFound
                            ? grey[100]
                            : 'white'
                }}
            >
                <MaUTable
                    {...getTableProps()}
                    stickyHeader
                    className="table sticky"
                    size={size}
                >
                    <TableHead sx={{ height: 50 }}>
                        {headerGroups.map((headerGroup, index) => (
                            <React.Fragment key={index}>
                                <TableRow
                                    {...headerGroup.getHeaderGroupProps()}
                                >
                                    {headerGroup.headers.map(
                                        (column: any, columnIndex) => (
                                            <React.Fragment key={columnIndex}>
                                                <TableCell
                                                    {...column.getHeaderProps({
                                                        style: {
                                                            color: hasActiveColumnAction(
                                                                column
                                                            )
                                                                ? theme.palette
                                                                      .primary
                                                                      .main
                                                                : '',
                                                            minWidth:
                                                                column.minWidth,
                                                            width: column.width,
                                                            maxWidth:
                                                                column.maxWidth,
                                                            zIndex: column?.sticky
                                                                ? 200
                                                                : 200 -
                                                                  columnIndex
                                                        }
                                                    })}
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
                                                                {column.canFilter &&
                                                                column.Filter
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
                                {subHeader &&
                                !!Object.keys(subHeader).length &&
                                rows.length ? (
                                    <TableRow>
                                        {headerGroup.headers.map(header => (
                                            <React.Fragment key={header.id}>
                                                <TableCell
                                                    {...header.getHeaderProps({
                                                        style: {
                                                            minWidth:
                                                                header.minWidth,
                                                            width: header.width,
                                                            maxWidth:
                                                                header.maxWidth,
                                                            top: 42,
                                                            backgroundColor:
                                                                grey[200]
                                                        }
                                                    })}
                                                >
                                                    <TextOverFlow
                                                        value={
                                                            subHeader[header.id]
                                                        }
                                                        maxWidth={
                                                            header.minWidth ||
                                                            200
                                                        }
                                                        sx={{ fontWeight: 600 }}
                                                    />
                                                    {}
                                                </TableCell>
                                            </React.Fragment>
                                        ))}
                                    </TableRow>
                                ) : null}
                            </React.Fragment>
                        ))}
                    </TableHead>

                    <TableBody sx={{ maxHeight: 'calc(100vh - 168px)' }}>
                        {isLoading ? (
                            <PaginatedTableSkeleton
                                rowCount={itemsPerPage}
                                columnCount={columns.length}
                            />
                        ) : (
                            <>
                                {rows.map((row, i) => {
                                    prepareRow(row);
                                    const isRowDisabled = getIsRowDisabled(
                                        row.values.id
                                    );
                                    return (
                                        <React.Fragment
                                            key={row.values.id ?? i}
                                        >
                                            <TableRow
                                                {...row.getRowProps({
                                                    style: {
                                                        backgroundColor:
                                                            isAllSelected ||
                                                            selectedRows.indexOf(
                                                                row.values.id
                                                            ) > -1
                                                                ? '#cfdff6'
                                                                : '',
                                                        position: 'relative',
                                                        pointerEvents:
                                                            isRowDisabled
                                                                ? 'none'
                                                                : undefined
                                                    }
                                                })}
                                            >
                                                {row.cells.map(
                                                    (cell: any, index) => {
                                                        const isForceEnabled =
                                                            getIsCellForceEnabled(
                                                                row.values.id,
                                                                cell.column
                                                            );
                                                        const zIndex =
                                                            isForceEnabled
                                                                ? row.cells
                                                                      .length
                                                                : 1 + index;
                                                        return (
                                                            <React.Fragment
                                                                key={index}
                                                            >
                                                                <TableCell
                                                                    {...cell.getCellProps(
                                                                        {
                                                                            style: {
                                                                                minWidth:
                                                                                    cell
                                                                                        .column
                                                                                        .minWidth,
                                                                                width: cell
                                                                                    .column
                                                                                    .width,
                                                                                maxWidth:
                                                                                    cell
                                                                                        .column
                                                                                        .maxWidth,
                                                                                zIndex: cell
                                                                                    ?.column
                                                                                    ?.sticky
                                                                                    ? zIndex +
                                                                                      1
                                                                                    : zIndex,
                                                                                borderBottomColor:
                                                                                    grey[200],
                                                                                backgroundColor:
                                                                                    isAllSelected ||
                                                                                    selectedRows.indexOf(
                                                                                        row
                                                                                            .values
                                                                                            .id
                                                                                    ) >
                                                                                        -1
                                                                                        ? '#cfdff6'
                                                                                        : '',
                                                                                pointerEvents:
                                                                                    isForceEnabled
                                                                                        ? 'auto'
                                                                                        : undefined
                                                                            }
                                                                        }
                                                                    )}
                                                                    className={`${
                                                                        cell
                                                                            .column
                                                                            .sticky ===
                                                                        'left'
                                                                            ? 'left-sticky-cell'
                                                                            : cell
                                                                                  .column
                                                                                  .sticky ===
                                                                              'right'
                                                                            ? 'right-sticky-cell'
                                                                            : ''
                                                                    }`}
                                                                >
                                                                    {isMobile ? (
                                                                        <Grid
                                                                            container
                                                                            alignItems="center"
                                                                            height="100%"
                                                                        >
                                                                            <Grid
                                                                                item
                                                                            >
                                                                                {cell.render(
                                                                                    'Cell'
                                                                                )}
                                                                            </Grid>
                                                                        </Grid>
                                                                    ) : (
                                                                        cell.render(
                                                                            'Cell'
                                                                        )
                                                                    )}
                                                                </TableCell>
                                                            </React.Fragment>
                                                        );
                                                    }
                                                )}
                                                {isRowDisabled && (
                                                    <DisabledRowMask
                                                        columnCount={
                                                            row.cells.length
                                                        }
                                                        isRowSelected={
                                                            isAllSelected ||
                                                            selectedRows.indexOf(
                                                                row.values.id
                                                            ) > -1
                                                        }
                                                    />
                                                )}
                                            </TableRow>
                                        </React.Fragment>
                                    );
                                })}
                                {rows.length !== 0 && generateEmptyRows()}
                            </>
                        )}
                    </TableBody>
                </MaUTable>
                {rows.length === 0 && !isLoading && NoDataFound && (
                    <Grid
                        top="100px"
                        left="0%"
                        position="sticky"
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDirection="column"
                    >
                        {NoDataFound ? NoDataFound : null}
                    </Grid>
                )}
            </TableContainer>
            {isPaginationEnabled && (
                <Grid
                    container
                    bgcolor="white"
                    alignItems="center"
                    sx={{ borderTop: `1px solid ${grey[300]}` }}
                >
                    <Grid item xs={6} md="auto">
                        <TablePagination
                            color="white"
                            rowsPerPageOptions={rowsPerPageOptions}
                            component="div"
                            count={total}
                            rowsPerPage={itemsPerPage}
                            page={currentPage - 1}
                            onPageChange={onHandleChangePage}
                            onRowsPerPageChange={onHandleChangeRowsPerPage}
                            showFirstButton
                            showLastButton
                            sx={{
                                '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows':
                                    {
                                        fontSize: '0.85rem !important'
                                    },

                                '.MuiTablePagination-toolbar': {
                                    minHeight: 40
                                }
                            }}
                        />
                    </Grid>
                    {footer && (
                        <Grid item xs={6} md overflow="auto" textAlign="end">
                            {footer}
                        </Grid>
                    )}
                </Grid>
            )}
        </>
    );
};
