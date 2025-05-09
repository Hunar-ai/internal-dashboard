import { useMutation } from '@tanstack/react-query';

import { uploadLeads } from 'api/nehaAgents';

import type { ApiError } from 'interfaces';

interface UploadNehaAgentLeadsParams {
    companyId: string;
    leadsFile: File;
}

interface UploadNehaAgentLeadsResponse {
    createdLeads: number;
    existingLeads: number;
}

export const useUploadNehaAgentLeads = () => {
    return useMutation<
        UploadNehaAgentLeadsResponse,
        ApiError,
        UploadNehaAgentLeadsParams
    >(({ companyId, leadsFile }: UploadNehaAgentLeadsParams) => {
        return uploadLeads
            .postForm({
                params: { companyId },
                body: { leadsFile }
            })
            .then(
                (
                    response: UploadNehaAgentLeadsResponse
                ): UploadNehaAgentLeadsResponse => {
                    return response;
                }
            )
            .catch((error: ApiError): Promise<ApiError> => {
                return Promise.reject(error);
            });
    });
};
