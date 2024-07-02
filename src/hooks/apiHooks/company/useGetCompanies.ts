import { companies } from 'api/settings';

import { useGetReactQuery } from 'hooks';

import type { ApiError, GetCompaniesResponse, QueryResult } from 'interfaces';

type Response = GetCompaniesResponse;

export const useGetCompanies = (): QueryResult<Response, ApiError> => {
    return useGetReactQuery({
        queryKey: ['companies'],
        requestUrl: companies
    });
};
