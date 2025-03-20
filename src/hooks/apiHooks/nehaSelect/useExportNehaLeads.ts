import { useMutation } from '@tanstack/react-query';
import { exportLeads } from 'api/nehaSelect';
import type { ApiError } from 'interfaces';

type ExportNehaLeadsParams = {
    companyId: string;
};

export const useExportNehaLeads = () => {
    return useMutation<unknown[], ApiError, ExportNehaLeadsParams>(
        ({ companyId }: ExportNehaLeadsParams) => {
            return exportLeads
                .post({
                    params: { companyId }
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
