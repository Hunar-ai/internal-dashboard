import React from 'react';
import _ from 'lodash';

import FilterListIcon from '@mui/icons-material/FilterList';
import { Button, Grid, IconButton, Popover, useTheme } from '@mui/material';

import { SortSection, DateRangeTypeSelect } from 'components/common/';
import MultiSelectSection from 'components/common/columnActionsPopOverComponents/MultiSelectSection';

import {
    type OptionProps,
    type Sort,
    type TableFiltersProps,
    type FilterKeyProps,
    type MultiSelectFilterKeyProps,
    type ColumnFilterProps,
    type DateRangeFilterKeyProps
} from 'interfaces';
import { FILTER_TYPE, SORT_TYPE } from 'Enum';
import { useHelper } from 'useHelper';

export interface FilterOptionProps extends OptionProps {
    checked: boolean;
}

export type FilterOptionsProps = FilterOptionProps[];

export const ColumnActionsPopOver = ({ column }: ColumnFilterProps) => {
    const { isMultiSelect: getIsMultiSelect, isDateRangeSelect } = useHelper();
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

    const isMultiSelect = getIsMultiSelect(id);
    const isDateRange = isDateRangeSelect(id);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const [optionsState, setOptionsState] = React.useState<FilterOptionsProps>(
        []
    );

    const [tableFiltersState, setTableFiltersState] =
        React.useState<TableFiltersProps>();
    const [selectedDateFilter, setSelectedDateFilter] = React.useState('');
    const [selectedDateFilterCopy, setSelectedDateFilterCopy] =
        React.useState<string>('');
    const [isDateFilterApplied, setIsDateFilterApplied] =
        React.useState<boolean>(false);
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
                    ?.map((option: Option) => {
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
        sort
    ]);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setShowColumnActions(true);
        if (!isDateFilterApplied) {
            setSelectedDateFilter('');
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setShowColumnActions(false);
        setSelectedDateFilter(selectedDateFilterCopy);
    };

    const applyColumnActions = (id: FilterKeyProps) => {
        setIsDateFilterApplied(false);
        setSelectedDateFilterCopy(selectedDateFilter);

        if (sortState) handleSort(sortState);
        if (columnActionsProps.filterProps && tableFiltersState) {
            const modifiedTableFiltersState: Partial<TableFiltersProps> = {
                ...tableFiltersState
            };
            if (
                isMultiSelect &&
                [modifiedTableFiltersState[id] || []]?.length === 0
            )
                delete modifiedTableFiltersState[id];

            columnActionsProps.filterProps.filters.setTableFilters(
                modifiedTableFiltersState as TableFiltersProps
            );
        }
        if (isDateRange && selectedDateFilter !== '') {
            setIsDateFilterApplied(true);
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

                    {columnActionsProps.filterProps?.filterType ===
                        FILTER_TYPE.MULTI_SELECT && isMultiSelect ? (
                        <MultiSelectSection
                            id={id as MultiSelectFilterKeyProps}
                            columnId={columnId}
                            optionsState={optionsState}
                            setOptionsState={setOptionsState}
                            tableFiltersState={tableFiltersState}
                            setTableFiltersState={setTableFiltersState}
                        />
                    ) : columnActionsProps.filterProps?.filterType ===
                          FILTER_TYPE.DATE_RANGE && isDateRange ? (
                        <DateRangeTypeSelect
                            id={id as DateRangeFilterKeyProps}
                            tableFiltersState={tableFiltersState}
                            setTableFiltersState={setTableFiltersState}
                            setSelectedDateFilter={setSelectedDateFilter}
                            selectedDateFilter={selectedDateFilter}
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
