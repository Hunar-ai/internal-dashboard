import { useMutation } from '@tanstack/react-query';

import { uploadLeads } from 'api/nehaSelect';

import type { ApiError } from 'interfaces';

interface UploadNehaSelectLeadsParams {
    companyId: string;
    leadsFile: File;
}

interface UploadNehaSelectLeadsResponse {
    createdLeads: number;
    existingLeads: number;
}

export const useUploadNehaSelectLeads = () => {
    return useMutation<
        UploadNehaSelectLeadsResponse,
        ApiError,
        UploadNehaSelectLeadsParams
    >(({ companyId, leadsFile }: UploadNehaSelectLeadsParams) => {
        return uploadLeads
            .postForm({
                params: { companyId },
                body: { leadsFile }
            })
            .then(
                (
                    response: UploadNehaSelectLeadsResponse
                ): UploadNehaSelectLeadsResponse => {
                    return response;
                }
            )
            .catch((error: ApiError): Promise<ApiError> => {
                return Promise.reject(error);
            });
    });
};
