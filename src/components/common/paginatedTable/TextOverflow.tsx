import { SxProps } from '@mui/material/styles';
import { Typography } from '@mui/material';

import { AppTooltip } from 'components/common';

interface TextOverFlowProps {
    value?: string;
    maxWidth: number | string;
    sx?: SxProps;
    textAlign?: 'left' | 'center' | 'right' | 'inherit';
}

export const TextOverFlow = ({
    value = '',
    maxWidth,
    sx = {},
    textAlign = 'left'
}: TextOverFlowProps) => {
    const formattedValue = value ? value : '';

    return (
        <AppTooltip title={formattedValue}>
            <Typography
                variant="body2"
                width={maxWidth}
                textAlign={textAlign}
                noWrap
                sx={{ ...sx }}
            >
                {formattedValue}
            </Typography>
        </AppTooltip>
    );
};
