import { useMutation } from '@tanstack/react-query';

import { update } from 'api/voiceConfig';
import { ApiError } from 'interfaces';

interface UseUpdateVoiceConfigProps {
    params: {
        companyId: string;
    };
    body: {
        enabled: boolean;
        defaultLanguage: string;
        personaId?: string;
        providerId?: string;
    };
}

interface SuccessResponse {
    success: boolean;
}

export const useUpdateVoiceConfig = () => {
    return useMutation<SuccessResponse, ApiError, UseUpdateVoiceConfigProps>(
        ({ params, body }: UseUpdateVoiceConfigProps) => {
            return update
                .post({
                    params,
                    body
                })
                .then((response: SuccessResponse) => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
