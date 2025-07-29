import { ApiClient } from 'middleware';

export const openJobQuery = ApiClient({
    url: `/v1/job-query/{shortcode}/details`
});

export const markInterest = ApiClient({
    url: `v1/company/{companyId}/job-query/{shortcode}/mark-interest`
});

export const submitAnswers = ApiClient({
    url: `v1/company/{companyId}/job-query/{jobQueryId}/answers`
});

export const shortlistWorkers = ApiClient({
    url: `v1/company/{companyId}/job-query/{jobQueryId}/shortlist-worker`
});

export const upload = ApiClient({
    url: `/v1/company/{companyId}/job-query/{jobQueryId}/document`
});

export const search = ApiClient({
    url: `/v1/company/{companyId}/search-job-role`
});
