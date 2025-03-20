import { searchPlaygroundMetrics } from 'api/playgroundMetrics';
import { usePostReactQuery } from 'hooks/usePostReactQuery';
import { TableFilters } from 'hooks/useTableFilters';
import { type Sort } from 'interfaces';
import { useHelper } from 'useHelper';

interface SearchPlaygroundMetricsProps {
    body: {
        page: number;
        itemsPerPage: number;
        filters: TableFilters;
        sort?: Sort;
    };
}

export const useSearchPlaygroundMetrics = ({
    body
}: SearchPlaygroundMetricsProps) => {
    const { getFormattedfilters } = useHelper();
    const { page, itemsPerPage, filters, sort } = body;

    return usePostReactQuery({
        queryKey: [
            'searchPlaygroundMetrics',
            page,
            itemsPerPage,
            filters,
            sort
        ],
        requestUrl: searchPlaygroundMetrics,
        body: {
            ...body,
            filters: getFormattedfilters(body.filters)
        }
    });
};
