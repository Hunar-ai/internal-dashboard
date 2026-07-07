import { ApiClient } from 'middleware';

export const get = ApiClient({
    url: `v1/company/{companyId}/voice/config`
});

export const update = ApiClient({
    url: `v1/company/{companyId}/voice/config`
});
