import React from 'react';

import { Box, FormControl, FormLabel, Switch } from '@chakra-ui/react';

import {
    AppLoader,
    FormWrapper,
    SelectField,
    HelperText
} from '@components/common';
import {
    AddAiCallLanguageModal,
    AddVoiceProviderConfigModal,
    SelectVoiceProviderRadioGroup
} from '@components/callAutomation';
import { useCompanyHelper } from '@components/company/useCompanyHelper';

import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useSearchVoicePersona } from 'hooks/apiHooks/voicePersona/useSearchVoicePersona';
import { useGetVoiceConfig } from 'hooks/apiHooks/voiceConfig/useGetVoiceConfig';
import { useUpdateVoiceConfig } from 'hooks/apiHooks/voiceConfig/useUpdateVoiceConfig';
import { useValidationHelper } from 'hooks';
import { useToast } from 'hooks/useToast';

import type { OptionsProps } from 'interfaces';
import { ErrorMsg } from 'utils';

export interface CallAutomationEditForm {
    companyId: string;
    isCallAutomationEnabled: boolean;
    defaultLanguage: string;
    aiPersonaId: string;
    selectedProviderId?: string;
}

const callAutomationFormInitialValues: CallAutomationEditForm = {
    companyId: '',
    isCallAutomationEnabled: false,
    defaultLanguage: '',
    aiPersonaId: '',
    selectedProviderId: ''
};

const initialFormErrorStateValues: Partial<
    Record<keyof CallAutomationEditForm, boolean>
> = {
    companyId: false,
    isCallAutomationEnabled: false,
    aiPersonaId: false,
    selectedProviderId: false
};

const requiredFields: Record<
    'enabled' | 'disabled',
    (keyof CallAutomationEditForm)[]
> = {
    enabled: ['companyId', 'aiPersonaId', 'selectedProviderId'],
    disabled: ['companyId']
};

