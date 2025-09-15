import { useMutation } from '@tanstack/react-query';

import { create } from 'api/voiceProviders';

import { ApiError } from 'interfaces';

interface UseCreateVoiceProviderProps {
    params: {
        companyId: string;
    };
    body: {
        providerType: string;
        config: {
            authId: string;
            authToken: string;
            mobileNumber: string;
            referenceName: string;
        };
    };
}

interface SuccessResponse {
    success: boolean;
}

export const useCreateVoiceProvider = () => {
    return useMutation<SuccessResponse, ApiError, UseCreateVoiceProviderProps>(
        ({ params, body }: UseCreateVoiceProviderProps) => {
            return create
                .post({
                    params,
                    body
                })
                .then((response: SuccessResponse) => {
                    return response;
                })
                .catch((error: ApiError): ApiError => {
                    throw error;
                });
        }
    );
};
