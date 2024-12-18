import React from 'react';

import { FormControl, FormLabel, Switch } from '@chakra-ui/react';

import {
    AppLoader,
    FormWrapper,
    HelperText,
    SelectField,
    TextAreaField,
    TextField
} from './common';
import { useCompanyHelper } from './company/useCompanyHelper';

import { useToast } from 'hooks/useToast';
import { useValidationHelper } from 'hooks';
import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useSaveAssessmentSettings } from 'hooks/apiHooks/useSaveAssessmentSettings';

import { ErrorMsg } from 'utils';
import type {
    AssessmentSettingsProps,
    ErrorStateProps,
    ValidationMapProps
} from 'interfaces';

interface AssessmentFormProps extends Omit<AssessmentSettingsProps, 'emails'> {
    emails: string;
}

const validationMap: ValidationMapProps = {
    emails: (emails: string) => !!emails,
    jobDescription: (description: string) => !!description
};
const requiredFields: (keyof AssessmentFormProps)[] = [
    'emails',
    'jobDescription'
];
const assessmentFormInitialValues: AssessmentFormProps = {
    emails: '',
    isAssessmentEnabled: false,
    jobDescription: '',
    prompt: null
};
const assessmentFormErrorStateInitialValues: ErrorStateProps = {
    emails: false,
    jobDescription: false,
    prompt: false
};

export const AssessmentSetupForm = () => {
    const saveAssessmentSettings = useSaveAssessmentSettings();
    const { hasFormFieldError, getFormErrorData } =
        useValidationHelper(validationMap);
    const { showError, showSuccess } = useToast();

    const [companyId, setCompanyId] = React.useState('');
    const [hasCompanyIdError, setHasCompanyIdError] = React.useState(false);
    const [assessmentForm, setAssessmentForm] = React.useState({
        ...assessmentFormInitialValues
    });
    const [assessmentFormErrorState, setAssessmentFormErrorState] =
        React.useState({ ...assessmentFormErrorStateInitialValues });

    const { data: companiesResponse, isLoading: isCompaniesLoading } =
        useGetCompanies();
    const { companyIdOptions, companyMap } = useCompanyHelper(
        companiesResponse?.data
    );

    const onCompanyIdChange = ({
        target: { value }
    }: React.ChangeEvent<HTMLSelectElement>) => {
        const assessmentSettings =
            companyMap[value]?.settings.assessmentSettings;
        if (assessmentSettings) {
            const { emails, ...restSettings } = assessmentSettings;
            setAssessmentForm({ ...restSettings, emails: emails.join(',') });
        }

        setCompanyId(value);
        setHasCompanyIdError(!value);
    };

    const onAssessmentEnableToggle = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const isAssessmentEnabled = e.target.checked;
        setAssessmentForm(prevForm => ({ ...prevForm, isAssessmentEnabled }));
    };

    const onAssessmentFieldChange = ({
        target: { name, value }
    }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setAssessmentForm(prevForm => ({ ...prevForm, [name]: value }));

        setAssessmentFormErrorState(prevFormErrorState => ({
            ...prevFormErrorState,
            [name]: hasFormFieldError({ fieldName: name, fieldValue: value })
        }));
    };

    const submitSettings = () => {
        const { emails, ...restForm } = assessmentForm;
        const formattedEmails = emails.split(',');

        saveAssessmentSettings.mutate(
            {
                params: { companyId },
                requestBody: { emails: formattedEmails, ...restForm }
            },
            {
                onSuccess: () => {
                    showSuccess({
                        title: 'Success',
                        description: 'Successfully saved Assessment Settings!'
                    });
                },
                onError: error => {
                    showError({
                        title: 'Error',
                        description: error.errors.displayError
                    });
                }
            }
        );
    };

    const onSubmitClick = () => {
        if (!companyId) {
            setHasCompanyIdError(true);
            return;
        }

        const { errorState: modifiedFormErrorState, hasFormError } =
            getFormErrorData({ form: assessmentForm, requiredFields });
        setAssessmentFormErrorState(modifiedFormErrorState);

        if (hasFormError) {
            return;
        }

        submitSettings();
    };

    return (
        <FormWrapper
            formTitle="Assessment Settings"
            isFormDisabled={saveAssessmentSettings.isSuccess}
            isLoading={saveAssessmentSettings.isLoading}
            onSubmit={onSubmitClick}
            gridColumns={1}
            width={{ base: 'xl', lg: '60%' }}
            id="assessment-setup-form-container"
        >
            {(isCompaniesLoading || saveAssessmentSettings.isLoading) && (
                <AppLoader />
            )}
            <SelectField
                label="Company Id"
                name="companyId"
                placeholder="Select Company Id"
                options={companyIdOptions}
                value={companyId}
                onChange={onCompanyIdChange}
                isRequired
                isInvalid={hasCompanyIdError}
                helperText={
                    <HelperText
                        hasError={hasCompanyIdError}
                        errorMsg={ErrorMsg.required()}
                    />
                }
            />
            {companyId && (
                <>
                    <FormControl
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        isRequired
                    >
                        <FormLabel>{'Enable Assessment'}</FormLabel>
                        <Switch
                            name="assessmentEnabledToggle"
                            id="assessment-enabled-toggle"
                            isChecked={assessmentForm.isAssessmentEnabled}
                            onChange={onAssessmentEnableToggle}
                        />
                    </FormControl>
                    <TextField
                        label="Assessment Result Recipients"
                        name="emails"
                        placeholder="Enter comma separated emails"
                        value={assessmentForm.emails}
                        onChange={onAssessmentFieldChange}
                        isRequired
                        isInvalid={assessmentFormErrorState.emails}
                        helperText={
                            <HelperText
                                msg="Please enter comma separated emails"
                                hasError={assessmentFormErrorState.emails}
                                errorMsg={ErrorMsg.required()}
                            />
                        }
                    />
                    <TextAreaField
                        label="Job Description"
                        name="jobDescription"
                        placeholder="Job Description"
                        value={assessmentForm.jobDescription}
                        onChange={onAssessmentFieldChange}
                        isRequired
                        isInvalid={assessmentFormErrorState.jobDescription}
                        maxLength={5000}
                        helperText={
                            <HelperText
                                hasError={
                                    assessmentFormErrorState.jobDescription
                                }
                                errorMsg={ErrorMsg.required()}
                            />
                        }
                    />
                    <TextAreaField
                        label="Prompt"
                        name="prompt"
                        placeholder="Prompt"
                        value={assessmentForm.prompt || ''}
                        onChange={onAssessmentFieldChange}
                        maxLength={5000}
                    />
                </>
            )}
        </FormWrapper>
    );
};
