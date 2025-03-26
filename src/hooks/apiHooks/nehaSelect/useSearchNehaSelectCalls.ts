import { searchCalls } from 'api/nehaSelect';

import { usePostReactQuery } from 'hooks/usePostReactQuery';
import { useHelper } from 'useHelper';

import type {
    NehaSelectCallProps,
    PaginationInfo,
    Sort,
    TableFiltersProps
} from 'interfaces';

interface GetSearchNehaSelectCalls {
    params: {
        companyId: string;
    };
    requestBody: {
        searchKey: string;
        page: number;
        itemsPerPage: number;
        filters: TableFiltersProps;
        sort?: Sort;
    };
}

interface NehaSelectCallsResponse {
    data: NehaSelectCallProps[];
    paginationInfo: PaginationInfo;
}

export const useSearchNehaSelectCalls = ({
    params: { companyId },
    requestBody: { page, itemsPerPage, filters, sort, searchKey }
}: GetSearchNehaSelectCalls) => {
    const { getFormattedfilters } = useHelper();
    const formattedFilters = getFormattedfilters(filters);

    return usePostReactQuery<NehaSelectCallsResponse>({
        queryKey: [
            'searchNehaSelectCalls',
            companyId,
            page,
            itemsPerPage,
            formattedFilters,
            sort,
            searchKey
        ],
        requestUrl: searchCalls,
        params: { companyId },
        body: { page, itemsPerPage, filters: formattedFilters, sort, searchKey }
    });
};
