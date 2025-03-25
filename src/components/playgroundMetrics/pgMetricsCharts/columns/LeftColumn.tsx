import { Grid } from '@mui/material';

import { NestedGridWrapper, VerticalGridWrapper } from '../wrappers';
import { MetricCard } from '../MetricCard';

import { NumberUtils, TimeUtils } from 'utils';

interface LeftColumnProps {
    totalCalls: number;
    callsConnected: number;
    totalDuration: number;
    medianDuration: number;
}

export const LeftColumn = ({
    totalCalls,
    callsConnected,
    totalDuration,
    medianDuration
}: LeftColumnProps) => {
    return (
        <VerticalGridWrapper>
            <NestedGridWrapper>
                <Grid item xs={6}>
                    <MetricCard
                        label="Total"
                        value={NumberUtils.abbreviateNumber(totalCalls)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <MetricCard
                        label="Connected"
                        value={NumberUtils.abbreviateNumber(callsConnected)}
                    />
                </Grid>
            </NestedGridWrapper>
            <NestedGridWrapper>
                <Grid item xs={12}>
                    <MetricCard
                        label="Total Duration"
                        value={TimeUtils.formatSeconds(totalDuration)}
                    />
                </Grid>
            </NestedGridWrapper>
            <NestedGridWrapper>
                <Grid item xs={12}>
                    <MetricCard
                        label="Median Duration"
                        value={TimeUtils.formatSeconds(medianDuration)}
                    />
                </Grid>
            </NestedGridWrapper>
        </VerticalGridWrapper>
    );
};
