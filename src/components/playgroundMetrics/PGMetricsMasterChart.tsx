import React from 'react';

import { CircularProgress, Grid, ThemeProvider } from '@mui/material';

import { DateRangeTypeSelect } from '@components/common';
import { ChartGridView, NestedGridWrapper } from './pgMetricsCharts';

import { TableFilters, useGetPlaygroundMetrics } from 'hooks';

import { TableFiltersProps } from 'interfaces';
import { theme } from 'theme';
import fakeData from 'mockResponses/playgroundCharts';

export const PGMetricsMasterChart = () => {
    const [tableFiltersState, setTableFiltersState] =
        React.useState<TableFiltersProps>({});
    const [selectedDateFilter, setSelectedDateFilter] = React.useState('');

    /* TODO: Use data from API Hook */
    const { data: undoChange, isLoading } = useGetPlaygroundMetrics({
        filters: { ...(tableFiltersState as TableFilters) }
    });

    const data = fakeData;

    if (isLoading) return <CircularProgress />;

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
                    connectedCalls={data?.callsConnected}
                    totalDuration={data?.totalDuration}
                    completed={data?.totalCompletedCalls}
                    disconnected={data?.callsDisconnected}
                    notPicked={data?.callsNotPicked}
                    below45={data?.below45}
                    between46To90={data?.between46To90}
                    above90={data?.above90}
                    medianDuration={data?.medianDuration}
                    uniqueNumbersReachedOnce={data?.uniqueNumbersReachedOnce}
                    uniqueNumbersReachedMoreThanOnce={
                        data?.uniqueNumbersReachedMoreThanOnce
                    }
                />
            </Grid>
        </ThemeProvider>
    );
};
