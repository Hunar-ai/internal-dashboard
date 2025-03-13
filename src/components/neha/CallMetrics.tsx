import { PaginatedTable } from '@components/common';
import { createTheme, ThemeProvider } from '@mui/material';
import { SORT_ORDER } from 'Enum';
import { useVoiceCallMetrics } from 'hooks/apiHooks/neha/useVoiceCallMetrics';
import { CallMetricColumns } from 'hooks/columns/CallMetricColumns';
import { useTableActions } from 'hooks/useTableActions';

const theme = createTheme({});

export const CallMetrics = () => {
    const { sort, handleSort, tableFilters, setTableFilters } =
        useTableActions();
    const columns = CallMetricColumns({
        sort,
        handleSort,
        tableFilters,
        setTableFilters
    });
    const { data, isFetching } = useVoiceCallMetrics({
        body: {
            page: 1,
            itemsPerPage: 20,
            filters: { status: ['completed'] },
            sort: { key: 'created_at', order: SORT_ORDER.DESC }
        }
    });

    return (
        <ThemeProvider theme={theme}>
            <PaginatedTable
                columns={columns}
                data={data?.data ?? []}
                isLoading={isFetching}
                handleChangePage={() => undefined}
                handleChangeRowsPerPage={() => undefined}
            />
        </ThemeProvider>
    );
};
