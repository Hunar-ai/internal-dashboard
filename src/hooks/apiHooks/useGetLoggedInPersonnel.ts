import { loggedInPersonnel } from 'api/personnel';

import { useGetReactQuery } from 'hooks';

import type { ApiError, PersonnelProps, QueryResult } from 'interfaces';

interface GetLoggedInPersonnelProps {
    enabled: boolean;
}

type Response = PersonnelProps;

export const useGetLoggedInPersonnel = ({
    enabled
}: GetLoggedInPersonnelProps): QueryResult<Response, ApiError> => {
    return useGetReactQuery({
        queryKey: ['getLoggedInPersonnel'],
        requestUrl: loggedInPersonnel,
        enabled
    });
};
