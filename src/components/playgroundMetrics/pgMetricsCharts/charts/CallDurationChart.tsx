import { BarChart } from '@mui/x-charts/BarChart';

import { ChartWrapper } from '../wrappers';

interface CallDurationChartProps {
    below45: number;
    between46To90: number;
    above90: number;
}

export const CallDurationChart = ({
    below45 = 0,
    between46To90 = 0,
    above90 = 0
}: CallDurationChartProps) => {
    const data = [
        { label: '<45', value: below45 },
        { label: '46 to 90', value: between46To90 },
        { label: '> 90', value: above90 }
    ];

    return (
        <ChartWrapper title="Call Duration Breakdown">
            <BarChart
                resolveSizeBeforeRender={true}
                xAxis={[
                    {
                        scaleType: 'band',
                        data: data.map(d => d.label)
                    }
                ]}
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
