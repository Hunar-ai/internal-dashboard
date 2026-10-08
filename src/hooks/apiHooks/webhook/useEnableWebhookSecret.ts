import { useMutation } from '@tanstack/react-query';

import { webhookSecret } from 'api/webhook';

import type { ApiError, WebhookSecretWithPlaintextProps } from 'interfaces';

interface EnableWebhookSecretProps {
    params: {
        companyId: string;
    };
}

type Response = WebhookSecretWithPlaintextProps;

export const useEnableWebhookSecret = () => {
    return useMutation<Response, ApiError, EnableWebhookSecretProps>(
        ({ params }: EnableWebhookSecretProps) => {
            return webhookSecret
                .post({ params, body: {} })
                .then((response: Response) => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
