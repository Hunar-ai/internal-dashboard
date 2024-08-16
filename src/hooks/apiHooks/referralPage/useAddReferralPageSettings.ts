import { useMutation } from '@tanstack/react-query';

import { settings } from 'api/referralPage';

import type {
    ApiError,
    ReferralPageFormProps,
    ReferralPageSettingsProps
} from 'interfaces';

interface AddReferralPageSettingsProps {
    params: {
        companyId: string;
    };
    requestBody: Omit<ReferralPageFormProps, 'companyId'>;
}

type AddReferralPageSettingsResponse = ReferralPageSettingsProps;

export const useAddReferralPageSettings = () => {
    return useMutation<
        AddReferralPageSettingsResponse,
        ApiError,
        AddReferralPageSettingsProps
    >(({ params, requestBody }: AddReferralPageSettingsProps) => {
        return settings
            .post({
                params,
                body: requestBody
            })
            .then((response: AddReferralPageSettingsResponse) => {
                return response;
            })
            .catch((error: ApiError): Promise<ApiError> => {
                return Promise.reject(error);
            });
    });
};