export const CallAutomationEditForm = () => {
    const { getFormErrorData, hasFormFieldError } = useValidationHelper();
    const { showSuccess, showError } = useToast();

    const [form, setForm] = React.useState({
        ...callAutomationFormInitialValues
    });
    const [formErrors, setFormErrors] = React.useState({
        ...initialFormErrorStateValues
    });
    const [isAddVoiceProviderModalVisible, setIsAddVoiceProviderModalVisible] =
        React.useState(false);
    const [
        isAddAiCallLanguageModalVisible,
        setIsAddAiCallLanguageModalVisible
    ] = React.useState(false);

    const { data: companiesResponse, isLoading: isCompaniesLoading } =
        useGetCompanies();
    const { companyIdOptions, companyMap } = useCompanyHelper(
        companiesResponse?.data
    );

    const { data: voicePersonas, isLoading: isVoicePersonasLoading } =
        useSearchVoicePersona({
            enabled: !!form.companyId,
            params: { companyId: form.companyId }
        });

    const {
        data: voiceConfigData,
        isLoading: isVoiceConfigLoading,
        refetch: refetchVoiceConfiguraiton
    } = useGetVoiceConfig({
        enabled: !!form.companyId,
        params: { companyId: form.companyId },
        onSuccess: data => {
            const activeProvider = data.providers.find(
                provider => provider.active
            );

            setForm(prevForm => ({
                companyId: form.companyId,
                isCallAutomationEnabled:
                    prevForm?.isCallAutomationEnabled || data.enabled,
                defaultLanguage:
                    prevForm.defaultLanguage || data.defaultLanguage,
                aiPersonaId: (prevForm?.aiPersonaId || data.persona?.id) ?? '',
                selectedProviderId:
                    (prevForm?.selectedProviderId ||
                        activeProvider?.provider.id) ??
                    ''
            }));
        }
    });
    const updateVoiceConfig = useUpdateVoiceConfig();

    const voicePersonaOptions: OptionsProps = React.useMemo(() => {
        return (
            voicePersonas?.data?.map(voicePersona => ({
                label: `${voicePersona.name} (${voicePersona.description})`,
                value: voicePersona.id
            })) ?? []
        );
    }, [voicePersonas]);

    const isLoadingConfiguration = React.useMemo(() => {
        return (
            form.companyId &&
            (isVoicePersonasLoading ||
                (form.isCallAutomationEnabled && isVoiceConfigLoading))
        );
    }, [
        form.companyId,
        isVoicePersonasLoading,
        form.isCallAutomationEnabled,
        isVoiceConfigLoading
    ]);

    const jobQueriesWithoutLanguageCount = React.useMemo(() => {
        if (!form.companyId || !companyMap) {
            return 0;
        }
        const selectedCompany = companyMap[form.companyId];
        return selectedCompany?.jobQueriesWithoutLanguageCount ?? 0;
    }, [form.companyId, companyMap]);

    const updateFieldError = (fieldName: string, fieldValue: string) => {
        setFormErrors(prevFormErrors => ({
            ...prevFormErrors,
            [fieldName]: hasFormFieldError({ fieldName, fieldValue })
        }));
    };

    const onCompanyIdChange = ({
        target: { name, value }
    }: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({ ...callAutomationFormInitialValues, companyId: value });
        updateFieldError(name, value);
    };

    const onAiPersonaIdChange = ({
        target: { name, value }
    }: React.ChangeEvent<HTMLSelectElement>) => {
        setForm(prevForm => ({ ...prevForm, aiPersonaId: value }));
        updateFieldError(name, value);
    };

    const onAssessmentEnableToggle = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const isCallAutomationEnabled = e.target.checked;
        setForm(prevForm => ({ ...prevForm, isCallAutomationEnabled }));

        if (isCallAutomationEnabled) {
            setIsAddAiCallLanguageModalVisible(true);
        }
    };

    const onSelectedProviderChange = (selectedProviderId: string) => {
        setForm(prevForm => ({ ...prevForm, selectedProviderId }));
        updateFieldError('selectedProviderId', selectedProviderId);
    };

    const onUpdateVoiceConfiguration = () => {
        const callAutomationConfig = form.isCallAutomationEnabled
            ? {
                  personaId: form.aiPersonaId,
                  providerId: form.selectedProviderId
              }
            : {};

        updateVoiceConfig.mutate(
            {
                params: { companyId: form.companyId },
                body: {
                    enabled: form.isCallAutomationEnabled,
                    defaultLanguage: form.defaultLanguage,
                    ...callAutomationConfig
                }
            },
            {
                onSuccess: () =>
                    showSuccess({
                        title: 'Success',
                        description:
                            'Successfully saved Call Automation Settings!'
                    }),
                onError: error =>
                    showError({
                        title: 'Error',
                        description: error.errors.displayError
                    })
            }
        );
    };

    const onSubmitClick = () => {
        const { errorState: modifiedFormErrorState, hasFormError } =
            getFormErrorData({
                form: {
                    companyId: form.companyId,
                    aiPersonaId: form.aiPersonaId,
                    selectedProviderId: form.selectedProviderId
                },
                requiredFields:
                    requiredFields[
                        form.isCallAutomationEnabled ? 'enabled' : 'disabled'
                    ]
            });
        setFormErrors(modifiedFormErrorState);

        if (hasFormError) {
            return;
        }

        onUpdateVoiceConfiguration();
    };

    const handleCloseAiCallLanguageModal = React.useCallback(() => {
        if (!form.defaultLanguage) {
            setForm(prevForm => ({
                ...prevForm,
                isCallAutomationEnabled: false
            }));
        }
        setIsAddAiCallLanguageModalVisible(false);
    }, [form.defaultLanguage]);

    return (
        <FormWrapper
            id="call-automation-form-container"
            formTitle="Call Automation Settings"
            gridColumns={1}
            isFormDisabled={false}
            isLoading={updateVoiceConfig.isLoading}
            width={{ base: 'xl', lg: '60%' }}
            onSubmit={onSubmitClick}
        >
            {(isCompaniesLoading || isLoadingConfiguration) && <AppLoader />}
            <FormControl>
                <SelectField
                    label="Company ID"
                    name="companyId"
                    placeholder="Select Company ID"
                    options={companyIdOptions}
                    value={form.companyId}
                    onChange={onCompanyIdChange}
                    isRequired
                    isInvalid={!!formErrors.companyId}
                    helperText={
                        <HelperText
                            hasError={!!formErrors.companyId}
                            errorMsg={ErrorMsg.required()}
                        />
                    }
                />
            </FormControl>
            {form.companyId ? (
                <Box>
                    <FormControl
                        display="flex"
                        justifyContent="space-between"
                        isRequired
                        mt={4}
                    >
                        <FormLabel variant="xl" fontWeight={500}>
                            {`Enable Automated Calls`}
                        </FormLabel>
                        <Switch
                            name="isCallAutomationEnabled"
                            id="isCallAutomationEnabled"
                            isChecked={form.isCallAutomationEnabled}
                            onChange={onAssessmentEnableToggle}
                        />
                    </FormControl>
                    {form.isCallAutomationEnabled && (
                        <>
                            <FormControl mt={4}>
                                <SelectField
                                    label="AI Persona"
                                    name="aiPersonaId"
                                    placeholder="Select AI Persona"
                                    options={voicePersonaOptions}
                                    value={form.aiPersonaId}
                                    onChange={onAiPersonaIdChange}
                                    isRequired
                                    isDisabled={!form.isCallAutomationEnabled}
                                    isInvalid={!!formErrors.aiPersonaId}
                                    helperText={
                                        <HelperText
                                            hasError={!!formErrors.aiPersonaId}
                                            errorMsg={ErrorMsg.required()}
                                        />
                                    }
                                />
                            </FormControl>
                            <Box mt={4}>
                                <SelectVoiceProviderRadioGroup
                                    selectedProviderId={form.selectedProviderId}
                                    isDisabled={!form.isCallAutomationEnabled}
                                    hasError={!!formErrors.selectedProviderId}
                                    providersList={
                                        voiceConfigData?.providers ?? []
                                    }
                                    onSelectedProviderIdChange={
                                        onSelectedProviderChange
                                    }
                                    onOpenAddProviderModal={() =>
                                        setIsAddVoiceProviderModalVisible(true)
                                    }
                                />
                            </Box>
                        </>
                    )}
                    {isAddVoiceProviderModalVisible && (
                        <AddVoiceProviderConfigModal
                            companyId={form.companyId}
                            isOpen={isAddVoiceProviderModalVisible}
                            handleCloseClick={() =>
                                setIsAddVoiceProviderModalVisible(false)
                            }
                            refetchVoiceConfiguraiton={
                                refetchVoiceConfiguraiton
                            }
                        />
                    )}
                    {isAddAiCallLanguageModalVisible && (
                        <AddAiCallLanguageModal
                            jobQueriesCount={jobQueriesWithoutLanguageCount}
                            defaultLanguage={form.defaultLanguage}
                            isOpen={isAddAiCallLanguageModalVisible}
                            handleCloseClick={handleCloseAiCallLanguageModal}
                            setDefaultLanguage={setForm}
                        />
                    )}
                </Box>
            ) : (
                <></>
            )}
        </FormWrapper>
    );
};
