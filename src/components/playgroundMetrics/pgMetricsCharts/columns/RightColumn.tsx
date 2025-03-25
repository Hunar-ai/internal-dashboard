import { Grid } from '@mui/material';

import { CallDurationChart } from '../charts';
import { NestedGridWrapper, VerticalGridWrapper } from '../wrappers';
import { MetricCard } from '../MetricCard';
import { NumberUtils } from 'utils';

interface RightColumnProps {
    callsBelow45Seconds: number;
    callsBetween46To90Seconds: number;
    callsAbove90Seconds: number;
    uniqueNumbersReachedMoreThanOnce: number;
}

export const RightColumn = ({
    callsBelow45Seconds,
    callsBetween46To90Seconds,
    callsAbove90Seconds,
    uniqueNumbersReachedMoreThanOnce
}: RightColumnProps) => {
    return (
        <VerticalGridWrapper>
            <NestedGridWrapper>
                <Grid item xs={12}>
                    <CallDurationChart
                        callsBelow45Seconds={callsBelow45Seconds}
                        callsBetween46To90Seconds={callsBetween46To90Seconds}
                        callsAbove90Seconds={callsAbove90Seconds}
                    />
                </Grid>
            </NestedGridWrapper>
            <NestedGridWrapper>
                <Grid item xs={12}>
                    <MetricCard
                        label="Repeatedly Reached Numbers"
                        value={NumberUtils.format(
                            uniqueNumbersReachedMoreThanOnce
                        )}
                    />
                </Grid>
            </NestedGridWrapper>
        </VerticalGridWrapper>
    );
};
