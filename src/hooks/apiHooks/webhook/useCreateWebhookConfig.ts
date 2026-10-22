import { useMutation } from '@tanstack/react-query';

import { webhookConfig } from 'api/webhook';

import type { WEBHOOK_STATUS } from 'Enum';
import type { ApiError, WebhookConfigProps } from 'interfaces';

interface CreateWebhookConfigProps {
    params: {
        companyId: string;
    };
    requestBody: {
        event: string;
        url: string;
        webhookStatus: WEBHOOK_STATUS;
    };
}

type Response = WebhookConfigProps;

export const useCreateWebhookConfig = () => {
    return useMutation<Response, ApiError, CreateWebhookConfigProps>(
        ({ params, requestBody }: CreateWebhookConfigProps) => {
            return webhookConfig
                .post({ params, body: requestBody })
                .then((response: Response) => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
