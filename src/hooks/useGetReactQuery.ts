import { useQuery } from '@tanstack/react-query';

import type {
    ApiError,
    FormFields,
    GetCompaniesResponse,
    NehaSelectPendingCallsProps,
    PersonnelProps
} from 'interfaces';
import { VoiceConfigProps } from 'interfaces/voiceConfig.interface';
import ErrorTracker from 'utils/ErrorTracker';

type SuccessDataProps =
    | FormFields
    | PersonnelProps
    | GetCompaniesResponse
    | NehaSelectPendingCallsProps
    | VoiceConfigProps;

interface GetReactQueryProps<ResponseProps> {
    queryKey: string[];
    requestUrl: any;
    params?: { [key: string]: string | null | undefined };
    enabled?: boolean;
    retry?: boolean;
    onSuccess?: (data: ResponseProps) => void;
    onError?: (error: ApiError) => void;
}
export const useGetReactQuery = <ResponseProps extends SuccessDataProps>({
    queryKey,
    requestUrl,
    params,
    enabled = true,
    retry,
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
        retry,
        onSuccess,
        onError: (response: ApiError) => {
            onError?.(response);
            ErrorTracker.captureException(response);
        }
    });
};
