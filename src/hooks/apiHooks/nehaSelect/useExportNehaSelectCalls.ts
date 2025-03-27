import { useMutation } from '@tanstack/react-query';
import { exportCalls } from 'api/nehaSelect';
import type { ApiError, TableFiltersProps } from 'interfaces';
import { useHelper } from 'useHelper';

type ExportNehaSelectCallsProps = {
    params: {
        companyId: string;
    };
    requestBody: {
        filters: TableFiltersProps;
    };
};

export const useExportNehaSelectCalls = () => {
    const { getFormattedfilters } = useHelper();

    return useMutation<BlobPart, ApiError, ExportNehaSelectCallsProps>(
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
                .then((response: unknown[]): unknown[] => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
