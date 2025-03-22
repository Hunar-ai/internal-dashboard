import { Typography, type TypographyProps } from '@mui/material';

interface PGMetricsModalFieldProps {
    label?: string;
    value?: string;
    color?: TypographyProps['color'];
    variant?: TypographyProps['variant'];
    gutterBottom?: boolean;
    sx?: object;
}

export const PGMetricsModalField = ({
    label = '',
    value = '',
    color = 'text.primary',
    variant = 'body1',
    sx = {},
    gutterBottom = false
}: PGMetricsModalFieldProps) => {
    return (
        <Typography
            variant={variant}
            color={color}
            sx={sx}
            gutterBottom={gutterBottom}
        >
            {label ? <strong>{label}</strong> : <></>} {value}
        </Typography>
    );
};
