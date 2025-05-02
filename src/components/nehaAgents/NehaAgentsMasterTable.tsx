import React from 'react';

import { PaginatedTable, PaginatedTableHeader } from '@components/common';
import { NehaAgentsColumns } from './NehaAgentsColumns';
import { NehaAgentsLeadUploadModal } from './NehaAgentsLeadUploadModal';
import { NehaAgentsTableHeader } from './NehaAgentsTableHeader';

import { useTableActions, usePaginatedReactTable } from 'hooks';
import { useSearchNehaAgentCalls } from 'hooks/apiHooks/nehaAgents/useSearchNehaAgentCalls';

import { SORT_ORDER } from 'Enum';
import { OptionProps } from 'interfaces';

export const NehaAgentsMasterTable = () => {
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
    const [company, setCompany] = React.useState<OptionProps | null>(null);

    const columns = NehaAgentsColumns({
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
        isFetching: isCallDataLoading
    } = useSearchNehaAgentCalls({
        enabled: !!company?.value,
        params: {
            companyId: company?.value ?? ''
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
                    <NehaAgentsTableHeader
                        company={company}
                        filters={tableFilters}
                        setCompany={setCompany}
                        setSearchKey={setSearchKey}
                    />
                }
            />
            <PaginatedTable
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
            <NehaAgentsLeadUploadModal
                companyId={company?.value ?? null}
                onUploadSuccess={refreshCallData}
            />
        </>
    );
};
