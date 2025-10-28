import { useMutation } from '@tanstack/react-query';

import { assessment } from 'api/settings';

import type { ApiError, AssessmentSettingsProps } from 'interfaces';

interface SaveAssessmentSettingsProps {
    params: {
        companyId: string;
    };
    requestBody: AssessmentSettingsProps;
}

export const useSaveAssessmentSettings = () => {
    return useMutation<
        AssessmentSettingsProps,
        ApiError,
        SaveAssessmentSettingsProps
    >(({ params, requestBody }: SaveAssessmentSettingsProps) => {
        const { companyId } = params;
        const {
            emails,
            isAssessmentEnabled,
            jobDescription,
            prompt,
            jobRoleId
        } = requestBody;

        return assessment
            .put({
                params: { companyId },
                body: {
                    emails,
                    isAssessmentEnabled,
                    jobDescription,
                    prompt,
                    jobRoleId
                }
            })
            .then((response: AssessmentSettingsProps) => {
                return response;
            })
            .catch((error: ApiError): Promise<ApiError> => {
                return Promise.reject(error);
            });
    });
};
