import React from 'react';

import { Column } from 'components/common';
// import { useGlobalActions } from 'useGlobalActions';
import { useMinimalPaginationInfo } from './useMinimalPaginationInfo';

interface PaginatedReactTableProps {
    tableId: string;
    defaultSort?: { id: string; desc: boolean };
    columns: Column[];
    searchKey: string;
    itemsPerPage?: number;
}

export const usePaginatedReactTable = ({
    searchKey = '',
    itemsPerPage
}: PaginatedReactTableProps) => {
    const {
        minimalPaginationInfo,
        handleChangePage,
        handleChangeRowsPerPage,
        paginationInfoInitialState,
        setMinimalPaginationInfo
    } = useMinimalPaginationInfo(itemsPerPage);

    React.useEffect(() => {
        handleChangePage(undefined, 0);
    }, []);

    return {
        minimalPaginationInfo,
        handleChangePage,
        handleChangeRowsPerPage,
        paginationInfoInitialState,
        setMinimalPaginationInfo
    };
};
