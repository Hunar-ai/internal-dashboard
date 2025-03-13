import _ from 'lodash';
import { SORT_ORDER } from 'Enum';
import { Sort, TableFiltersProps } from 'interfaces';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { TableFilters } from './useTableFilters';
import { useHelper } from 'useHelper';
import { FilterKeyProps } from 'interfaces/filter.interface';
// import { useHelper } from './useHelper';

export const useTableActions = (defaultSort?: {
    key: string;
    order: SORT_ORDER;
}) => {
    const { isMultiSelect, isDateRangeSelect } = useHelper();
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

    const activeFilterColumns = useMemo(
        () =>
            (
                Object.keys(tableFilters) as Array<keyof typeof tableFilters>
            ).filter((columnId: keyof typeof tableFilters) => {
                const id = columnId as FilterKeyProps;
                if (isMultiSelect(id)) {
                    const appliedFiltersLength = _.get(
                        tableFilters,
                        `${id}.length`,
                        0
                    );
                    return appliedFiltersLength > 0;
                } else if (isDateRangeSelect(id)) {
                    const appliedFiltersLength = Object.keys(
                        tableFilters[id] || {}
                    ).length;
                    return appliedFiltersLength > 0;
                }
            }),
        [isDateRangeSelect, isMultiSelect, tableFilters]
    );

    return {
        sort,
        handleSort,
        filters,
        setFilters,
        tableFilters,
        setTableFilters,
        activeFilterColumns
    };
};
