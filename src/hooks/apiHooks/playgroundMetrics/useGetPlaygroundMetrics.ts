import { getPlaygroundMetrics } from 'api/playgroundMetrics';

import { usePostReactQuery } from 'hooks/usePostReactQuery';
import { type TableFilters } from 'hooks/useTableFilters';

import { useHelper } from 'useHelper';

interface useGetPlaygroundMetricsProps {
    filters: TableFilters;
}

export const useGetPlaygroundMetrics = ({
    filters
}: useGetPlaygroundMetricsProps) => {
    const { getFormattedfilters } = useHelper();

    return usePostReactQuery({
        queryKey: ['useGetPlaygroundMetrics', filters],
        requestUrl: getPlaygroundMetrics,
        body: {
            filters: getFormattedfilters(filters)
        }
    });
};
