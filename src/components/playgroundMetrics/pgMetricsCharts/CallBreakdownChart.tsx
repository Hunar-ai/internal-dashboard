import { useTheme } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

import { ChartWrapper } from '@components/playgroundMetrics/pgMetricsCharts';

import { NumberUtils } from 'utils';

interface CallBreakdownChartProps {
    totalCompletedCalls: number;
    callsDisconnected: number;
    callsNotPicked: number;
}

export const CallBreakdownChart = ({
    totalCompletedCalls = 0,
    callsDisconnected = 0,
    callsNotPicked = 0
}: CallBreakdownChartProps) => {
    const theme = useTheme();
    const data = [
        {
            value: totalCompletedCalls,
            label: 'Completed',
            color: theme.palette.violet.light
        },
        {
            value: callsNotPicked,
            label: 'Not Picked',
            color: theme.palette.violet.main
        },
        {
            value: callsDisconnected,
            label: 'Disconnected',
            color: theme.palette.violet.dark
        }
    ];

    return (
        <ChartWrapper title="Call Breakdown">
            <PieChart
                series={[
                    {
                        data: data,
                        innerRadius: 50,
                        outerRadius: 100,
                        arcLabelMinAngle: 30,
                        arcLabel: item =>
                            `${NumberUtils.abbreviateNumber(item.value)}`
                    }
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                        fontWeight: '500',
                        fontFamily: 'Lato, Arial'
                    }
                }}
                slotProps={{
                    legend: {
                        direction: 'column',
                        position: {
                            vertical: 'middle',
                            horizontal: 'right'
                        }
                    }
                }}
                margin={{ right: 160 }}
                height={260}
            />
        </ChartWrapper>
    );
};
