import React from 'react';

import _ from 'lodash';

import { type TableFilters } from 'hooks';

import {
    DateFilterTypeMapProps,
    FilterKeyProps,
    Sort,
    TableFiltersProps
} from 'interfaces';
import { SORT_ORDER } from 'Enum';

export const useTableActions = (defaultSort?: {
    key: string;
    order: SORT_ORDER;
}) => {
    const [filters, setFilters] = React.useState<TableFilters>({});
    const [sort, setSort] = React.useState<Sort | undefined>(defaultSort);
    const [tableFilters, setTableFilters] = React.useState<TableFiltersProps>({
        createdAt: {},
        updatedAt: {},
        status: [],
        willingnessToProceed: [],
        callLanguage: [],
        callLater: []
    });
    const [dateFilterTypeMap, setDateFilterTypeMap] =
        React.useState<DateFilterTypeMapProps>({});

    const handleSort = React.useCallback(
        (sortBy: { key: string; order: SORT_ORDER }): void => {
            setSort({ ...sortBy });
        },
        []
    );

    const activeFilterColumns = React.useMemo(() => {
        return (Object.keys(tableFilters) as Array<FilterKeyProps>).filter(
            columnId => {
                const appliedFilters = _.get(tableFilters, columnId, null);

                if (!appliedFilters) {
                    return false;
                } else if (Array.isArray(appliedFilters)) {
                    return appliedFilters.length > 0;
                } else if (typeof appliedFilters === 'object') {
                    return Object.keys(appliedFilters).length > 0;
                }
            }
        );
    }, [tableFilters]);

    return {
        sort,
        handleSort,
        filters,
        setFilters,
        tableFilters,
        setTableFilters,
        activeFilterColumns,
        dateFilterTypeMap,
        setDateFilterTypeMap
    };
};
