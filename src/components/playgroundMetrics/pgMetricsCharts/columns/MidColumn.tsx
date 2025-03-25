import { Grid } from '@mui/material';

import { CallBreakdownChart } from '../charts';
import { NestedGridWrapper, VerticalGridWrapper } from '../wrappers';
import { MetricCard } from '../MetricCard';
import { NumberUtils } from 'utils';

interface MidColumnProps {
    totalCompletedCalls: number;
    callsDisconnected: number;
    callsNotPicked: number;
    uniqueNumbersReachedOnce: number;
}

export const MidColumn = ({
    totalCompletedCalls,
    callsDisconnected,
    callsNotPicked,
    uniqueNumbersReachedOnce
}: MidColumnProps) => {
    return (
        <VerticalGridWrapper>
            <NestedGridWrapper>
                <Grid item xs={12}>
                    <CallBreakdownChart
                        totalCompletedCalls={totalCompletedCalls}
                        callsDisconnected={callsDisconnected}
                        callsNotPicked={callsNotPicked}
                    />
                </Grid>
            </NestedGridWrapper>
            <NestedGridWrapper>
                <Grid item xs={12}>
                    <MetricCard
                        label="One-Time Reached Numbers"
                        value={NumberUtils.format(uniqueNumbersReachedOnce)}
                    />
                </Grid>
            </NestedGridWrapper>
        </VerticalGridWrapper>
    );
};
