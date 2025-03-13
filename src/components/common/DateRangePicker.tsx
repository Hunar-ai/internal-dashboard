import React from 'react';

import { DatePicker, HelperText } from 'components/common';

import type { DateFilterStateProps } from 'interfaces';
import { DateTimeFormat, type DateTimeInputFormat, TimeUtils } from 'utils';
import { FIELD_SIZE } from 'Enum';

interface DateRangePickerProps {
    filterState: DateFilterStateProps;
    size?: FIELD_SIZE;
    startDateSelectorLabel?: string;
    endDateSelectorLabel?: string;
    inputFormat?: DateTimeInputFormat;
    onDateRangeChange: (_: string, __: Date | null) => void;
}

export const DateRangePicker = ({
    filterState,
    size = FIELD_SIZE.medium,
    startDateSelectorLabel = 'Start Date',
    endDateSelectorLabel = 'End Date',
    inputFormat = DateTimeFormat.DATE_PICKER_FORMAT,
    onDateRangeChange
}: DateRangePickerProps) => {
    const hasDateRangeError =
        !!filterState?.startDate &&
        !!filterState?.endDate &&
        filterState.endDate < filterState.startDate;

    const minEndDate = React.useMemo(() => {
        return TimeUtils.getDate(filterState?.startDate ?? '') || undefined;
    }, [filterState?.startDate]);

    return (
        <>
            <DatePicker
                label=""
                placeholder={startDateSelectorLabel}
                inputFormat={inputFormat}
                onChange={date =>
                    onDateRangeChange(
                        'startDate',
                        TimeUtils.getISTStartOfTheDay(date)
                    )
                }
                value={filterState?.startDate}
                size={FIELD_SIZE[size]}
            />
            <DatePicker
                label=""
                placeholder={endDateSelectorLabel}
                inputFormat={inputFormat}
                onChange={date =>
                    onDateRangeChange(
                        'endDate',
                        TimeUtils.getISTEndOfTheDay(date)
                    )
                }
                value={filterState?.endDate}
                size={FIELD_SIZE[size]}
                minDate={minEndDate}
                hasError={hasDateRangeError}
                helperText={
                    <HelperText
                        errorMsg={`End date must be greater than start date`}
                        hasError={hasDateRangeError}
                    />
                }
            />
        </>
    );
};
