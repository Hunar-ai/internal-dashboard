import type { WEBHOOK_STATUS } from 'Enum';

import type { AuditMetadata } from './form.interface';

export interface WebhookSecretProps {
    companyId: string;
    configured: boolean;
    secretLast4: string | null;
    maskedSecret: string | null;
    status: string;
}

export interface WebhookSecretWithPlaintextProps extends WebhookSecretProps {
    secret: string;
}

export interface WebhookConfigProps {
    companyId: string;
    company: string;
    event: string;
    url: string;
    webhookStatus: WEBHOOK_STATUS;
    customFields: Record<string, unknown> | null;
    auditMetadata: AuditMetadata;
}

export type WebhookConfigsResponse = WebhookConfigProps[];

export interface WebhookRowProps {
    key: string;
    isSaved: boolean;
    event: string;
    url: string;
    webhookStatus: WEBHOOK_STATUS;
}
