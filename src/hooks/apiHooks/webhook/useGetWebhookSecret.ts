import { webhookSecret } from 'api/webhook';

import { useGetReactQuery } from 'hooks';

import type { ApiError, QueryResult, WebhookSecretProps } from 'interfaces';

interface UseGetWebhookSecretProps {
    companyId: string;
    enabled?: boolean;
    onSuccess?: (data: WebhookSecretProps) => void;
    onError?: (error: ApiError) => void;
}

export const useGetWebhookSecret = ({
    companyId,
    enabled = true,
    onSuccess,
    onError
}: UseGetWebhookSecretProps): QueryResult<WebhookSecretProps, ApiError> => {
    return useGetReactQuery({
        queryKey: ['webhook-secret', companyId],
        requestUrl: webhookSecret,
        params: { companyId },
        enabled: !!companyId && enabled,
        onSuccess,
        onError
    });
};
