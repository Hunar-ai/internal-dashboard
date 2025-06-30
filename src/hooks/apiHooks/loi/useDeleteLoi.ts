import { useMutation } from '@tanstack/react-query';

import { deleteLoi } from 'api/loi';

import type { ApiError } from 'interfaces';

interface DeleteLoiProps {
    params: {
        loiId: string;
    };
}

export const useDeleteLoi = () => {
    return useMutation<Response, ApiError, DeleteLoiProps>(
        ({ params }: DeleteLoiProps) => {
            return deleteLoi
                .delete({ params })
                .then((response: Response) => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
