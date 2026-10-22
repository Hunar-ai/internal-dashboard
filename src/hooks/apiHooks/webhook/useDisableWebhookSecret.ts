import { useMutation } from '@tanstack/react-query';

import { webhookSecret } from 'api/webhook';

import type { ApiError } from 'interfaces';

interface DisableWebhookSecretProps {
    params: {
        companyId: string;
    };
}

type Response = void;

export const useDisableWebhookSecret = () => {
    return useMutation<Response, ApiError, DisableWebhookSecretProps>(
        ({ params }: DisableWebhookSecretProps) => {
            return webhookSecret
                .delete({ params })
                .then((response: Response) => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
