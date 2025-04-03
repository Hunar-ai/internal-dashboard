import { useTheme } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

import { ChartWrapper } from '../wrappers';

interface CallConversionChartProps {
    totalCompletedCalls: number;
    totalCalls: number;
}

export const CallConversionChart = ({
    totalCompletedCalls = 0,
    totalCalls = 0
}: CallConversionChartProps) => {
    const theme = useTheme();

    return (
        <ChartWrapper title="Conversion Rate">
            <Gauge
                value={totalCompletedCalls}
                valueMax={totalCalls}
                startAngle={-90}
                endAngle={90}
                sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 40,
                        transform: 'translate(0px, -25px)'
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: theme.palette.violet.main
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                        fill: 'whitesmoke'
                    }
                }}
                text={({ value, valueMax }) => {
                    if (value === null) return '';

                    const percentage = (value / valueMax) * 100;
                    return `${Math.ceil(percentage)}%`;
                }}
                height={260}
            />
        </ChartWrapper>
    );
};
