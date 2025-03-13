import { SORT_ORDER } from 'Enum';
import { Sort, TableFiltersProps } from 'interfaces';
import { useState, useCallback } from 'react';
import { TableFilters } from './useTableFilters';
// import { useHelper } from './useHelper';

export const useTableActions = (defaultSort?: {
    key: string;
    order: SORT_ORDER;
}) => {
    // const { isMultiSelect, isDateRangeSelect } = useHelper();
    const [filters, setFilters] = useState<TableFilters>({});
    const [sort, setSort] = useState<Sort | undefined>(defaultSort);
    const [tableFilters, setTableFilters] = useState<TableFiltersProps>({
        createdAt: {},
        status: []
    });

    const handleSort = useCallback(
        (sortBy: { key: string; order: SORT_ORDER }): void => {
            setSort({ ...sortBy });
        },
        []
    );

    return {
        sort,
        handleSort,
        filters,
        setFilters,
        tableFilters,
        setTableFilters
    };
};
