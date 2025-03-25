import React from 'react';

import {
    PaginatedTable as Table,
    PaginatedTableHeader
} from '@components/common';
import { NehaSelectColumns } from './NehaSelectColumns';
import { NehaSelectLeadUploadModal } from './NehaSelectLeadUploadModal';
import { NehaSelectTableHeader } from './NehaSelectTableHeader';

import { useTableActions, usePaginatedReactTable } from 'hooks';
import { useSearchNehaSelectCalls } from 'hooks/apiHooks/nehaSelect/useSearchNehaSelectCalls';

import { SORT_ORDER } from 'Enum';

export const NehaSelectMasterTable = () => {
    const {
        sort,
        handleSort,
        tableFilters,
        setTableFilters,
        activeFilterColumns,
        dateFilterTypeMap,
        setDateFilterTypeMap
    } = useTableActions({
        key: 'updatedAt',
        order: SORT_ORDER.DESC
    });

    const [searchKey, setSearchKey] = React.useState('');

    const columns = NehaSelectColumns({
        sort,
        handleSort,
        tableFilters,
        setTableFilters,
        dateFilterTypeMap,
        setDateFilterTypeMap
    });

    const { minimalPaginationInfo, handleChangePage, handleChangeRowsPerPage } =
        usePaginatedReactTable({
            tableId: 'neha-select-master-table',
            columns,
            searchKey: ''
        });

    const {
        data: callData,
        refetch: refreshCallData,
        isLoading: isCallDataLoading
    } = useSearchNehaSelectCalls({
        params: {
            companyId: 'select'
        },
        requestBody: {
            searchKey,
            ...minimalPaginationInfo,
            filters: tableFilters,
            sort
        }
    });

    return (
        <>
            <PaginatedTableHeader
                height={56}
                pl={0}
                pr={0}
                tableHeaderCTA={
                    <NehaSelectTableHeader
                        setSearchKey={setSearchKey}
                        filters={tableFilters}
                    />
                }
            />
            <Table
                columns={columns}
                tableHeight="calc(100vh - 192px)"
                data={callData?.data ?? []}
                isLoading={isCallDataLoading}
                activeSortColumn={sort?.key}
                activeFilterColumns={activeFilterColumns}
                paginationInfo={callData?.paginationInfo}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <NehaSelectLeadUploadModal onUploadSuccess={refreshCallData} />
        </>
    );
};
