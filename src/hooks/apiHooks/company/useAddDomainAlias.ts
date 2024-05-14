import { useMutation } from '@tanstack/react-query';
import { companyDomainAlias } from 'api/settings';

import type { ApiError } from 'interfaces';

interface AddDomainAliasProps {
    params: {
        companyId: string;
    };
    requestBody: {
        domainAlias: string;
    };
}

interface AddDomainAliasResponse {
    success: boolean;
}

export const useAddDomainAlias = () => {
    return useMutation<AddDomainAliasResponse, ApiError, AddDomainAliasProps>(
        ({ params, requestBody }: AddDomainAliasProps) => {
            return companyDomainAlias
                .post({
                    params,
                    body: requestBody
                })
                .then((response: AddDomainAliasResponse) => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
