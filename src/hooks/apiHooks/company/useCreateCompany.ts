import { useMutation } from '@tanstack/react-query';

import { company } from 'api/settings';

import type { ApiError, CompanyFormProps } from 'interfaces';

interface CreateCompanyProps {
    params: {
        companyId: string;
    };
    requestBody: CompanyFormProps;
}

interface CreateCompanyResponse {
    success: boolean;
}

export const useCreateCompany = () => {
    return useMutation<CreateCompanyResponse, ApiError, CreateCompanyProps>(
        ({ params, requestBody }: CreateCompanyProps) => {
            return company
                .put({
                    params,
                    body: requestBody
                })
                .then((response: CreateCompanyResponse) => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
