import { LeftColumn, MidColumn, RightColumn } from './columns';
import { NestedGridWrapper } from './wrappers';

interface ChartGridViewProps {
    totalCalls: number;
    connectedCalls: number;
    totalDuration: number;
    completed: number;
    disconnected: number;
    notPicked: number;
    below45: number;
    between46To90: number;
    above90: number;
    medianDuration: number;
    uniqueNumbersReachedOnce: number;
    uniqueNumbersReachedMoreThanOnce: number;
}

export const ChartGridView = ({
    totalCalls,
    connectedCalls,
    totalDuration,
    completed,
    disconnected,
    notPicked,
    below45,
    between46To90,
    above90,
    medianDuration,
    uniqueNumbersReachedOnce,
    uniqueNumbersReachedMoreThanOnce
}: ChartGridViewProps) => {
    return (
        <NestedGridWrapper>
            <LeftColumn
                totalCalls={totalCalls}
                connectedCalls={connectedCalls}
                totalDuration={totalDuration}
                medianDuration={medianDuration}
            />
            <MidColumn
                completed={completed}
                disconnected={disconnected}
                notPicked={notPicked}
                uniqueNumbersReachedOnce={uniqueNumbersReachedOnce}
            />
            <RightColumn
                below45={below45}
                between46To90={between46To90}
                above90={above90}
                uniqueNumbersReachedMoreThanOnce={
                    uniqueNumbersReachedMoreThanOnce
                }
            />
        </NestedGridWrapper>
    );
};
