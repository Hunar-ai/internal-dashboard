import { ApiClient } from 'middleware';

export const get = ApiClient({
    url: `/v1/loi/{loiId}`
});

export const getLoiForCompany = ApiClient({
    url: `/v1/company/{companyId}/search-loi`
});

export const createOrUpdate = ApiClient({
    url: `/v1/company/{companyId}/upsert`
});

export const deleteLoi = ApiClient({
    url: `/v1/loi/{loiId}`
});
