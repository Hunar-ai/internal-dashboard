import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import { ReactNode } from 'react';

interface ChartWrapperProps {
    title: string;
    children: ReactNode;
}

export const ChartWrapper = ({ title, children }: ChartWrapperProps) => {
    return (
        <Card
            sx={{
                minWidth: 200,
                borderRadius: 3,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.05)'
                }
            }}
            elevation={1}
        >
            <CardHeader subheader={title} />
            <Divider />
            <CardContent>{children}</CardContent>
        </Card>
    );
};
