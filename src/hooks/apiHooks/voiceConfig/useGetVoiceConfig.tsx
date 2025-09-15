import { get } from 'api/voiceConfig';

import { useGetReactQuery } from 'hooks/useGetReactQuery';
import { ApiError, QueryResult } from 'interfaces';
import { VoiceConfigProps } from 'interfaces/voiceConfig.interface';

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
        queryKey: [companyId],
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
