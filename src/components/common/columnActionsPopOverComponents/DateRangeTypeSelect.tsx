import React from 'react';
import _ from 'lodash';

import { Grid } from '@mui/material';

import { DateFilterSelect, DateRangePicker } from 'components/common';

import { TimeUtils } from 'utils';
import { DATE_FILTER_SELECT_TYPE, FIELD_SIZE } from 'Enum';

import {
    type DateFilterStateProps,
    type DateRangeFilterKeyProps,
    type TableFiltersProps
} from 'interfaces';

interface DateRangeTypeSelectProps {
    id: DateRangeFilterKeyProps;
    tableFiltersState?: Pick<TableFiltersProps, DateRangeFilterKeyProps>;
    setTableFiltersState: (_: TableFiltersProps) => void;
    setSelectedDateFilter: (_: string) => void;
    selectedDateFilter: string;
}

export const DateRangeTypeSelect = ({
    id,
    tableFiltersState,
    setTableFiltersState,
    setSelectedDateFilter,
    selectedDateFilter
}: DateRangeTypeSelectProps) => {
    const [filterState, setFilterState] = React.useState<DateFilterStateProps>({
        startDate: _.get(tableFiltersState, `${id}.startDate`, ''),
        endDate: _.get(tableFiltersState, `${id}.endDate`, '')
    });

    const onChangeDates = (fieldName: string, selectedDate: Date | null) => {
        setFilterState({
            ...filterState,
            ...filterState,
            [fieldName]: selectedDate ? selectedDate : ''
        });
        const modifiedTableFilters: Partial<TableFiltersProps> = {
            ...tableFiltersState,
            [id]: {
                ...tableFiltersState?.[id],
                [fieldName]: selectedDate
                    ? TimeUtils.getUtcISOString(selectedDate)
                    : ''
            }
        };
        setTableFiltersState({ ...modifiedTableFilters } as TableFiltersProps);
    };

    return (
        <Grid item xs={12} px={2} py={0.5} display="flex" rowGap={1}>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                rowGap={1}
            >
                <DateFilterSelect
                    id={id}
                    setTableFiltersState={setTableFiltersState}
                    tableFiltersState={tableFiltersState}
                    setSelectedDateFilter={setSelectedDateFilter}
                    selectedDateFilter={selectedDateFilter}
                    setFilterState={setFilterState}
                />
                {selectedDateFilter === DATE_FILTER_SELECT_TYPE.dateRange && (
                    <DateRangePicker
                        filterState={filterState}
                        onDateRangeChange={onChangeDates}
                        size={FIELD_SIZE.small}
                    />
                )}
            </Grid>
        </Grid>
    );
};
