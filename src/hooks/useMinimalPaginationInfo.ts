import React from 'react';

import { type PaginationInfo } from 'interfaces';

const paginationInfoInitialState: PaginationInfo = {
    currentPage: 1,
    numberOfPages: 1,
    total: 0,
    itemsPerPage: 100,
    page: 1
};

export const useMinimalPaginationInfo = (itemsPerPage?: number) => {
    const [minimalPaginationInfo, setMinimalPaginationInfo] =
        React.useState<PaginationInfo>({
            ...paginationInfoInitialState,
            itemsPerPage:
                itemsPerPage ?? paginationInfoInitialState.itemsPerPage
        });

    const handleChangePage = React.useCallback(
        (_: unknown, newPage: number) => {
            setMinimalPaginationInfo({
                ...minimalPaginationInfo,
                page: newPage + 1,
                currentPage: newPage + 1
            });
        },
        [minimalPaginationInfo]
    );

    const handleChangeRowsPerPage = React.useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setMinimalPaginationInfo({
                ...minimalPaginationInfo,
                itemsPerPage: parseInt(event.target.value),
                page: 1,
                currentPage: 1
            });
        },
        [minimalPaginationInfo]
    );

    return {
        minimalPaginationInfo,
        handleChangePage,
        handleChangeRowsPerPage,
        paginationInfoInitialState,
        setMinimalPaginationInfo
    };
};
