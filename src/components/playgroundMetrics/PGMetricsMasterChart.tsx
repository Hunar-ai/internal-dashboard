import React from 'react';

import { Grid, ThemeProvider } from '@mui/material';

import { AppLoader } from '@components/common';
import { ChartGridView, FilterPopover } from './pgMetricsCharts';

import { TableFilters, useGetPlaygroundMetrics } from 'hooks';

import { TableFiltersProps } from 'interfaces';
import { theme } from 'theme';

export const PGMetricsMasterChart = () => {
    const [filtersState, setFiltersState] = React.useState<TableFiltersProps>(
        {}
    );
    const [selectedDateFilter, setSelectedDateFilter] = React.useState('');

    const { data, isLoading } = useGetPlaygroundMetrics({
        filters: { ...(filtersState as TableFilters) }
    });

    if (isLoading) return <AppLoader />;

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={8} sx={{ paddingTop: 4 }}>
                <FilterPopover
                    filtersState={filtersState}
                    setFiltersState={setFiltersState}
                    selectedDateFilter={selectedDateFilter}
                    setSelectedDateFilter={setSelectedDateFilter}
                />
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
