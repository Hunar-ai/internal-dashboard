import React from 'react';

import { PaginatedTable as Table } from '@components/common';
import { NehaMetricsColumns } from './NehaMetricsColumns';
import { NehaSelectLeadUploadModal } from './NehaSelectLeadUploadModal';
import { NehaSelectTableHeader } from './NehaSelectTableHeader';

import { useTableActions, usePaginatedReactTable } from 'hooks';
import { useSearchNehaSelectLeads } from 'hooks/apiHooks/nehaSelect/useSearchNehaSelectLeads';

export const NehaSelectMasterTable = () => {
    const [isRefetchRequired, setIsRefetchRequired] = React.useState(false);
    const {
        sort,
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
            tableId: 'neha-select-master-table',
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
    } = useSearchNehaSelectLeads({
        params: {
            companyId: 'select'
        }
    });

    React.useEffect(() => {
        if (isRefetchRequired) {
            refreshMetrics();
            setIsRefetchRequired(false);
        }
    }, [isRefetchRequired, refreshMetrics, setIsRefetchRequired]);

    const formattedData = React.useMemo(() => {
        if (!data || !Array.isArray(data)) return [];
        return data.slice(0, 100);
    }, [data]);

    return (
        <>
            <Table
                columns={columns}
                data={formattedData}
                isLoading={isLoading}
                activeSortColumn={sort?.key}
                activeFilterColumns={activeFilterColumns}
                paginationInfo={minimalPaginationInfo}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                tableHeaderCTA={<NehaSelectTableHeader />}
            />
            <NehaSelectLeadUploadModal onUploadSuccess={refreshMetrics} />
        </>
    );
};
