import { useQuery } from '@tanstack/react-query';
import { openJobQuery } from 'api/jobQuery';
import { nehaTest } from 'api/personnel';
import { usePostReactQuery } from 'hooks/usePostReactQuery';
import { SingleJobQueryResponse, Sort, TableFiltersProps } from 'interfaces';

interface GetVoiceCallMetrics {
    body: {
        page: number;
        itemsPerPage: number;
        filters?: TableFiltersProps;
        sort?: Sort;
    };
}

export const useVoiceCallMetrics = ({ body }: GetVoiceCallMetrics) => {
    const { page, itemsPerPage, filters, sort } = body;
    return usePostReactQuery({
        queryKey: [],
        requestUrl: nehaTest,
        body: {
            page,
            itemsPerPage,
            filters,
            sort
        },
        enabled: true,
        onSuccess: () => undefined,
        onError: () => undefined
    });

    // return useQuery<SingleJobQueryResponse>({
    //     queryKey: ['openJobQuery', shortcode],
    //     queryFn: () => {
    //         return openJobQuery
    //             .post({
    //                 params: {
    //                     shortcode
    //                 }
    //             })
    //             .then((response: any) => {
    //                 return response;
    //             });
    //     },
    //     refetchOnWindowFocus: false
    // });
};
