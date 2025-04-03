import { Grid } from '@mui/material';

import {
    CallBreakdownChart,
    CallConversionChart,
    CallDurationChart
} from './charts';
import { MetricsContainer } from './MetricsContainer';
import { NestedGridWrapper, VerticalGridWrapper } from './wrappers';

interface ChartGridViewProps {
    totalCalls: number;
    totalDuration: number;
    callsConnected: number;
    totalCompletedCalls: number;
    callsDisconnected: number;
    callsNotPicked: number;
    callsBelow45Seconds: number;
    callsBetween46To90Seconds: number;
    callsAbove90Seconds: number;
    medianDuration: number;
    uniqueNumbersReachedOnce: number;
    uniqueNumbersReachedMoreThanOnce: number;
    phoneNumbersReached: number;
}

export const ChartGridView = ({
    totalCalls,
    totalDuration,
    callsConnected,
    totalCompletedCalls,
    callsDisconnected,
    callsNotPicked,
    callsBelow45Seconds,
    callsBetween46To90Seconds,
    callsAbove90Seconds,
    medianDuration,
    uniqueNumbersReachedOnce,
    uniqueNumbersReachedMoreThanOnce
}: ChartGridViewProps) => {
    return (
        <NestedGridWrapper>
            <Grid item md={7} xs={12}>
                <VerticalGridWrapper md={12} xs={12}>
                    <Grid container spacing={4} sx={{ paddingTop: 0 }}>
                        <Grid item xs={12}>
                            <MetricsContainer
                                totalCalls={totalCalls}
                                totalDuration={totalDuration}
                                callsConnected={callsConnected}
                                medianDuration={medianDuration}
                                uniqueNumbersReachedOnce={
                                    uniqueNumbersReachedOnce
                                }
                                uniqueNumbersReachedMoreThanOnce={
                                    uniqueNumbersReachedMoreThanOnce
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={5}>
                            <CallConversionChart
                                totalCalls={totalCalls}
                                totalCompletedCalls={totalCompletedCalls}
                            />
                        </Grid>
                        <Grid item xs={7}>
                            <CallBreakdownChart
                                totalCompletedCalls={totalCompletedCalls}
                                callsDisconnected={callsDisconnected}
                                callsNotPicked={callsNotPicked}
                            />
                        </Grid>
                    </Grid>
                </VerticalGridWrapper>
            </Grid>
            <Grid item md={5} xs={12}>
                <CallDurationChart
                    callsBelow45Seconds={callsBelow45Seconds}
                    callsBetween46To90Seconds={callsBetween46To90Seconds}
                    callsAbove90Seconds={callsAbove90Seconds}
                />
            </Grid>
        </NestedGridWrapper>
    );
};
