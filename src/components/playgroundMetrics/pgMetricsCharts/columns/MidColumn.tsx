import { Grid } from '@mui/material';

import { CallBreakdownChart } from '../charts';
import { NestedGridWrapper, VerticalGridWrapper } from '../wrappers';
import { MetricCard } from '../MetricCard';
import { NumberUtils } from 'utils';

interface MidColumnProps {
    completed: number;
    disconnected: number;
    notPicked: number;
    uniqueNumbersReachedOnce: number;
}

export const MidColumn = ({
    completed,
    disconnected,
    notPicked,
    uniqueNumbersReachedOnce
}: MidColumnProps) => {
    return (
        <VerticalGridWrapper>
            <NestedGridWrapper>
                <Grid item xs={12}>
                    <CallBreakdownChart
                        completed={completed}
                        disconnected={disconnected}
                        notPicked={notPicked}
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
