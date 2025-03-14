import { nehaCallMetrics } from 'api/nehaMetrics';
import { usePostReactQuery } from 'hooks/usePostReactQuery';
import { Sort, TableFiltersProps } from 'interfaces';
import { useHelper } from 'useHelper';

interface GetVoiceCallMetrics {
    body: {
        page: number;
        itemsPerPage: number;
        filters?: TableFiltersProps;
        sort?: Sort;
    };
}

export const useVoiceCallMetrics = ({ body }: GetVoiceCallMetrics) => {
    const { getFormattedfilters } = useHelper();
    const { page, itemsPerPage, filters, sort } = body;

    return usePostReactQuery({
        queryKey: ['useVoiceCallMetrics', page, itemsPerPage, filters, sort],
        requestUrl: nehaCallMetrics,
        body: {
            ...body,
            filters: getFormattedfilters(body.filters)
        }
    });
};
