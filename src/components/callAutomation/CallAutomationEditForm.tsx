import React from 'react';

import { Box, Flex, FormControl, Switch, Text } from '@chakra-ui/react';

import {
    AppLoader,
    FormWrapper,
    FieldRequiredIndicator,
    SelectField,
    HelperText
} from '@components/common';
import {
    AddVoiceProviderConfigModal,
    SelectVoiceProviderRadioGroup
} from '@components/callAutomation';
import { useCompanyHelper } from '@components/company/useCompanyHelper';

import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useSearchVoicePersonas } from 'hooks/apiHooks/voicePersonas';
import {
    useGetVoiceConfig,
    useUpdateVoiceConfig
} from 'hooks/apiHooks/voiceConfig';
import { useValidationHelper } from 'hooks';
import { useToast } from 'hooks/useToast';

import { OptionsProps } from 'interfaces';
import { ErrorMsg } from 'utils';

interface CallAutomationEditForm {
    companyId: string;
    isCallAutomationEnabled: boolean;
    aiPersonaId: string;
    selectedProviderId?: string;
}

const callAutomationFormInitialValues: CallAutomationEditForm = {
    companyId: '',
    isCallAutomationEnabled: false,
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

    const { data: companiesResponse, isLoading: isCompaniesLoading } =
        useGetCompanies();
    const { companyNameOptions } = useCompanyHelper(companiesResponse?.data);

    const { data: voicePersonas, isLoading: isVoicePersonasLoading } =
        useSearchVoicePersonas({
            enabled: !!form.companyId,
            params: { companyId: form.companyId }
        });

    const {
        data: companyVoiceConfigData,
        isLoading: isCompanyVoiceConfigLoading,
        refetch: refetchCompanyVoiceConfiguraiton
    } = useGetVoiceConfig({
        enabled: !!form.companyId,
        params: { companyId: form.companyId },
        onSuccess: data => {
            const activeProvider = data.providers.find(
                provider => provider.active
            );
            setForm({
                companyId: form.companyId,
                isCallAutomationEnabled: data.enabled,
                aiPersonaId: data.persona.id,
                selectedProviderId: activeProvider?.provider.id ?? undefined
            });
        },
        onError: () => {
            showError({
                title: 'Error',
                description: 'Failed to load company voice configuration'
            });
        }
    });
    const updateVoiceConfig = useUpdateVoiceConfig();

    const voicePersonasOptions: OptionsProps = React.useMemo(() => {
        return (
            voicePersonas?.data?.map(voicePersona => ({
                label: `${voicePersona.name} (${voicePersona.description})`,
                value: voicePersona.id
            })) ?? []
        );
    }, [voicePersonas]);

    const isLoadingCompanyConfiguration = React.useMemo(() => {
        return (
            form.companyId &&
            (isVoicePersonasLoading ||
                (form.isCallAutomationEnabled && isCompanyVoiceConfigLoading))
        );
    }, [
        form.companyId,
        isVoicePersonasLoading,
        form.isCallAutomationEnabled,
        isCompanyVoiceConfigLoading
    ]);

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
    };

    const onSelectedProviderChange = (selectedProviderId: string) => {
        setForm(prevForm => ({ ...prevForm, selectedProviderId }));
        updateFieldError('selectedProviderId', selectedProviderId);
    };

    const onUpdateVoiceCofiguration = () => {
        updateVoiceConfig.mutate(
            {
                params: { companyId: form.companyId },
                body: {
                    enabled: form.isCallAutomationEnabled,
                    ...(form.isCallAutomationEnabled
                        ? {
                              personaId: form.aiPersonaId,
                              providerId: form.selectedProviderId
                          }
                        : {})
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

        onUpdateVoiceCofiguration();
    };

    return (
        <FormWrapper
            id="call-automation-form-container"
            formTitle="Call Automation Settings"
            isFormDisabled={false}
            isLoading={updateVoiceConfig.isLoading}
            gridColumns={1}
            onSubmit={onSubmitClick}
            width={{ base: 'xl', lg: '60%' }}
        >
            {(isCompaniesLoading || isLoadingCompanyConfiguration) && (
                <AppLoader />
            )}
            <FormControl>
                <SelectField
                    label="Company Name"
                    name="companyId"
                    placeholder="Select Company"
                    options={companyNameOptions}
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
                    <Flex justifyContent="space-between" mt={4}>
                        <Text variant="xl" fontWeight={500}>
                            {`Enable Automated Calls`}
                            <FieldRequiredIndicator />
                        </Text>
                        <Switch
                            name="isCallAutomationEnabled"
                            id="isCallAutomationEnabled"
                            isChecked={form.isCallAutomationEnabled}
                            onChange={onAssessmentEnableToggle}
                        />
                    </Flex>
                    {form.isCallAutomationEnabled ? (
                        <>
                            <FormControl mt={4}>
                                <SelectField
                                    label="AI Persona"
                                    name="aiPersonaId"
                                    placeholder="Select AI Persona"
                                    options={voicePersonasOptions}
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
                                        companyVoiceConfigData?.providers ?? []
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
                    ) : (
                        <></>
                    )}
                    {isAddVoiceProviderModalVisible && (
                        <AddVoiceProviderConfigModal
                            companyId={form.companyId}
                            isOpen={isAddVoiceProviderModalVisible}
                            handleCloseClick={() =>
                                setIsAddVoiceProviderModalVisible(false)
                            }
                            refetchCompanyVoiceConfiguraiton={
                                refetchCompanyVoiceConfiguraiton
                            }
                        />
                    )}
                </Box>
            ) : (
                <></>
            )}
        </FormWrapper>
    );
};
