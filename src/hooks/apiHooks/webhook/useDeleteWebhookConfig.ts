import { useMutation } from '@tanstack/react-query';

import { webhookConfigByEvent } from 'api/webhook';

import type { ApiError } from 'interfaces';

interface DeleteWebhookConfigProps {
    params: {
        companyId: string;
        event: string;
    };
}

type Response = void;

export const useDeleteWebhookConfig = () => {
    return useMutation<Response, ApiError, DeleteWebhookConfigProps>(
        ({ params }: DeleteWebhookConfigProps) => {
            return webhookConfigByEvent
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
