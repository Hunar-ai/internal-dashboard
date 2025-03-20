import { search } from 'api/nehaSelect';
import { usePostReactQuery } from 'hooks/usePostReactQuery';
import { TableFilters } from 'hooks/useTableFilters';
import type { Sort } from 'interfaces';
import { useHelper } from 'useHelper';

interface GetSearchNehaSelectCalls {
    body: {
        page: number;
        itemsPerPage: number;
        filters: TableFilters;
        sort?: Sort;
    };
}

export const useSearchNehaSelectCalls = ({
    body
}: GetSearchNehaSelectCalls) => {
    const { getFormattedfilters } = useHelper();
    const { page, itemsPerPage, filters, sort } = body;

    return usePostReactQuery({
        queryKey: ['searchNehaSelectCalls', page, itemsPerPage, filters, sort],
        requestUrl: search,
        body: {
            ...body,
            filters: getFormattedfilters(body.filters)
        }
    });
};
