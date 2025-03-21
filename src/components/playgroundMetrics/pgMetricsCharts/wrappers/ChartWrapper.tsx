import { Card, CardContent, CardHeader } from '@mui/material';
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
                boxShadow: 3,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.05)'
                }
            }}
        >
            <CardHeader title={title} />
            <CardContent>{children}</CardContent>
        </Card>
    );
};
