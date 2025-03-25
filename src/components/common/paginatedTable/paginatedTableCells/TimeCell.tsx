import React from 'react';

import { Typography } from '@mui/material';

import { DateTimeFormat, TimeUtils } from 'utils';

interface TimeCellProps {
    value: string | null;
    defaultValue?: string;
}

export const TimeCell = ({ value, defaultValue = '' }: TimeCellProps) => {
    const formattedTime = React.useMemo(() => {
        return value
            ? TimeUtils.format(
                  TimeUtils.getDateFromUtcISOString(value),
                  DateTimeFormat.HTML5_FMT_TIME
              )
            : defaultValue;
    }, [defaultValue, value]);

    return (
        <Typography variant="body2" component="span">
            {formattedTime}
        </Typography>
    );
};
