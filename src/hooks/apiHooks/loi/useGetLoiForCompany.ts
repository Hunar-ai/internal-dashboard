import { getLoiForCompany } from 'api/loi';

import { useGetReactQuery } from 'hooks';

import type { ApiError, QueryResult, LoiProps } from 'interfaces';

type Response = LoiProps[];

interface GetLoiForCompanyProps {
    enabled: boolean;
    params: {
        companyId: string;
    };
}

export const useGetLoiForCompany = ({
    enabled,
    params: { companyId }
}: GetLoiForCompanyProps): QueryResult<Response, ApiError> => {
    return useGetReactQuery({
        requestUrl: getLoiForCompany,
        queryKey: [companyId],
        params: { companyId },
        enabled
    });
};
