import React from 'react';

import { PaginatedTable as Table } from '@components/common';
import { NehaMetricsColumns } from './NehaMetricsColumns';
import { NehaSelectLeadUploadModal } from './NehaSelectLeadUploadModal';
import { NehaSelectTableHeader } from './NehaSelectTableHeader';

import {
    type TableFilters,
    useTableActions,
    usePaginatedReactTable
} from 'hooks';
import { useSearchNehaSelectCalls } from 'hooks/apiHooks/nehaSelect/useSearchNehaSelectCalls';

export const NehaSelectMasterTable = () => {
    const [isRefetchRequired, setIsRefetchRequired] = React.useState(false);
    const {
        sort,
        filters,
        handleSort,
        tableFilters,
        setTableFilters,
        activeFilterColumns
    } = useTableActions();

    const columns = NehaMetricsColumns({
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
    } = useSearchNehaSelectCalls({
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
        <>
            <Table
                columns={columns}
                data={data?.data ?? []}
                isLoading={isLoading}
                activeSortColumn={sort?.key}
                activeFilterColumns={activeFilterColumns}
                paginationInfo={data?.paginationInfo}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                tableHeaderCTA={<NehaSelectTableHeader />}
            />
            <NehaSelectLeadUploadModal />
        </>
    );
};
