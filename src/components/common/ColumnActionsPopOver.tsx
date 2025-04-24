import React from 'react';
import _ from 'lodash';

import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Grid, IconButton, Popover, useTheme } from '@mui/material';

import { DATE_FILTER_TYPE } from '@hunar.ai/hunar-design-system';
import {
    SortSection,
    MultiSelectSection,
    DateFilterSection
} from '@components/common';

import type {
    OptionProps,
    Sort,
    TableFiltersProps,
    FilterKeyProps,
    MultiSelectFilterKeyProps,
    ColumnFilterProps,
    DateRangeFilterKeyProps
} from 'interfaces';
import { FILTER_TYPE, SORT_TYPE } from 'Enum';

export interface FilterOptionProps extends OptionProps {
    checked: boolean;
}

export type FilterOptionsProps = FilterOptionProps[];

export const ColumnActionsPopOver = ({ column }: ColumnFilterProps) => {
    const theme = useTheme();

    const {
        id: columnId,
        columnActionsProps,
        columnActionsProps: {
            sortProps: { sort, handleSort, sortType = SORT_TYPE.DEFAULT }
        }
    } = column;

    const id: FilterKeyProps =
        columnId.split('.').length > 1
            ? (columnId.split('.')[1] as FilterKeyProps)
            : (columnId.split('.')[0] as FilterKeyProps);

    const isMultiSelect =
        columnActionsProps.filterProps?.filterType === FILTER_TYPE.MULTI_SELECT;
    const isDateRange =
        columnActionsProps.filterProps?.filterType === FILTER_TYPE.DATE_RANGE;
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const [optionsState, setOptionsState] = React.useState<FilterOptionsProps>(
        []
    );

    const [tableFiltersState, setTableFiltersState] =
        React.useState<TableFiltersProps>();
    const [selectedDateFilter, setSelectedDateFilter] =
        React.useState<DATE_FILTER_TYPE>(DATE_FILTER_TYPE.NONE);
    const [showColumnActions, setShowColumnActions] =
        React.useState<boolean>(false);
    const [sortState, setSortState] = React.useState<Sort | undefined>(sort);

    React.useEffect(() => {
        if (columnActionsProps.filterProps) {
            if (isMultiSelect) {
                const {
                    options = [],
                    filters: { tableFilters, hideBlanks }
                } = columnActionsProps.filterProps;
                const modifiedOptionsState = (
                    hideBlanks ? [] : [{ value: 'NONE', label: 'Blanks' }]
                )
                    .concat(options)
                    ?.map((option: OptionProps) => {
                        const filterValueArray = tableFilters[id]
                            ? tableFilters[id]
                            : [];
                        if (
                            Array.isArray(filterValueArray) &&
                            filterValueArray.indexOf(option.value) > -1
                        ) {
                            return { ...option, checked: true };
                        }
                        return { ...option, checked: false };
                    });

                setOptionsState(
                    _.orderBy(modifiedOptionsState, ['checked'], 'desc')
                );
                setTableFiltersState(tableFilters);
            } else if (isDateRange) {
                const {
                    filters: { tableFilters, dateFilterTypeMap }
                } = columnActionsProps.filterProps;
                setTableFiltersState(tableFilters);
                setSelectedDateFilter(
                    dateFilterTypeMap?.[id] ?? DATE_FILTER_TYPE.NONE
                );
            } else {
                const {
                    filters: { tableFilters }
                } = columnActionsProps.filterProps;
                setTableFiltersState(tableFilters);
            }
            setSortState(sort);
        }
    }, [
        id,
        columnActionsProps.filterProps,
        showColumnActions,
        isMultiSelect,
        isDateRange,
        sort
    ]);

    const hasDateRangeError = React.useMemo(() => {
        const startDate = _.get(tableFiltersState, `${id}.startDate`, '');
        const endDate = _.get(tableFiltersState, `${id}.endDate`, '');

        return !!startDate && !!endDate && endDate < startDate;
    }, [tableFiltersState, id]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setShowColumnActions(true);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setShowColumnActions(false);
    };

    const applyColumnActions = (id: FilterKeyProps) => {
        if (sortState) handleSort(sortState);
        if (columnActionsProps.filterProps && tableFiltersState) {
            const modifiedTableFiltersState = { ...tableFiltersState };

            if (
                isMultiSelect &&
                [modifiedTableFiltersState[id] || []]?.length === 0
            ) {
                delete modifiedTableFiltersState[id];
            } else if (isDateRange) {
                const dateFilterTypeMap =
                    columnActionsProps.filterProps.filters.dateFilterTypeMap ??
                    {};
                const modifiedDateRangeFilterType = {
                    ...dateFilterTypeMap,
                    [id]: selectedDateFilter
                };

                if (
                    selectedDateFilter === DATE_FILTER_TYPE.NONE ||
                    Object.keys(modifiedTableFiltersState?.[id] || {})
                        .length === 0
                ) {
                    delete modifiedDateRangeFilterType[id];
                    delete modifiedTableFiltersState[id];
                }

                columnActionsProps.filterProps.filters.setDateFilterTypeMap?.(
                    modifiedDateRangeFilterType
                );
            }

            columnActionsProps.filterProps.filters.setTableFilters(
                modifiedTableFiltersState
            );
        }
        setAnchorEl(null);
        setShowColumnActions(false);
    };

    const popoverId = showColumnActions
        ? `column-actions-popover-${id}`
        : undefined;

    const multiSelectValues = _.get(
        columnActionsProps,
        `filterProps.filters.tableFilters.${id}`,
        []
    );

    const handleApplyClick = () => {
        applyColumnActions(id);
    };

    return (
        <>
            <IconButton
                onClick={handleClick}
                size="small"
                type="button"
                color={
                    (isMultiSelect &&
                        Array.isArray(multiSelectValues) &&
                        multiSelectValues.length) ||
                    (isDateRange &&
                        Object.keys(
                            columnActionsProps.filterProps?.filters
                                .tableFilters[id] || {}
                        ).length) ||
                    sort?.key === columnId
                        ? 'primary'
                        : 'default'
                }
                sx={{
                    bgcolor: showColumnActions
                        ? theme.palette.action.hover
                        : undefined
                }}
            >
                <FilterListIcon fontSize="small" />
            </IconButton>
            <Popover
                anchorEl={anchorEl}
                id={popoverId}
                open={showColumnActions}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <Grid container width={282}>
                    <SortSection
                        sortType={sortType}
                        sortState={sortState}
                        setSortState={setSortState}
                        id={columnId}
                    />

                    {isMultiSelect ? (
                        <MultiSelectSection
                            id={id as MultiSelectFilterKeyProps}
                            columnId={columnId}
                            optionsState={optionsState}
                            setOptionsState={setOptionsState}
                            tableFiltersState={tableFiltersState}
                            setTableFiltersState={setTableFiltersState}
                        />
                    ) : isDateRange ? (
                        <DateFilterSection
                            columnId={id as DateRangeFilterKeyProps}
                            tableFiltersState={tableFiltersState ?? {}}
                            selectedDateFilter={selectedDateFilter}
                            hasDateRangeError={hasDateRangeError}
                            setTableFiltersState={setTableFiltersState}
                            setSelectedDateFilter={setSelectedDateFilter}
                        />
                    ) : (
                        <></>
                    )}
                    <Grid item xs={12} px={2} py={1.5}>
                        <Grid
                            height="100%"
                            container
                            justifyContent="end"
                            alignItems="end"
                            columnSpacing={2}
                        >
                            <Grid item>
                                <Button
                                    variant="text"
                                    onClick={handleClose}
                                    type="button"
                                >
                                    CANCEL
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    onClick={handleApplyClick}
                                    disabled={hasDateRangeError}
                                >
                                    APPLY
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Popover>
        </>
    );
};
