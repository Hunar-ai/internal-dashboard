import React from 'react';

import { TableFilters } from 'hooks/useTableFilters';

import { FilterKeyProps } from 'interfaces';

import { TimeUtils } from 'utils';

export const useHelper = () => {
    const getRelativeDateField = (fieldValue: string | null) => {
        return fieldValue ? TimeUtils.timeSince(fieldValue) : '';
    };

    const isMultiSelect = React.useCallback((columnId: FilterKeyProps) => {
        return columnId === 'status';
    }, []);

    const isDateRangeSelect = React.useCallback((columnId: FilterKeyProps) => {
        return columnId === 'createdAt';
    }, []);

    const getFormattedfilters = (filters: TableFilters) => {
        const modifiedFilters = { ...filters };

        for (const modifiedFilterKey of Object.keys(modifiedFilters)) {
            const filterKey = modifiedFilterKey as keyof typeof modifiedFilters;
            if (Array.isArray(modifiedFilters[filterKey])) {
                const filter = (
                    modifiedFilters[filterKey] ? modifiedFilters[filterKey] : []
                ) as string[];
                if (filter?.length === 0) {
                    delete modifiedFilters[filterKey];
                }
            } else {
                if (
                    Object.keys(modifiedFilters[filterKey] || {}).length === 0
                ) {
                    delete modifiedFilters[filterKey];
                }
            }
        }

        return modifiedFilters;
    };

    return {
        getFormattedfilters,
        getRelativeDateField,
        isMultiSelect,
        isDateRangeSelect
    };
};
