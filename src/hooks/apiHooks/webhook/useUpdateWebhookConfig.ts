import { useMutation } from '@tanstack/react-query';

import { webhookConfigByEvent } from 'api/webhook';

import type { WEBHOOK_STATUS } from 'Enum';
import type { ApiError, WebhookConfigProps } from 'interfaces';

interface UpdateWebhookConfigProps {
    params: {
        companyId: string;
        event: string;
    };
    requestBody: {
        url?: string;
        webhookStatus?: WEBHOOK_STATUS;
    };
}

type Response = WebhookConfigProps;

export const useUpdateWebhookConfig = () => {
    return useMutation<Response, ApiError, UpdateWebhookConfigProps>(
        ({ params, requestBody }: UpdateWebhookConfigProps) => {
            return webhookConfigByEvent
                .put({ params, body: requestBody })
                .then((response: Response) => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
