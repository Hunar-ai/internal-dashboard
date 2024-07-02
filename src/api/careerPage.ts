import { ApiClient } from 'middleware';

export const settings = ApiClient({
    url: `/v1/company/{companyId}/career-page-settings`
});

export const upload = ApiClient({
    url: `/v1/company/{companyId}/career-page/upload`
});
