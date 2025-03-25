import React from 'react';
import _ from 'lodash';

import { DateFilter, DATE_FILTER_TYPE } from '@hunar.ai/hunar-design-system';

import type {
    DateFilterStateProps,
    DateRangeFilterKeyProps,
    TableFiltersProps
} from 'interfaces';

interface DateFilterSectionProps {
    columnId: DateRangeFilterKeyProps;
    tableFiltersState: TableFiltersProps;
    hasDateRangeError: boolean;
    selectedDateFilter: DATE_FILTER_TYPE;
    setTableFiltersState: (_: TableFiltersProps) => void;
    setSelectedDateFilter: (_: DATE_FILTER_TYPE) => void;
}

export const DateFilterSection = ({
    columnId,
    tableFiltersState,
    hasDateRangeError,
    selectedDateFilter,
    setTableFiltersState,
    setSelectedDateFilter
}: DateFilterSectionProps) => {
    const { startDate, endDate } = React.useMemo(() => {
        return {
            startDate: _.get(tableFiltersState, `${columnId}.startDate`, null),
            endDate: _.get(tableFiltersState, `${columnId}.endDate`, null)
        };
    }, [tableFiltersState, columnId]);

    const handleFilterStateUpdate = (
        modifiedFilterState: DateFilterStateProps | null
    ) => {
        if (modifiedFilterState) {
            const modifiedTableFilters = {
                ...tableFiltersState,
                [columnId]: modifiedFilterState
            };
            setTableFiltersState(modifiedTableFilters);
        } else {
            const modifiedTableFilters = {
                ...tableFiltersState
            };
            delete modifiedTableFilters[columnId];
            setTableFiltersState(modifiedTableFilters);
        }
    };

    return (
        <DateFilter
            id={`${columnId}-filter`}
            name={`${columnId}Filter`}
            startDate={startDate}
            endDate={endDate}
            selectedFilterType={selectedDateFilter}
            hasDateRangeError={hasDateRangeError}
            handleFilterStateUpdate={handleFilterStateUpdate}
            handleFilterTypeUpdate={setSelectedDateFilter}
        />
    );
};
