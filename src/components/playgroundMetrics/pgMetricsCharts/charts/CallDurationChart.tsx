import { BarChart } from '@mui/x-charts/BarChart';

import { ChartWrapper } from '../wrappers';

interface CallDurationChartProps {
    callsBelow45Seconds: number;
    callsBetween46To90Seconds: number;
    callsAbove90Seconds: number;
}

export const CallDurationChart = ({
    callsBelow45Seconds = 0,
    callsBetween46To90Seconds = 0,
    callsAbove90Seconds = 0
}: CallDurationChartProps) => {
    const data = [
        { label: '<45', value: callsBelow45Seconds },
        { label: '46 to 90', value: callsBetween46To90Seconds },
        { label: '> 90', value: callsAbove90Seconds }
    ];

    return (
        <ChartWrapper title="Call Duration Breakdown">
            <BarChart
                resolveSizeBeforeRender={true}
                xAxis={[
                    {
                        scaleType: 'band',
                        data: data.map(d => d.label),
                        categoryGapRatio: 0.5
                    }
                ]}
                margin={{ left: 80 }}
                series={[
                    {
                        data: data.map(d => d.value),
                        color: '#1976d2'
                    }
                ]}
                height={220}
            />
        </ChartWrapper>
    );
};
