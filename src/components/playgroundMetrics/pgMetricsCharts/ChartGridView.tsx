import { LeftColumn, MidColumn, RightColumn } from './columns';
import { NestedGridWrapper } from './wrappers';

interface ChartGridViewProps {
    totalCalls: number;
    totalDuration: number;
    callsConnected: number;
    totalCompletedCalls: number;
    callsDisconnected: number;
    callsNotPicked: number;
    callsBelow45Seconds: number;
    callsBetween46To90Seconds: number;
    callsAbove90Seconds: number;
    medianDuration: number;
    uniqueNumbersReachedOnce: number;
    uniqueNumbersReachedMoreThanOnce: number;
    phoneNumbersReached: number;
}

export const ChartGridView = ({
    totalCalls,
    totalDuration,
    callsConnected,
    totalCompletedCalls,
    callsDisconnected,
    callsNotPicked,
    callsBelow45Seconds,
    callsBetween46To90Seconds,
    callsAbove90Seconds,
    medianDuration,
    uniqueNumbersReachedOnce,
    uniqueNumbersReachedMoreThanOnce
}: ChartGridViewProps) => {
    return (
        <NestedGridWrapper>
            <LeftColumn
                totalCalls={totalCalls}
                callsConnected={callsConnected}
                totalDuration={totalDuration}
                medianDuration={medianDuration}
            />
            <MidColumn
                totalCompletedCalls={totalCompletedCalls}
                callsDisconnected={callsDisconnected}
                callsNotPicked={callsNotPicked}
                uniqueNumbersReachedOnce={uniqueNumbersReachedOnce}
            />
            <RightColumn
                callsBelow45Seconds={callsBelow45Seconds}
                callsBetween46To90Seconds={callsBetween46To90Seconds}
                callsAbove90Seconds={callsAbove90Seconds}
                uniqueNumbersReachedMoreThanOnce={
                    uniqueNumbersReachedMoreThanOnce
                }
            />
        </NestedGridWrapper>
    );
};
