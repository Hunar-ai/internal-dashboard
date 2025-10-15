import { ApiClient } from 'middleware';

export const create = ApiClient({
    url: `v1/company/{companyId}/voice/provider`
});

export const search = ApiClient({
    url: `v1/company/{companyId}/voice/providers/search`
});
