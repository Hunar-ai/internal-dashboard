import { getPlaygroundCallMetrics } from 'api/playgroundMetrics';
import { usePostReactQuery } from 'hooks/usePostReactQuery';
import { TableFilters } from 'hooks/useTableFilters';
import { type Sort } from 'interfaces';
import { useHelper } from 'useHelper';

interface GetVoiceCallMetrics {
    body: {
        page: number;
        itemsPerPage: number;
        filters: TableFilters;
        sort?: Sort;
    };
}

export const useVoiceCallMetrics = ({ body }: GetVoiceCallMetrics) => {
    const { getFormattedfilters } = useHelper();
    const { page, itemsPerPage, filters, sort } = body;

    return usePostReactQuery({
        queryKey: ['useVoiceCallMetrics', page, itemsPerPage, filters, sort],
        requestUrl: getPlaygroundCallMetrics,
        body: {
            ...body,
            filters: getFormattedfilters(body.filters)
        }
    });
};
