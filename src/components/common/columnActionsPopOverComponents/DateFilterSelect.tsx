import React from 'react';

import {
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { getSelectMenuSx } from 'components/common/AppStyles';

import type {
    DateRangeFilterKeyProps,
    TableFiltersProps,
    DateRangeFilterOptionProps,
    DateFilterStateProps
} from 'interfaces';
import { DATE_FILTER_SELECT_TYPE, FIELD_SIZE } from 'Enum';
import { TimeUtils } from 'utils';

interface DateFilterSelectProps {
    tableFiltersState?: Pick<TableFiltersProps, DateRangeFilterKeyProps>;
    setTableFiltersState: (_: TableFiltersProps) => void;
    id: DateRangeFilterKeyProps;
    setSelectedDateFilter: (_: string) => void;
    selectedDateFilter: string;
    setFilterState: (_: DateFilterStateProps) => void;
}

const filterOptions: DateRangeFilterOptionProps = {
    yesterday: {
        label: 'Yesterday',
        value: DATE_FILTER_SELECT_TYPE.yesterday,
        extraProps: {
            startDate: {
                period: 1
            },
            endDate: {
                period: 1
            }
        }
    },
    today: {
        label: 'Today',
        value: DATE_FILTER_SELECT_TYPE.today,
        extraProps: {
            startDate: {
                period: 0
            },
            endDate: {
                period: 0
            }
        }
    },
    past7Days: {
        label: 'Past 7 days',
        value: DATE_FILTER_SELECT_TYPE.past7Days,
        extraProps: {
            startDate: {
                period: 7
            },
            endDate: {
                period: 0
            }
        }
    },
    lastMonth: {
        label: 'Last One Month',
        value: DATE_FILTER_SELECT_TYPE.lastMonth,
        extraProps: {
            startDate: {
                period: 1,
                unit: 'months'
            },
            endDate: {
                period: 0
            }
        }
    },
    dateRange: {
        label: 'Date Range',
        value: DATE_FILTER_SELECT_TYPE.dateRange,
        extraProps: {
            startDate: {
                period: 0
            },
            endDate: {
                period: 0
            }
        }
    }
};

interface FilterOptionsExtraProps {
    date: Date | string;
    period: string | number;
    unit: 'days' | 'months' | 'years';
}

export const DateFilterSelect = ({
    tableFiltersState,
    setTableFiltersState,
    id,
    setSelectedDateFilter,
    selectedDateFilter,
    setFilterState
}: DateFilterSelectProps) => {
    const selectMenuSx = React.useMemo(
        () => getSelectMenuSx(selectedDateFilter),
        [selectedDateFilter]
    );

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
                ...tableFiltersState,
                [id]: {
                    ...tableFiltersState?.[id],
                    startDate,
                    endDate
                }
            };
            setTableFiltersState({
                ...modifiedTableFilters
            } as TableFiltersProps);
        },
        [id, setTableFiltersState, tableFiltersState]
    );

    const onFilterChange = (event: SelectChangeEvent) => {
        setSelectedDateFilter(event.target.value);
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
        } else {
            setFilterState({});
            const modifiedTableFilters: Partial<TableFiltersProps> = {
                ...tableFiltersState,
                [id]: {}
            };

            setTableFiltersState({
                ...modifiedTableFilters
            } as TableFiltersProps);
        }
    };

    const onClearClick = () => {
        setSelectedDateFilter('');
        const modifiedTableFilters: Partial<TableFiltersProps> = {
            ...tableFiltersState,
            [id]: {}
        };

        setTableFiltersState({
            ...modifiedTableFilters
        } as TableFiltersProps);
    };

    return (
        <>
            <Typography variant="overline" color={grey[700]}>
                {`FILTER BY DATE`}
            </Typography>
            <Button size="small" onClick={onClearClick} sx={{ mr: -0.5 }}>
                {`CLEAR ALL`}
            </Button>
            <Select
                displayEmpty
                fullWidth
                value={selectedDateFilter}
                onChange={onFilterChange}
                size={FIELD_SIZE.small}
                sx={selectMenuSx}
            >
                <MenuItem value="" disabled>
                    {`Select Date`}
                </MenuItem>
                {Object.values(filterOptions).map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
};
