import { useMutation } from '@tanstack/react-query';

import { upload } from 'api/referralPage';

import type { ApiError } from 'interfaces';

interface UploadReferralPageAssetProps {
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

export const useUploadReferralPageAsset = () => {
    return useMutation<Response, ApiError, UploadReferralPageAssetProps>(
        ({ params, requestBody }: UploadReferralPageAssetProps) => {
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
