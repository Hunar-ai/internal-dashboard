import { PaginatedTable as Table } from '@components/common';
import { createTheme, ThemeProvider } from '@mui/material';
import { SORT_ORDER } from 'Enum';
import { useVoiceCallMetrics } from 'hooks/apiHooks/neha/useVoiceCallMetrics';
import { CallMetricColumns } from 'hooks/columns/CallMetricColumns';
import { usePaginatedReactTable } from 'hooks/usePaginatedReactTable';
import { useTableActions } from 'hooks/useTableActions';
import { TableFilters } from 'hooks/useTableFilters';
import { useEffect, useState } from 'react';
// import { MyTable } from './MyTable';

const theme = createTheme({});

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

    // const originalFilters = {};
    const columns = CallMetricColumns({
        sort,
        handleSort,
        tableFilters,
        setTableFilters
    });

    const {
        // tableDisplayColumns,
        // displayColumns,
        // handleColumnModifierChange,
        minimalPaginationInfo,
        handleChangePage,
        handleChangeRowsPerPage
    } = usePaginatedReactTable({
        tableId: 'neha-call-metrics-table',
        defaultSort: {
            id: 'createdAt',
            desc: false
        },
        columns,
        searchKey: ''
    });

    const me = {
        status: filters?.status
    };

    const me2 = {
        status: tableFilters?.status
    };

    const ji = {
        ...minimalPaginationInfo,
        filters: {
            ...me,
            ...me2
        },
        searchKey: '',
        sort
    };
    console.log('JIII: ', ji);

    const {
        data,
        refetch: voiceMetricsRefresh,
        isLoading
        // isFetching
    } = useVoiceCallMetrics({
        body: {
            ...minimalPaginationInfo,
            filters: { ...filters, ...(tableFilters as TableFilters) },
            searchKey: '',
            sort
        }
        // body: {
        //     // ...minimalPaginationInfo,
        //     // itemsPerPage: 2,
        //     ...minimalPaginationInfo,
        //     itemsPerPage: 2,
        //     filters: {
        //         ...me,
        //         ...me2
        //     },
        //     searchKey: '',
        //     sort
        // }
        // body: ji
    });

    useEffect(() => {
        if (isRefetchRequired) {
            voiceMetricsRefresh();
            setIsRefetchRequired(false);
        }
    }, [isRefetchRequired, voiceMetricsRefresh, setIsRefetchRequired]);

    console.log('Neha: ', data?.paginationInfo, minimalPaginationInfo);

    return (
        <ThemeProvider theme={theme}>
            <Table
                columns={columns}
                data={data?.data ?? []}
                isLoading={isLoading}
                activeSortColumn={sort?.key}
                activeFilterColumns={activeFilterColumns}
                rowsPerPageOptions={[2, 10]}
                paginationInfo={data?.paginationInfo}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </ThemeProvider>
    );
};
