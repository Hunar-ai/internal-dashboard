import { useMutation } from '@tanstack/react-query';
import { removePersonnel } from 'api/personnel';

import type { ApiError } from 'interfaces';

interface RemovePersonnelProps {
    params: {
        personnelId: string;
        companyId: string;
    };
}

interface SuccessResponse {
    success: boolean;
}

export const useRemovePersonnel = () => {
    return useMutation<SuccessResponse, ApiError, RemovePersonnelProps>(
        ({ params }: RemovePersonnelProps) => {
            return removePersonnel
                .post({ params })
                .then((response: SuccessResponse) => {
                    return response;
                })
                .catch((error: ApiError): ApiError => {
                    throw error;
                });
        }
    );
};
