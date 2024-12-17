import { ApiClient } from 'middleware/ApiClient';

export const formFields = ApiClient({
    url: `/v1/form-fields`
});

export const company = ApiClient({
    url: `/v1/company/{companyId}`
});

export const companyDNS = ApiClient({
    url: `/v1/company/{companyId}/dns`
});

export const companyDomainAlias = ApiClient({
    url: `/v1/company/{companyId}/domain-alias`
});

export const inputFields = ApiClient({
    url: `/v1/input-fields`
});

export const companyDetails = ApiClient({
    url: `/v1/company/{companyId}/details`
});

export const companies = ApiClient({
    url: `/v1/company`
});

export const checklist = ApiClient({
    url: `/v1/company/{companyId}/selection-checklist`
});
