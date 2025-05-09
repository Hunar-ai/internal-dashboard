import { ApiClient } from 'middleware';

export const searchCalls = ApiClient({
    url: `/v1/neha-agents/company/{companyId}/calls`
});

export const pendingCallsCount = ApiClient({
    url: `/v1/neha-agents/company/{companyId}/calls/count`
});

export const exportCalls = ApiClient({
    url: `/v1/neha-agents/company/{companyId}/export`
});

export const uploadLeads = ApiClient({
    url: `/v1/neha-agents/company/{companyId}/bulk/upload`
});
