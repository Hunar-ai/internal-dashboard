import { ApiClient } from 'middleware';

export const webhookSecret = ApiClient({
    url: `/v1/company/{companyId}/webhook-secret`
});

export const webhookSecretReveal = ApiClient({
    url: `/v1/company/{companyId}/webhook-secret/reveal`
});

export const webhookConfig = ApiClient({
    url: `/v1/company/{companyId}/webhook-config`
});

export const webhookConfigByEvent = ApiClient({
    url: `/v1/company/{companyId}/webhook-config/{event}`
});
