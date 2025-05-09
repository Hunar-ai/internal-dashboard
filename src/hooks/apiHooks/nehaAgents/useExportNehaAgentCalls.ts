import { useMutation } from '@tanstack/react-query';

import { exportCalls } from 'api/nehaAgents';

import { useHelper } from 'useHelper';

import type { ApiError, TableFiltersProps } from 'interfaces';

interface ExportNehaSelectCallsProps {
    params: {
        companyId: string;
    };
    requestBody: {
        filters: TableFiltersProps;
    };
}

export const useExportNehaAgentCalls = () => {
    const { getFormattedfilters } = useHelper();

    return useMutation<string, ApiError, ExportNehaSelectCallsProps>(
        ({
            params: { companyId },
            requestBody: { filters }
        }: ExportNehaSelectCallsProps) => {
            const formattedFilters = getFormattedfilters(filters);

            return exportCalls
                .post({
                    params: { companyId },
                    body: { filters: formattedFilters }
                })
                .then((response: string): string => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
