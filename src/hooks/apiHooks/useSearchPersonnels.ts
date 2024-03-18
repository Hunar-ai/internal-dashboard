import { search } from 'api/personnel';

import { usePostReactQuery } from 'hooks/usePostReactQuery';

import type {
    ApiError,
    PaginationInfo,
    PersonnelFiltersProps,
    PersonnelProps,
    QueryResult,
    Sort
} from 'interfaces';

interface SearchPersonnelsProps {
    params: {
        companyId?: string;
    };
    body: {
        page: number;
        itemsPerPage: number;
        filters?: PersonnelFiltersProps;
        sort?: Sort;
    };
    enabled?: boolean;
}
interface Response {
    data: PersonnelProps[];
    paginationInfo: PaginationInfo;
}

export const useSearchPersonnels = ({
    params,
    body,
    enabled = true
}: SearchPersonnelsProps): QueryResult<Response, ApiError> => {
    const { companyId } = params;
    const { page, itemsPerPage, filters, sort } = body;

    return usePostReactQuery({
        queryKey: ['useSearchPersonnels', page],
        requestUrl: search,
        params: { companyId },
        body: {
            page,
            itemsPerPage,
            filters,
            sort
        },
        enabled,
        onSuccess: () => undefined
    });
};
