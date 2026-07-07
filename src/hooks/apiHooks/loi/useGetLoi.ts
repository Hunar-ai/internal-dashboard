import { get } from 'api/loi';

import { useGetReactQuery } from 'hooks';

import type { ApiError, QueryResult, LoiProps } from 'interfaces';

type Response = LoiProps;

interface GetLoiProps {
    enabled: boolean;
    params: {
        loiId: string;
    };
}

export const useGetLoi = ({
    enabled,
    params: { loiId }
}: GetLoiProps): QueryResult<Response, ApiError> => {
    return useGetReactQuery({
        requestUrl: get,
        queryKey: [loiId],
        params: { loiId },
        enabled
    });
};
