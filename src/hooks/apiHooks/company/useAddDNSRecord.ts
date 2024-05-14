import { useMutation } from '@tanstack/react-query';
import { companyDNS } from 'api/settings';

import type { ApiError } from 'interfaces';

interface AddDNSRecordProps {
    params: {
        companyId: string;
    };
    requestBody: {
        name: string;
    };
}

interface AddDNSRecordResponse {
    success: boolean;
}

export const useAddDNSRecord = () => {
    return useMutation<AddDNSRecordResponse, ApiError, AddDNSRecordProps>(
        ({ params, requestBody }: AddDNSRecordProps) => {
            return companyDNS
                .post({
                    params,
                    body: requestBody
                })
                .then((response: AddDNSRecordResponse) => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
