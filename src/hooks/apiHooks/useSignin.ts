import { useMutation } from '@tanstack/react-query';
import { signin } from 'api/signin';

import { ApiError } from 'interfaces';

type Params = {
    email: string;
    password: string;
    companyId: string;
};

interface SuccessResponse {
    token: string;
}

export const useSignin = () => {
    return useMutation<SuccessResponse, ApiError, Params>(
        ({ email, password, companyId }: Params) => {
            return signin
                .post({
                    params: {
                        companyId
                    },
                    body: {
                        email,
                        password
                    }
                })
                .then((response: SuccessResponse) => {
                    return response;
                })
                .catch((error: ApiError): ApiError => {
                    throw error;
                });
        }
    );
};
