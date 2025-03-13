import { useEffect, useState } from 'react';
import _ from 'lodash';
import { useHelper } from 'hooks/useHelper';
import { DateRangeFilterKeyProps, OptionProps, Sort } from 'interfaces';
import {
    ColumnFilterProps,
    FilterKeyProps,
    MultiSelectFilterKeyProps,
    TableFiltersProps
} from 'interfaces/filter.interface';
import { Button, Grid, IconButton, Popover } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { SortSection } from './columnActionsPopOverComponents/SortSection';
import { FILTER_TYPE, SORT_TYPE } from 'Enum';
import MultiSelectSection from './columnActionsPopOverComponents/MultiSelectSection';
import { DateRangeTypeSelect } from './columnActionsPopOverComponents';

export interface FilterOptionProps extends OptionProps {
    checked: boolean;
}

export type FilterOptionsProps = FilterOptionProps[];

export const ColumnActionsPopOver = ({ column }: ColumnFilterProps) => {
    const {
        id: columnId,
        columnActionsProps,
        columnActionsProps: {
            sortProps: { sort, handleSort, sortType = SORT_TYPE.DEFAULT }
        }
    } = column;
    const { isMultiSelect: getIsMultiSelect, isDateRangeSelect } = useHelper();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [sortState, setSortState] = useState<Sort | undefined>();
    const [tableFiltersState, setTableFiltersState] =
        useState<TableFiltersProps>();
    const [selectedDateFilter, setSelectedDateFilter] = useState('');
    const [selectedDateFilterCopy, setSelectedDateFilterCopy] =
        useState<string>('');
    const [isDateFilterApplied, setIsDateFilterApplied] =
        useState<boolean>(false);
    const [optionsState, setOptionsState] = useState<FilterOptionsProps>([]);
    const [showColumnActions, setShowColumnActions] = useState<boolean>(false);

    const isMultiSelect = getIsMultiSelect(columnId);
    const isDateRange = isDateRangeSelect(columnId);

    const id: FilterKeyProps =
        columnId.split('.').length > 1
            ? (columnId.split('.')[1] as FilterKeyProps)
            : (columnId.split('.')[0] as FilterKeyProps);
    const popoverId = showColumnActions
        ? `column-actions-popover-${id}`
        : undefined;

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
            ) {
                delete modifiedTableFiltersState[id];
            }
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

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setShowColumnActions(true);
        if (!isDateFilterApplied) {
            setSelectedDateFilter('');
        }
    };

    const handleApplyClick = () => {
        applyColumnActions(id);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setShowColumnActions(false);
        setSelectedDateFilter(selectedDateFilterCopy);
    };

    useEffect(() => {
        if (columnActionsProps?.filterProps) {
            if (isMultiSelect) {
                const {
                    options = [],
                    filters: { tableFilters, hideBlanks }
                } = columnActionsProps.filterProps;
                const modifiedOptionsState = hideBlanks
                    ? []
                    : [{ value: 'NONE', label: 'Blank' }]
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

    return (
        <>
            <IconButton onClick={handleClick}>
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
                        sortState={sortState}
                        sortType={sortType}
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
                    ) : columnActionsProps?.filterProps?.filterType ===
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
                    <Grid item>
                        <Grid
                            height="100%"
                            container
                            justifyContent="end"
                            alignItems="end"
                            columnSpacing={2}
                        >
                            <Button
                                variant="text"
                                onClick={handleClose}
                                type="button"
                            >
                                CANCEL
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleApplyClick}
                                type="button"
                            >
                                APPLY
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Popover>
        </>
    );
};
