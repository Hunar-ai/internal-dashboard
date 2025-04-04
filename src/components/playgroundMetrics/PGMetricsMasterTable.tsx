import React from 'react';

import { ThemeProvider, Typography } from '@mui/material';

import { PaginatedTable as Table } from '@components/common';

import {
    type TableFilters,
    useTableActions,
    usePaginatedReactTable,
    useSearchPlaygroundMetrics
} from 'hooks';

import { theme } from 'theme';
import { PlayGroundMetricsColumns } from './PGMetricsColumns';

const TableHeader = () => <Typography>Voice Call Metrics</Typography>;

export const PGMetricsMasterTable = () => {
    const [isRefetchRequired, setIsRefetchRequired] = React.useState(false);
    const {
        sort,
        filters,
        handleSort,
        tableFilters,
        setTableFilters,
        activeFilterColumns
    } = useTableActions();

    const columns = PlayGroundMetricsColumns({
        sort,
        handleSort,
        tableFilters,
        setTableFilters
    });

    const { minimalPaginationInfo, handleChangePage, handleChangeRowsPerPage } =
        usePaginatedReactTable({
            tableId: 'playground-call-metrics-table',
            defaultSort: {
                id: 'createdAt',
                desc: false
            },
            columns,
            searchKey: ''
        });

    const {
        data,
        refetch: refreshMetrics,
        isLoading
    } = useSearchPlaygroundMetrics({
        body: {
            ...minimalPaginationInfo,
            filters: { ...filters, ...(tableFilters as TableFilters) },
            sort
        }
    });

    React.useEffect(() => {
        if (isRefetchRequired) {
            refreshMetrics();
            setIsRefetchRequired(false);
        }
    }, [isRefetchRequired, refreshMetrics, setIsRefetchRequired]);

    return (
        <ThemeProvider theme={theme}>
            <Table
                columns={columns}
                data={data?.data ?? []}
                isLoading={isLoading}
                activeSortColumn={sort?.key}
                activeFilterColumns={activeFilterColumns}
                paginationInfo={data?.paginationInfo}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                tableHeaderCTA={<TableHeader />}
            />
        </ThemeProvider>
    );
};
