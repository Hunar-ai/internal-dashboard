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
    label,
    value,
    color,
    sx = {},
    variant = 'body1',
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
