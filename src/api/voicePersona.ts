import { ApiClient } from 'middleware';

export const search = ApiClient({
    url: `v1/company/{companyId}/voice/personas/search`
});
