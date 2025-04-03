import React, { ReactNode } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';

interface MetricCardProps {
    icon: ReactNode;
    label: string;
    value: number | string;
}

export const MetricCard = ({ icon, label, value }: MetricCardProps) => {
    return (
        <Card sx={{ minWidth: 200 }} variant="outlined" elevation={0}>
            <CardContent
                sx={{
                    '&:last-child': { paddingBottom: '16px' },
                    paddingTop: '16px'
                }}
            >
                <Grid container sx={{ height: 60 }}>
                    <Grid
                        item
                        xs={4}
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex'
                        }}
                    >
                        {icon ? icon : <></>}
                    </Grid>
                    <Grid
                        item
                        xs={8}
                        sx={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <Typography
                            variant="h5"
                            component="div"
                            fontWeight={600}
                        >
                            {value ?? '-'}
                        </Typography>
                        <Typography
                            variant="caption"
                            component="div"
                            color="text.secondary"
                            fontWeight={400}
                        >
                            {label ?? '-'}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
