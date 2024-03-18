import { useMutation } from '@tanstack/react-query';
import { resetNotify } from 'api/signin';

import { ApiError } from 'interfaces';

type Params = {
    email: string;
    personnelId: string;
    companyId: string;
};

interface SuccessResponse {
    token: string;
}

export const useResetNotify = () => {
    return useMutation<SuccessResponse, ApiError, Params>(
        ({ personnelId, email, companyId }: Params) => {
            return resetNotify
                .post({
                    params: {
                        companyId
                    },
                    body: {
                        companyId,
                        personnelId,
                        email
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
