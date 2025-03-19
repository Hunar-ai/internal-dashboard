import { getPlaygroundVoiceCallMetrics } from 'api/playgroundMetrics';
import { usePostReactQuery } from 'hooks/usePostReactQuery';
import { TableFilters } from 'hooks/useTableFilters';
import { type Sort } from 'interfaces';
import { useHelper } from 'useHelper';

interface GetPlaygroundVoiceCallMetrics {
    body: {
        page: number;
        itemsPerPage: number;
        filters: TableFilters;
        sort?: Sort;
    };
}

export const usePlaygroundVoiceCallMetrics = ({
    body
}: GetPlaygroundVoiceCallMetrics) => {
    const { getFormattedfilters } = useHelper();
    const { page, itemsPerPage, filters, sort } = body;

    return usePostReactQuery({
        queryKey: [
            'playgroundVoiceCallMetrics',
            page,
            itemsPerPage,
            filters,
            sort
        ],
        requestUrl: getPlaygroundVoiceCallMetrics,
        body: {
            ...body,
            filters: getFormattedfilters(body.filters)
        }
    });
};
