import { ApiClient } from 'middleware';

export const search = ApiClient({
    url: `/v1/neha-select/company/{companyId}/leads`
});

export const exportLeads = ApiClient({
    url: `/v1/neha-select/company/{companyId}/export`
});

export const uploadLeads = ApiClient({
    url: `/v1/neha-select/company/{companyId}/bulk/upload`
});
