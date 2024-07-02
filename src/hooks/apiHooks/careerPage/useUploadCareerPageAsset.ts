import { useMutation } from '@tanstack/react-query';

import { upload } from 'api/careerPage';

import type { ApiError } from 'interfaces';

interface UploadCareerPageAssetProps {
    params: {
        companyId: string;
    };
    requestBody: {
        file: File;
    };
}

interface Response {
    assetUrl: string;
}

export const useUploadCareerPageAsset = () => {
    return useMutation<Response, ApiError, UploadCareerPageAssetProps>(
        ({ params, requestBody }: UploadCareerPageAssetProps) => {
            return upload
                .postForm({
                    params,
                    body: requestBody
                })
                .then((response: Response): Response => {
                    return response;
                })
                .catch((error: ApiError): Promise<ApiError> => {
                    return Promise.reject(error);
                });
        }
    );
};
