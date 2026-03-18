import React from 'react';

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    Stack,
    Switch
} from '@chakra-ui/react';

import {
    AppLoader,
    FormWrapper,
    HelperText,
    SelectField,
    TextAreaField,
    TextField
} from './common';
import { useCompanyHelper } from './company/useCompanyHelper';
import { useJobRoleHelper } from './jobRole/useJobRoleHelper';

import { useToast } from 'hooks/useToast';
import { useValidationHelper } from 'hooks';
import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useSaveAssessmentSettings } from 'hooks/apiHooks/useSaveAssessmentSettings';
import { useSearchJobRoles } from 'hooks/apiHooks/jobQuery/useSearchJobRoles';

import { ErrorMsg } from 'utils';
import type { AssessmentSettingsProps, ErrorStateProps } from 'interfaces';
import { ASSESSMENT_TYPE } from 'Enum';

interface AssessmentFormProps extends Omit<AssessmentSettingsProps, 'emails'> {
    emails: string;
}

const requiredFields: (keyof AssessmentFormProps)[] = [
    'emails',
    'assessmentType',
    'prompt',
    'evaluationPrompt',
    'callPrompt'
];
const assessmentFormInitialValues: AssessmentFormProps = {
    emails: '',
    isAssessmentEnabled: false,
    assessmentType: ASSESSMENT_TYPE.CALL,
    prompt: '',
    evaluationPrompt: '',
    callPrompt: '',
    jobRoleId: ''
};
const assessmentFormErrorStateInitialValues: ErrorStateProps = {
    emails: false,
    assessmentType: false,
    prompt: false,
    evaluationPrompt: false,
    callPrompt: false
};

