import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';

interface MetricCardProps {
    label: string;
    value: number | string;
}

export const MetricCard = ({ label, value }: MetricCardProps) => {
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
            <CardHeader title={label} />
            <CardContent>
                <Typography variant="h4" component="div" fontWeight={600}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
};
