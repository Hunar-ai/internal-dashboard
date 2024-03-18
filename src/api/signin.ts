import { ApiClient } from 'middleware/ApiClient';

export const signin = ApiClient({
    url: `/auth/password`
});

export const vendorLogin = ApiClient({
    url: `/v1/company/{companyId}/vendor/{vendorId}/login`
});

export const requestOTP = ApiClient({
    url: `/auth/mobile`
});

export const verifyOTP = ApiClient({
    url: `/auth/mobile/verify`
});

export const resetNotify = ApiClient({
    url: `auth/password/reset-notify`
});
