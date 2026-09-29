import { useMutation } from '@tanstack/react-query';

import { webhookSecretReveal } from 'api/webhook';

import type { ApiError, WebhookSecretWithPlaintextProps } from 'interfaces';

interface RevealWebhookSecretProps {
    params: {
        companyId: string;
    };
}

type Response = WebhookSecretWithPlaintextProps;

export const useRevealWebhookSecret = () => {
    return useMutation<Response, ApiError, RevealWebhookSecretProps>(
        ({ params }: RevealWebhookSecretProps) => {
            return webhookSecretReveal
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
