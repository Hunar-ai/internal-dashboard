import { useQuery } from '@tanstack/react-query';

import type {
    ApiError,
    FormFields,
    GetCompaniesResponse,
    NehaSelectLeadProps,
    PersonnelProps
} from 'interfaces';
import ErrorTracker from 'utils/ErrorTracker';

type SuccessDataProps =
    | FormFields
    | PersonnelProps
    | GetCompaniesResponse
    | NehaSelectLeadProps[];

interface GetReactQueryProps<ResponseProps> {
    queryKey: string[];
    requestUrl: any;
    params?: { [key: string]: string | null | undefined };
    enabled?: boolean;
    onSuccess?: (data: ResponseProps) => void;
    onError?: (error: ApiError) => void;
}
export const useGetReactQuery = <ResponseProps extends SuccessDataProps>({
    queryKey,
    requestUrl,
    params,
    enabled = true,
    onSuccess,
    onError
}: GetReactQueryProps<ResponseProps>) => {
    return useQuery<ResponseProps, ApiError>({
        queryKey,
        queryFn: () => {
            return requestUrl
                .get({
                    params
                })
                .then((response: Response) => {
                    return response;
                });
        },
        refetchOnWindowFocus: false,
        enabled,
        onSuccess,
        onError: (response: ApiError) => {
            onError?.(response);
            ErrorTracker.captureException(response);
        }
    });
};
