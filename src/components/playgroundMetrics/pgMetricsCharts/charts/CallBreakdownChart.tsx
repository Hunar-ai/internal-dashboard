import { PieChart } from '@mui/x-charts/PieChart';
import { amber, green, red } from '@mui/material/colors';

import { ChartWrapper } from '../wrappers';

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
    const data = [
        { value: totalCompletedCalls, label: 'Completed', color: green[300] },
        { value: callsDisconnected, label: 'Disconnected', color: red[300] },
        { value: callsNotPicked, label: 'Not Picked', color: amber[300] }
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
