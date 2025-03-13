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
    // tableId,
    // columns,
    searchKey,
    itemsPerPage
}: PaginatedReactTableProps) => {
    // const { displayColumns, tableDisplayColumns, handleColumnModifierChange } =
    //     useGlobalActions(columns, tableId);

    const {
        minimalPaginationInfo,
        handleChangePage,
        handleChangeRowsPerPage,
        paginationInfoInitialState,
        setMinimalPaginationInfo
    } = useMinimalPaginationInfo(itemsPerPage);

    console.log('Metallica: ', minimalPaginationInfo);

    React.useEffect(() => {
        handleChangePage(undefined, 0);
    }, [searchKey]);

    return {
        // displayColumns,
        // tableDisplayColumns,
        // handleColumnModifierChange,
        minimalPaginationInfo,
        handleChangePage,
        handleChangeRowsPerPage,
        paginationInfoInitialState,
        setMinimalPaginationInfo
    };
};
