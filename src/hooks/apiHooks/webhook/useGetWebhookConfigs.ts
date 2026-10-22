import { webhookConfig } from 'api/webhook';

import { useGetReactQuery } from 'hooks';

import type { ApiError, QueryResult, WebhookConfigsResponse } from 'interfaces';

interface UseGetWebhookConfigsProps {
    companyId: string;
    enabled?: boolean;
    onSuccess?: (data: WebhookConfigsResponse) => void;
    onError?: (error: ApiError) => void;
}

export const useGetWebhookConfigs = ({
    companyId,
    enabled = true,
    onSuccess,
    onError
}: UseGetWebhookConfigsProps): QueryResult<
    WebhookConfigsResponse,
    ApiError
> => {
    return useGetReactQuery({
        queryKey: ['webhook-config', companyId],
        requestUrl: webhookConfig,
        params: { companyId },
        enabled: !!companyId && enabled,
        onSuccess,
        onError
    });
};
