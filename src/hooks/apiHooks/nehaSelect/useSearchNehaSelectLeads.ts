import { searchLeads } from 'api/nehaSelect';

import { usePostReactQuery } from 'hooks/usePostReactQuery';
import { useHelper } from 'useHelper';

import type {
    NehaSelectLeadProps,
    PaginationInfo,
    Sort,
    TableFiltersProps
} from 'interfaces';

interface SearchNehaSelectLeadsProps {
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

interface NehaSelectLeadsResponse {
    data: NehaSelectLeadProps[];
    paginationInfo: PaginationInfo;
}

export const useSearchNehaSelectLeads = ({
    params: { companyId },
    requestBody: { page, itemsPerPage, filters, sort, searchKey }
}: SearchNehaSelectLeadsProps) => {
    const { getFormattedfilters } = useHelper();
    const formattedFilters = getFormattedfilters(filters);

    return usePostReactQuery<NehaSelectLeadsResponse>({
        queryKey: [
            'searchNehaSelectLeads',
            companyId,
            page,
            itemsPerPage,
            formattedFilters,
            sort,
            searchKey
        ],
        requestUrl: searchLeads,
        params: { companyId },
        body: { page, itemsPerPage, filters: formattedFilters, sort, searchKey }
    });
};
