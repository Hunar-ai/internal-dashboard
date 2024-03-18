import { ApiClient } from 'middleware';

export const create = ApiClient({
    url: `/v1/company/{companyId}/personnel/{personnelId}`
});

export const search = ApiClient({
    url: `/v1/company/{companyId}/search-personnel`
});

export const personnel = ApiClient({
    url: `/v1/company/{companyId}/personnel/{personnelId}`
});

export const loggedInPersonnel = ApiClient({
    url: `/v1/me`
});
