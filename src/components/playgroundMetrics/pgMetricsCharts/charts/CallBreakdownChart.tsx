import { PieChart } from '@mui/x-charts/PieChart';
import { amber, green, red } from '@mui/material/colors';

import { ChartWrapper } from '../wrappers';

import { NumberUtils } from 'utils';

interface CallBreakdownChartProps {
    completed: number;
    disconnected: number;
    notPicked: number;
}

export const CallBreakdownChart = ({
    completed = 0,
    disconnected = 0,
    notPicked = 0
}: CallBreakdownChartProps) => {
    const data = [
        { value: completed, label: 'Completed', color: green[300] },
        { value: disconnected, label: 'Disconnected', color: red[300] },
        { value: notPicked, label: 'Not Picked', color: amber[300] }
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
                slotProps={{
                    legend: {
                        direction: 'column',
                        position: {
                            vertical: 'middle',
                            horizontal: 'right'
                        },
                        padding: 12
                    }
                }}
                margin={{ right: 160 }}
                height={220}
            />
        </ChartWrapper>
    );
};
