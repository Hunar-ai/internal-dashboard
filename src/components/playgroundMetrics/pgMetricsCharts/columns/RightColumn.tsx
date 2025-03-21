import { Grid } from '@mui/material';

import { CallDurationChart } from '../charts';
import { NestedGridWrapper, VerticalGridWrapper } from '../wrappers';
import { MetricCard } from '../MetricCard';
import { NumberUtils } from 'utils';

interface RightColumnProps {
    below45: number;
    between46To90: number;
    above90: number;
    uniqueNumbersReachedMoreThanOnce: number;
}

export const RightColumn = ({
    below45,
    between46To90,
    above90,
    uniqueNumbersReachedMoreThanOnce
}: RightColumnProps) => {
    return (
        <VerticalGridWrapper>
            <NestedGridWrapper>
                <Grid item xs={12}>
                    <CallDurationChart
                        below45={below45}
                        between46To90={between46To90}
                        above90={above90}
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
