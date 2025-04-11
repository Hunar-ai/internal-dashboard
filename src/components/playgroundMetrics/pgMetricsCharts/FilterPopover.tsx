import React from 'react';

import {
    Box,
    Button,
    Grid,
    IconButton,
    MenuItem,
    Popover,
    Select,
    type SelectChangeEvent,
    Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { FilterList } from '@mui/icons-material';

import { getSelectMenuSx } from 'components/common/AppStyles';
import { filterOptions } from '@components/common/columnActionsPopOverComponents/DateFilterSelect';

import {
    DateFilterStateProps,
    type DateRangeFilterKeyProps,
    type TableFiltersProps
} from 'interfaces';
import { DATE_FILTER_SELECT_TYPE, FIELD_SIZE } from 'Enum';
import { DataUtils, TimeUtils } from 'utils';

interface FilterPopoverProps {
    filtersState?: Pick<TableFiltersProps, DateRangeFilterKeyProps>;
    setFiltersState: (_: TableFiltersProps) => void;
    selectedDateFilter: string;
    setSelectedDateFilter: (_: string) => void;
}

interface FilterOptionsExtraProps {
    date: Date | string;
    period: string | number;
    unit: 'days' | 'months' | 'years';
}

const getFilterLabel = (dateFilter: string) => {
    switch (dateFilter) {
        case '':
        case DATE_FILTER_SELECT_TYPE.noFilter:
            return 'Showing Metrics for All Time';
        case DATE_FILTER_SELECT_TYPE.yesterday:
            return 'Metrics for Yesterday';
        case DATE_FILTER_SELECT_TYPE.today:
            return 'Metrics for Today';
        case DATE_FILTER_SELECT_TYPE.past7Days:
            return 'Metrics for the Past 7 Days';
        case DATE_FILTER_SELECT_TYPE.lastMonth:
            return 'Metrics for Last Month';
        case DATE_FILTER_SELECT_TYPE.dateRange:
            return 'Metrics for a Custom Date Range';
    }
};

export const FilterPopover = ({
    filtersState,
    setFiltersState,
    selectedDateFilter,
    setSelectedDateFilter
}: FilterPopoverProps) => {
    const dateFilterId = 'createdAt';
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [filters, setFilters] = React.useState<TableFiltersProps>({
        ...filtersState
    });
    const [dateTypeFilter, setDateTypeFilter] =
        React.useState(selectedDateFilter);
    const [dateRangeFilterState, setDateRangeFilterState] =
        React.useState<DateFilterStateProps>({
            startDate: DataUtils.getDateFromObject(
                filters || {},
                `${dateFilterId}.startDate`
            ),
            endDate: DataUtils.getDateFromObject(
                filters || {},
                `${dateFilterId}.endDate`
            )
        });

    const selectMenuSx = React.useMemo(
        () => getSelectMenuSx(dateTypeFilter),
        [dateTypeFilter]
    );

    const isOpen = Boolean(anchorEl);
    const popoverId = isOpen ? 'filter-popover' : undefined;

    const calculateDate = ({ period, unit, date }: FilterOptionsExtraProps) => {
        const exactDate = TimeUtils.subtract({
            date: date,
            period: period,
            unit: unit
        });

        return TimeUtils.getISOString(exactDate);
    };

    const setModifiedFilters = React.useCallback(
        (startDate?: string, endDate?: string) => {
            const modifiedTableFilters: Partial<TableFiltersProps> = {
                ...filters,
                [dateFilterId]: {
                    ...filters?.[dateFilterId],
                    startDate,
                    endDate
                }
            };
            setFilters({
                ...modifiedTableFilters
            } as TableFiltersProps);
        },
        [filters, setFilters]
    );

    const handleDateFilterChange = (event: SelectChangeEvent) => {
        setDateTypeFilter(event.target.value);

        if (event.target.value !== DATE_FILTER_SELECT_TYPE.dateRange) {
            const selectedFilter =
                filterOptions?.[
                    event.target.value as keyof typeof filterOptions
                ];
            const extraProps = { ...selectedFilter?.extraProps };

            const startDate = calculateDate({
                date: TimeUtils.getISTStartOfTheDay(),
                unit: extraProps.startDate.unit
                    ? extraProps?.startDate?.unit
                    : 'days',
                period: extraProps.startDate.period
            });

            const endDate = calculateDate({
                date: TimeUtils.getISTEndOfTheDay(),
                unit: extraProps.endDate.unit
                    ? extraProps?.endDate?.unit
                    : 'days',
                period: extraProps.endDate.period
            });
            setModifiedFilters(startDate, endDate);
            setDateRangeFilterState({ startDate: '', endDate: '' });
        } else {
            setFilters({});
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const closePopover = (resetDateTypeFilter = true) => {
        setAnchorEl(null);
        if (resetDateTypeFilter) {
            setDateTypeFilter(selectedDateFilter);
        }
    };

    const handleClosePopover = () => {
        closePopover();
    };

    const applyFilterHandler = () => {
        if (dateTypeFilter === DATE_FILTER_SELECT_TYPE.dateRange) {
            if (
                !dateRangeFilterState?.startDate ||
                !dateRangeFilterState?.endDate
            ) {
                return;
            }

            setFiltersState({ ...filters, createdAt: dateRangeFilterState });
        } else {
            setFiltersState(filters);
        }
        setSelectedDateFilter(dateTypeFilter);
        closePopover(false);
    };

    const clearFilterHandler = () => {
        setFilters({});
        setDateTypeFilter('');
        setDateRangeFilterState({ startDate: '', endDate: '' });
    };

    const onChangeDates = (fieldName: string, selectedDate: Date | null) => {
        setDateRangeFilterState({
            ...dateRangeFilterState,
            [fieldName]: selectedDate ? selectedDate : ''
        });
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                height: 55,
                right: 120
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 2,
                    height: '100%'
                }}
            >
                {!isOpen && (
                    <Typography variant="body1">
                        {getFilterLabel(selectedDateFilter)}
                    </Typography>
                )}
                <IconButton
                    onClick={handleClick}
                    aria-describedby={`filter-icon`}
                >
                    <FilterList />
                </IconButton>
            </Box>
            <Popover
                id={popoverId}
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                disableAutoFocus
                disableEnforceFocus
            >
                <Box
                    sx={{
                        width: 400,
                        height: 320,
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box>
                        <Typography variant="body2" mb={2}>
                            Apply Filters
                        </Typography>
                        <Select
                            fullWidth
                            displayEmpty
                            value={dateTypeFilter}
                            onChange={handleDateFilterChange}
                            size={FIELD_SIZE.small}
                            sx={selectMenuSx}
                        >
                            <MenuItem value="" disabled>
                                {`Select Date`}
                            </MenuItem>
                            {Object.values(filterOptions).map(option => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {dateTypeFilter ===
                        DATE_FILTER_SELECT_TYPE.dateRange ? (
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Start Date"
                                    value={dateRangeFilterState?.startDate}
                                    sx={{ width: '100%', mt: 2 }}
                                    onChange={date =>
                                        onChangeDates(
                                            'startDate',
                                            TimeUtils.getISTStartOfTheDay(
                                                date as Date
                                            )
                                        )
                                    }
                                    slotProps={{
                                        textField: {
                                            size: 'small'
                                        }
                                    }}
                                />
                                <DatePicker
                                    formatDensity="dense"
                                    label="End Date"
                                    value={dateRangeFilterState?.endDate}
                                    sx={{ width: '100%', mt: 2 }}
                                    slotProps={{
                                        textField: {
                                            size: 'small'
                                        }
                                    }}
                                    onChange={date =>
                                        onChangeDates(
                                            'endDate',
                                            TimeUtils.getISTStartOfTheDay(
                                                date as Date
                                            )
                                        )
                                    }
                                />
                            </LocalizationProvider>
                        ) : (
                            <></>
                        )}
                    </Box>
                    <Grid
                        container
                        sx={{
                            justifyContent: 'space-between',
                            mt: 4,
                            alignSelf: 'flex-end'
                        }}
                    >
                        <Grid item>
                            <Button
                                color="violet"
                                variant="outlined"
                                onClick={clearFilterHandler}
                            >
                                Clear
                            </Button>
                        </Grid>

                        <Grid item>
                            <Button
                                color="violet"
                                variant="contained"
                                onClick={applyFilterHandler}
                            >
                                Apply
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Popover>
        </Box>
    );
};
