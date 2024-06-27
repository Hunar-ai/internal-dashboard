import { ApiClient } from 'middleware';

export const careerPageUpload = ApiClient({
    url: `/v1/company/{companyId}/career-page/upload`
});
