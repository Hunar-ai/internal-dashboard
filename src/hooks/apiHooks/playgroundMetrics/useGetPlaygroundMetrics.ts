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
    const formattedFilters = getFormattedfilters(filters);

    return usePostReactQuery({
        queryKey: ['useGetPlaygroundMetrics', JSON.stringify(formattedFilters)],
        requestUrl: getPlaygroundMetrics,
        body: { ...formattedFilters?.createdAt }
    });
};
