import { useMutation } from '@tanstack/react-query';

import { settings } from 'api/careerPage';

import type {
    ApiError,
    CareerPageFormProps,
    CareerPageSettingsProps
} from 'interfaces';

interface AddCareerPageSettingsProps {
    params: {
        companyId: string;
    };
    requestBody: Omit<CareerPageFormProps, 'companyId'>;
}

type AddCareerPageSettingsResponse = CareerPageSettingsProps;

export const useAddCareerPageSettings = () => {
    return useMutation<
        AddCareerPageSettingsResponse,
        ApiError,
        AddCareerPageSettingsProps
    >(({ params, requestBody }: AddCareerPageSettingsProps) => {
        return settings
            .post({
                params,
                body: requestBody
            })
            .then((response: AddCareerPageSettingsResponse) => {
                return response;
            })
            .catch((error: ApiError): Promise<ApiError> => {
                return Promise.reject(error);
            });
    });
};
