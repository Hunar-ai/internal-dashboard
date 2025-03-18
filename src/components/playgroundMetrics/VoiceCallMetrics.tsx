import React from 'react';

import { ThemeProvider, Typography } from '@mui/material';

import { PaginatedTable as Table } from '@components/common';

import {
    type TableFilters,
    useTableActions,
    usePaginatedReactTable,
    useVoiceCallMetrics
} from 'hooks';

import { theme } from 'theme';
import { CallMetricColumns } from './columns/CallMetricColumns';

const TableHeader = () => <Typography>Voice Call Metrics</Typography>;

export const VoiceCallMetrics = () => {
    const [isRefetchRequired, setIsRefetchRequired] = React.useState(false);
    const {
        sort,
        filters,
        handleSort,
        tableFilters,
        setTableFilters,
        activeFilterColumns
    } = useTableActions();

    const columns = CallMetricColumns({
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
        refetch: voiceMetricsRefresh,
        isLoading
    } = useVoiceCallMetrics({
        body: {
            ...minimalPaginationInfo,
            filters: { ...filters, ...(tableFilters as TableFilters) },
            sort
        }
    });

    React.useEffect(() => {
        if (isRefetchRequired) {
            voiceMetricsRefresh();
            setIsRefetchRequired(false);
        }
    }, [isRefetchRequired, voiceMetricsRefresh, setIsRefetchRequired]);

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
