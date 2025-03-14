import { PaginatedTable as Table } from '@components/common';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { useVoiceCallMetrics } from 'hooks/apiHooks/neha/useVoiceCallMetrics';
import { CallMetricColumns } from 'hooks/columns/CallMetricColumns';
import { usePaginatedReactTable } from 'hooks/usePaginatedReactTable';
import { useTableActions } from 'hooks/useTableActions';
import { TableFilters } from 'hooks/useTableFilters';
import { useEffect, useState } from 'react';
import { theme } from 'theme';

export const CallMetrics = () => {
    const [isRefetchRequired, setIsRefetchRequired] = useState(false);
    const {
        sort,
        filters,
        setFilters,
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
            tableId: 'neha-call-metrics-table',
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
            searchKey: '',
            sort
        }
    });

    useEffect(() => {
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
            />
        </ThemeProvider>
    );
};