export const AssessmentSetupForm = () => {
    const saveAssessmentSettings = useSaveAssessmentSettings();
    const { hasFormFieldError, getFormErrorData } = useValidationHelper();
    const { showError, showSuccess } = useToast();

    const [companyId, setCompanyId] = React.useState('');
    const [hasCompanyIdError, setHasCompanyIdError] = React.useState(false);
    const [hasJobRoleError, setHasJobRoleError] = React.useState(false);
    const [assessmentForm, setAssessmentForm] = React.useState({
        ...assessmentFormInitialValues
    });
    const [assessmentFormErrorState, setAssessmentFormErrorState] =
        React.useState({ ...assessmentFormErrorStateInitialValues });
    const [jobRole, setJobRole] = React.useState('');

    const { data: companiesResponse, isLoading: isCompaniesLoading } =
        useGetCompanies();
    const { companyIdOptions } = useCompanyHelper(companiesResponse?.data);
    const {
        mutate: searchJobRoles,
        data: jobRolesResponse,
        isLoading: isJobRolesLoading
    } = useSearchJobRoles();

    const { jobRoleOptions, jobRoleMap } = useJobRoleHelper(
        jobRolesResponse?.data
    );

    const isLoading = React.useMemo(
        () =>
            isCompaniesLoading ||
            saveAssessmentSettings.isLoading ||
            isJobRolesLoading,
        [
            isCompaniesLoading,
            saveAssessmentSettings.isLoading,
            isJobRolesLoading
        ]
    );

    const onCompanyIdChange = ({
        target: { value }
    }: React.ChangeEvent<HTMLSelectElement>) => {
        setCompanyId(value);
        setHasCompanyIdError(!value);
    };

    const onJobRoleChange = ({
        target: { value }
    }: React.ChangeEvent<HTMLSelectElement>) => {
        const assessmentSettings =
            jobRoleMap[value]?.settings?.assessmentSettings;
        if (assessmentSettings) {
            const {
                emails,
                assessmentType,
                prompt,
                evaluationPrompt,
                callPrompt,
                isAssessmentEnabled
            } = assessmentSettings;
            setAssessmentForm(prev => ({
                ...prev,
                assessmentType: assessmentType,
                prompt: prompt ?? '',
                evaluationPrompt: evaluationPrompt ?? '',
                callPrompt: callPrompt ?? '',
                isAssessmentEnabled: !!isAssessmentEnabled,
                emails: emails?.join(',') ?? '',
                jobRoleId: value
            }));
        } else {
            setAssessmentForm(prev => ({
                ...prev,
                ...assessmentFormInitialValues,
                jobRoleId: value
            }));
        }

        setJobRole(value);
        setHasJobRoleError(!value);
    };

    const onAssessmentEnableToggle = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const isAssessmentEnabled = e.target.checked;
        setAssessmentForm(prevForm => ({ ...prevForm, isAssessmentEnabled }));
        if (!isAssessmentEnabled) {
            setAssessmentFormErrorState({
                ...assessmentFormErrorStateInitialValues
            });
        }
    };

    const onAssessmentTypeChange = (value: ASSESSMENT_TYPE) => {
        setAssessmentForm(prevForm => ({
            ...prevForm,
            assessmentType: value
        }));
        setAssessmentFormErrorState(prevFormErrorState => ({
            ...prevFormErrorState,
            assessmentType: hasFormFieldError({
                fieldName: 'assessmentType',
                fieldValue: value
            })
        }));
    };

    const onAssessmentFieldChange = ({
        target: { name, value }
    }: React.ChangeEvent<
        HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >) => {
        setAssessmentForm(prevForm => ({ ...prevForm, [name]: value }));

        setAssessmentFormErrorState(prevFormErrorState => ({
            ...prevFormErrorState,
            [name]: assessmentForm.isAssessmentEnabled
                ? hasFormFieldError({ fieldName: name, fieldValue: value })
                : false
        }));
    };

    const submitSettings = () => {
        const { emails, ...restForm } = assessmentForm;

        const requestBody: AssessmentSettingsProps =
            restForm.isAssessmentEnabled
                ? { ...restForm, emails: emails.split(',') }
                : restForm;

        saveAssessmentSettings.mutate(
            {
                params: { companyId },
                requestBody
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

        if (!assessmentForm.isAssessmentEnabled) {
            setAssessmentFormErrorState({
                ...assessmentFormErrorStateInitialValues
            });
            submitSettings();
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

    React.useEffect(() => {
        if (companyId) {
            searchJobRoles(companyId);
            setAssessmentForm({ ...assessmentFormInitialValues });
            setJobRole('');
        }
    }, [companyId, searchJobRoles]);

    //Submit with disable and  no fiels sent then get for that role

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
            {isLoading && <AppLoader />}
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
            <SelectField
                label="Job Role"
                name="jobRole"
                placeholder="Select Job Role"
                options={jobRoleOptions}
                value={jobRole}
                onChange={onJobRoleChange}
                isRequired
                isInvalid={hasJobRoleError}
                helperText={
                    <HelperText
                        hasError={hasJobRoleError}
                        errorMsg={ErrorMsg.required()}
                    />
                }
            />
            {companyId && jobRole && (
                <>
                    <FormControl
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        marginBottom={4}
                        isRequired
                    >
                        <FormLabel>{'Enable AI Assessments'}</FormLabel>
                        <Switch
                            name="assessmentEnabledToggle"
                            id="assessment-enabled-toggle"
                            isChecked={assessmentForm.isAssessmentEnabled}
                            onChange={onAssessmentEnableToggle}
                        />
                    </FormControl>
                    {assessmentForm.isAssessmentEnabled && (
                        <>
                            <Accordion
                                allowToggle
                                defaultIndex={[0]}
                                width="100%"
                            >
                                <AccordionItem
                                    border="1px solid"
                                    borderColor="gray.200"
                                    borderRadius="md"
                                >
                                    <h2>
                                        <AccordionButton
                                            px={4}
                                            py={3}
                                            _hover="none"
                                            background={'gray.50'}
                                            borderRadius="md"
                                        >
                                            <Box
                                                flex="1"
                                                textAlign="left"
                                                fontWeight={600}
                                            >
                                                Assessment configuration
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4} pt={4}>
                                        <Stack spacing={4}>
                                            <FormControl
                                                isRequired={
                                                    assessmentForm.isAssessmentEnabled
                                                }
                                                isInvalid={
                                                    assessmentFormErrorState.assessmentType
                                                }
                                            >
                                                <FormLabel>
                                                    {'Assessment Type'}
                                                </FormLabel>
                                                <RadioGroup
                                                    value={
                                                        assessmentForm.assessmentType
                                                    }
                                                    onChange={
                                                        onAssessmentTypeChange
                                                    }
                                                >
                                                    <Stack
                                                        direction="row"
                                                        spacing={6}
                                                    >
                                                        <Radio
                                                            value={
                                                                ASSESSMENT_TYPE.CALL
                                                            }
                                                        >
                                                            Call only
                                                        </Radio>
                                                        <Radio
                                                            value={
                                                                ASSESSMENT_TYPE.WEB_AND_CALL
                                                            }
                                                        >
                                                            Web and call
                                                        </Radio>
                                                    </Stack>
                                                </RadioGroup>
                                                {assessmentFormErrorState.assessmentType ? (
                                                    <HelperText
                                                        hasError={true}
                                                        errorMsg={ErrorMsg.required()}
                                                    />
                                                ) : null}
                                            </FormControl>
                                            <TextAreaField
                                                label="Base prompt"
                                                name="prompt"
                                                placeholder="Base prompt"
                                                value={assessmentForm.prompt}
                                                onChange={
                                                    onAssessmentFieldChange
                                                }
                                                isRequired={
                                                    assessmentForm.isAssessmentEnabled
                                                }
                                                isInvalid={
                                                    assessmentFormErrorState.prompt
                                                }
                                                helperText={
                                                    <HelperText
                                                        hasError={
                                                            assessmentFormErrorState.prompt
                                                        }
                                                        errorMsg={ErrorMsg.required()}
                                                    />
                                                }
                                            />
                                            <TextAreaField
                                                label="Evaluation prompt"
                                                name="evaluationPrompt"
                                                placeholder="Evaluation prompt"
                                                value={
                                                    assessmentForm.evaluationPrompt
                                                }
                                                onChange={
                                                    onAssessmentFieldChange
                                                }
                                                isRequired={
                                                    assessmentForm.isAssessmentEnabled
                                                }
                                                isInvalid={
                                                    assessmentFormErrorState.evaluationPrompt
                                                }
                                                helperText={
                                                    <HelperText
                                                        hasError={
                                                            assessmentFormErrorState.evaluationPrompt
                                                        }
                                                        errorMsg={ErrorMsg.required()}
                                                    />
                                                }
                                            />
                                            <TextAreaField
                                                label="Call specific Instructions"
                                                name="callPrompt"
                                                placeholder="Call specific Instructions"
                                                value={
                                                    assessmentForm.callPrompt
                                                }
                                                onChange={
                                                    onAssessmentFieldChange
                                                }
                                                isRequired={
                                                    assessmentForm.isAssessmentEnabled
                                                }
                                                isInvalid={
                                                    assessmentFormErrorState.callPrompt
                                                }
                                                helperText={
                                                    <HelperText
                                                        hasError={
                                                            assessmentFormErrorState.callPrompt
                                                        }
                                                        errorMsg={ErrorMsg.required()}
                                                    />
                                                }
                                            />
                                        </Stack>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                            <TextField
                                label="Assessment Result Recipients"
                                name="emails"
                                placeholder="Enter comma separated emails"
                                value={assessmentForm.emails}
                                onChange={onAssessmentFieldChange}
                                isRequired={assessmentForm.isAssessmentEnabled}
                                isInvalid={assessmentFormErrorState.emails}
                                helperText={
                                    <HelperText
                                        msg="Please enter comma separated emails"
                                        hasError={
                                            assessmentFormErrorState.emails
                                        }
                                        errorMsg={ErrorMsg.required()}
                                    />
                                }
                            />
                        </>
                    )}
                </>
            )}
        </FormWrapper>
    );
};
