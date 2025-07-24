import { useMutation } from '@tanstack/react-query';

import { search } from 'api/jobQuery';

import { ApiError } from 'interfaces';
import { JobResponse } from 'interfaces/jobRole.interface';

type Response = JobResponse;

export const useSearchJobRoles = () => {
    return useMutation<Response, ApiError, string>((companyId: string) => {
        return search
            .post({
                params: { companyId }
            })
            .then((response: Response) => {
                return response;
            })
            .catch((error: ApiError): Promise<ApiError> => {
                return Promise.reject(error);
            });
    });
};
