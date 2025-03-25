import React from 'react';

import { Grid, ThemeProvider } from '@mui/material';

import { AppLoader, DateRangeTypeSelect } from '@components/common';
import { ChartGridView, NestedGridWrapper } from './pgMetricsCharts';

import { TableFilters, useGetPlaygroundMetrics } from 'hooks';

import { TableFiltersProps } from 'interfaces';
import { theme } from 'theme';

export const PGMetricsMasterChart = () => {
    const [tableFiltersState, setTableFiltersState] =
        React.useState<TableFiltersProps>({});
    const [selectedDateFilter, setSelectedDateFilter] = React.useState('');

    const { data, isLoading } = useGetPlaygroundMetrics({
        filters: { ...(tableFiltersState as TableFilters) }
    });

    if (isLoading) return <AppLoader />;

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={8}>
                <NestedGridWrapper>
                    <Grid item xs={6} />
                    <Grid item xs={6}>
                        <DateRangeTypeSelect
                            id="createdAt"
                            tableFiltersState={tableFiltersState}
                            setTableFiltersState={setTableFiltersState}
                            selectedDateFilter={selectedDateFilter}
                            setSelectedDateFilter={setSelectedDateFilter}
                        />
                    </Grid>
                </NestedGridWrapper>

                <ChartGridView
                    totalCalls={data?.totalCalls}
                    callsConnected={data?.callsConnected}
                    totalDuration={data?.totalDuration}
                    totalCompletedCalls={data?.totalCompletedCalls}
                    callsDisconnected={data?.callsDisconnected}
                    callsNotPicked={data?.callsNotPicked}
                    callsBelow45Seconds={data?.below_45}
                    callsBetween46To90Seconds={data?.between_46To_90}
                    callsAbove90Seconds={data?.above_90}
                    medianDuration={data?.medianDuration}
                    uniqueNumbersReachedOnce={data?.uniqueNumbersReachedOnce}
                    uniqueNumbersReachedMoreThanOnce={
                        data?.uniqueNumbersReachedMoreThanOnce
                    }
                    phoneNumbersReached={data?.phoneNumbersReached}
                />
            </Grid>
        </ThemeProvider>
    );
};
