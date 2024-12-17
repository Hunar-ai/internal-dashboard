import { useMutation } from '@tanstack/react-query';

import { checklist } from 'api/settings';

import type { ApiError, ChecklistFieldProps } from 'interfaces';

interface SaveChecklistProps {
    params: {
        companyId: string;
    };
    requestBody: {
        selectionChecklist: ChecklistFieldProps[];
    };
}

interface SaveChecklistResponse {
    selectionChecklist: ChecklistFieldProps[];
}

export const useSaveChecklist = () => {
    return useMutation<SaveChecklistResponse, ApiError, SaveChecklistProps>(
        ({
            params: { companyId },
            requestBody: { selectionChecklist }
        }: SaveChecklistProps) => {
            return checklist
                .put({
                    params: { companyId },
                    body: { selectionChecklist }
                })
                .then((response: SaveChecklistResponse) => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
