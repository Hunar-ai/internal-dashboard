import { searchCalls } from 'api/nehaAgents';

import { usePostReactQuery } from 'hooks/usePostReactQuery';
import { useHelper } from 'useHelper';

import type {
    NehaAgentCallProps,
    PaginationInfo,
    Sort,
    TableFiltersProps
} from 'interfaces';

interface SearchNehaAgentsCallsProps {
    enabled: boolean;
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

interface NehaAgentsCallsResponse {
    data: NehaAgentCallProps[];
    paginationInfo: PaginationInfo;
}

export const useSearchNehaAgentCalls = ({
    enabled,
    params: { companyId },
    requestBody: { page, itemsPerPage, filters, sort, searchKey }
}: SearchNehaAgentsCallsProps) => {
    const { getFormattedfilters } = useHelper();
    const formattedFilters = getFormattedfilters(filters);

    return usePostReactQuery<NehaAgentsCallsResponse>({
        queryKey: [
            'searchNehaAgentCalls',
            companyId,
            page,
            itemsPerPage,
            formattedFilters,
            sort,
            searchKey
        ],
        requestUrl: searchCalls,
        params: { companyId },
        body: {
            page,
            itemsPerPage,
            filters: formattedFilters,
            sort,
            searchKey
        },
        enabled
    });
};
