import { useMutation } from '@tanstack/react-query';

import { createOrUpdate } from 'api/loi';

import type { ApiError, CreateOrUpdateLoiResponseProps } from 'interfaces';

interface CreateOrUpdateLoiProps {
    params: {
        companyId: string;
    };
    body: {
        loiId?: string;
        companyId: string;
        template: string;
        templateFields: object[];
    };
}

export const useCreateOrUpdateLoi = () => {
    return useMutation<
        CreateOrUpdateLoiResponseProps,
        ApiError,
        CreateOrUpdateLoiProps
    >(({ params, body }: CreateOrUpdateLoiProps) => {
        return createOrUpdate
            .post({
                params,
                body
            })
            .then((response: Response) => {
                return response;
            })
            .catch((error: ApiError): Promise<ApiError> => {
                return Promise.reject(error);
            });
    });
};
