import { ApiClient } from 'middleware';

export const settings = ApiClient({
    url: `/v1/company/{companyId}/page/referral/settings`
});

export const upload = ApiClient({
    url: `/v1/company/{companyId}/page/referral/asset-upload`
});