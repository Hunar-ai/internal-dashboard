import { Grid, useTheme } from '@mui/material';
import {
    LooksOneOutlined,
    MoreTimeOutlined,
    PhoneForwardedOutlined,
    RingVolumeOutlined,
    TimelapseOutlined,
    TimerOutlined
} from '@mui/icons-material';

import { MetricCard } from './MetricCard';
import { VerticalGridWrapper } from './wrappers';

import { NumberUtils, TimeUtils } from 'utils';

interface MetricsContainerProps {
    totalCalls: number;
    totalDuration: number;
    callsConnected: number;
    medianDuration: number;
    uniqueNumbersReachedOnce: number;
    uniqueNumbersReachedMoreThanOnce: number;
}

export const MetricsContainer = ({
    totalCalls,
    totalDuration,
    callsConnected,
    medianDuration,
    uniqueNumbersReachedOnce,
    uniqueNumbersReachedMoreThanOnce
}: MetricsContainerProps) => {
    const theme = useTheme();

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={4}>
                    <VerticalGridWrapper xs={12} md={12}>
                        <MetricCard
                            label="Total Calls"
                            value={NumberUtils.abbreviateNumber(totalCalls)}
                            icon={
                                <RingVolumeOutlined
                                    sx={{ color: theme.palette.violet.main }}
                                    fontSize="large"
                                />
                            }
                        />
                        <MetricCard
                            label="Calls Connected"
                            value={callsConnected}
                            icon={
                                <PhoneForwardedOutlined
                                    sx={{ color: theme.palette.violet.main }}
                                    fontSize="large"
                                />
                            }
                        />
                    </VerticalGridWrapper>
                </Grid>
                <Grid item xs={4}>
                    <VerticalGridWrapper xs={12} md={12}>
                        <MetricCard
                            label="Total Duration"
                            value={TimeUtils.formatSeconds(totalDuration)}
                            icon={
                                <TimerOutlined
                                    sx={{ color: theme.palette.violet.main }}
                                    fontSize="large"
                                />
                            }
                        />
                        <MetricCard
                            label="Median Duration"
                            value={TimeUtils.formatSeconds(medianDuration)}
                            icon={
                                <TimelapseOutlined
                                    sx={{ color: theme.palette.violet.main }}
                                    fontSize="large"
                                />
                            }
                        />
                    </VerticalGridWrapper>
                </Grid>
                <Grid item xs={4}>
                    <VerticalGridWrapper xs={12} md={12}>
                        <MetricCard
                            label="Unique Calls"
                            value={NumberUtils.abbreviateNumber(
                                uniqueNumbersReachedOnce
                            )}
                            icon={
                                <LooksOneOutlined
                                    sx={{ color: theme.palette.violet.main }}
                                    fontSize="large"
                                />
                            }
                        />
                        <MetricCard
                            label="Multiple Calls"
                            value={NumberUtils.abbreviateNumber(
                                uniqueNumbersReachedMoreThanOnce
                            )}
                            icon={
                                <MoreTimeOutlined
                                    sx={{ color: theme.palette.violet.main }}
                                    fontSize="large"
                                />
                            }
                        />
                    </VerticalGridWrapper>
                </Grid>
            </Grid>
        </>
    );
};
