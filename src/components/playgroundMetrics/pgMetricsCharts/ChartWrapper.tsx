import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import { ReactNode } from 'react';

interface ChartWrapperProps {
    title: string;
    children: ReactNode;
}

export const ChartWrapper = ({ title, children }: ChartWrapperProps) => {
    return (
        <Card sx={{ minWidth: 200 }} elevation={1}>
            <CardHeader
                subheader={title}
                subheaderTypographyProps={{
                    fontWeight: 600
                }}
                sx={{ userSelect: 'none' }}
            />
            <Divider />
            <CardContent>{children}</CardContent>
        </Card>
    );
};
