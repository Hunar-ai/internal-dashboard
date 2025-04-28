import React from 'react';

import { Typography } from '@mui/material';

import { AppTooltip } from 'components/common';

import { useHelper } from 'useHelper';

import { DateTimeFormat, TimeUtils } from 'utils';

interface DateCellProps {
    value: string | null;
    defaultValue?: string;
}

export const DateCell = ({ value, defaultValue = '' }: DateCellProps) => {
    const { getRelativeDateField } = useHelper();

    const formattedDate = React.useMemo(() => {
        return value
            ? TimeUtils.format(value, DateTimeFormat.HUMAN_DATE_FORMAT)
            : defaultValue;
    }, [defaultValue, value]);

    const relativeDate = React.useMemo(() => {
        return getRelativeDateField(value);
    }, [value, getRelativeDateField]);

    return (
        <AppTooltip title={relativeDate} placement="bottom-start">
            <Typography variant="body2" component="span">
                {formattedDate}
            </Typography>
        </AppTooltip>
    );
};
