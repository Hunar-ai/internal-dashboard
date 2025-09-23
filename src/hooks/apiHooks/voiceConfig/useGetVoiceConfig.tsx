import { get } from 'api/voiceConfig';

import { useGetReactQuery } from 'hooks/useGetReactQuery';
import { ApiError, QueryResult, VoiceConfigProps } from 'interfaces';

interface UseGetVoiceConfigProps {
    enabled: boolean;
    params: {
        companyId: string;
    };
    onSuccess?: (data: VoiceConfigProps) => void;
    onError?: VoidFunction;
}

export const useGetVoiceConfig = ({
    enabled,
    params: { companyId },
    onSuccess,
    onError
}: UseGetVoiceConfigProps): QueryResult<VoiceConfigProps, ApiError> => {
    return useGetReactQuery({
        queryKey: ['useGetVoiceConfig', companyId],
        requestUrl: get,
        params: {
            companyId
        },
        enabled: enabled,
        retry: false,
        onSuccess,
        onError
    });
};
