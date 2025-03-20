import { useMutation } from '@tanstack/react-query';
import { uploadLeads } from 'api/nehaSelect';
import type { ApiError } from 'interfaces';

type UploadNehaLeadsParams = {
    companyId: string;
    leadsFile: File;
};

export const useUploadNehaLeads = () => {
    return useMutation<unknown[], ApiError, UploadNehaLeadsParams>(
        ({ companyId, leadsFile }: UploadNehaLeadsParams) => {
            return uploadLeads
                .postForm({
                    params: { companyId },
                    body: { leadsFile }
                })
                .then((response: unknown[]): unknown[] => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
