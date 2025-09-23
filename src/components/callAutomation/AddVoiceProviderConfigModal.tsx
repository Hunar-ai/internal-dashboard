import React from 'react';

import {
    Button,
    FormControl,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';

import { TextField, SelectField, HelperText } from '@components/common';

import { SettingsContext } from 'contexts';
import { useValidationHelper } from 'hooks';
import { useCreateVoiceProvider } from 'hooks/apiHooks/voiceProviders/useCreateVoiceProvider';
import { useToast } from 'hooks/useToast';

import type { CreateProviderConfigProps } from 'interfaces';
import { ErrorMsg, RegExUtil } from 'utils';

export interface AddPhoneNumberFormProps {
    referenceName: string;
    providerId: string;
    mobileNumber: string;
    authId: string;
    authToken: string;
}

interface AddVoiceProviderConfigModalProps {
    companyId: string;
    isOpen: boolean;
    handleCloseClick: VoidFunction;
    refetchVoiceConfiguraiton?: VoidFunction;
}

const initialFormValues: CreateProviderConfigProps = {
    referenceName: '',
    providerType: '',
    mobileNumber: '',
    secretId: '',
    secretToken: ''
};

const initialFormErrorStateValues: Partial<
    Record<keyof CreateProviderConfigProps, boolean>
> = {
    referenceName: false,
    providerType: false,
    mobileNumber: false,
    secretId: false,
    secretToken: false
};

const requiredFields: (keyof CreateProviderConfigProps)[] = [
    'referenceName',
    'providerType',
    'mobileNumber',
    'secretId',
    'secretToken'
];

const validationMap = {
    referenceName: (referenceName: string) => RegExUtil.isName(referenceName),
    mobileNumber: (mobileNumber: string) =>
        RegExUtil.isMobileNumber(mobileNumber)
};

export const AddVoiceProviderConfigModal = ({
    companyId,
    isOpen,
    handleCloseClick,
    refetchVoiceConfiguraiton
}: AddVoiceProviderConfigModalProps) => {
    const {
        formFields: { voiceCallOrchestratorTelephonyProviders }
    } = React.useContext(SettingsContext);

    const { hasFormFieldError, getFormErrorData } =
        useValidationHelper(validationMap);
    const { showSuccess, showError } = useToast();

    const [form, setForm] = React.useState({ ...initialFormValues });
    const [formErrors, setFormErrors] = React.useState({
        ...initialFormErrorStateValues
    });

    const voiceProvider = useCreateVoiceProvider();

    const createVoiceProvider = () => {
        voiceProvider.mutate(
            {
                params: { companyId },
                body: {
                    providerType: form.providerType,
                    config: {
                        authId: form.secretId,
                        authToken: form.secretToken,
                        mobileNumber: form.mobileNumber,
                        referenceName: form.referenceName
                    }
                }
            },
            {
                onSuccess: () => {
                    showSuccess({
                        title: 'Success',
                        description: 'Successfully created Phone Number'
                    });
                    handleCloseClick();
                    refetchVoiceConfiguraiton?.();
                },
                onError: error => {
                    showError({
                        title: 'Failed to create company',
                        description: error.errors.displayError
                    });
                }
            }
        );
    };

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const fieldName = e.target.name as keyof CreateProviderConfigProps;
        const fieldValue = e.target.value;

        setForm(prevForm => ({ ...prevForm, [fieldName]: fieldValue }));
        setFormErrors(prevFormErrors => ({
            ...prevFormErrors,
            [fieldName]: hasFormFieldError({ fieldName, fieldValue })
        }));
    };

    const onSubmit = () => {
        const { errorState: modifiedFormErrorState, hasFormError } =
            getFormErrorData({ form: form, requiredFields });
        setFormErrors(modifiedFormErrorState);

        if (hasFormError) {
            return;
        }
        createVoiceProvider();
    };

    return (
        <Modal
            size="lg"
            isOpen={isOpen}
            onClose={handleCloseClick}
            closeOnEsc={false}
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{`Add Phone Number`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <TextField
                            label="Reference Name"
                            name="referenceName"
                            onChange={onChange}
                            value={form.referenceName}
                            isRequired
                            isInvalid={!!formErrors.referenceName}
                            helperText={
                                <HelperText
                                    hasError={!!formErrors.referenceName}
                                    errorMsg={ErrorMsg.invalid(
                                        ' Reference Name'
                                    )}
                                />
                            }
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <SelectField
                            label="Provider"
                            name="providerType"
                            placeholder="Select Provider"
                            value={form.providerType}
                            isRequired
                            isInvalid={!!formErrors.providerType}
                            options={voiceCallOrchestratorTelephonyProviders}
                            onChange={onChange}
                            helperText={
                                <HelperText
                                    hasError={!!formErrors.referenceName}
                                    errorMsg={ErrorMsg.required()}
                                />
                            }
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <TextField
                            name="mobileNumber"
                            label="Mobile Number"
                            value={form.mobileNumber}
                            isRequired
                            isInvalid={!!formErrors.mobileNumber}
                            onChange={onChange}
                            helperText={
                                <HelperText
                                    hasError={!!formErrors.referenceName}
                                    errorMsg={ErrorMsg.mobileNumber()}
                                />
                            }
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <TextField
                            name="secretId"
                            label="Auth ID"
                            value={form.secretId}
                            isRequired
                            isInvalid={!!formErrors.secretId}
                            onChange={onChange}
                            helperText={
                                <HelperText
                                    hasError={!!formErrors.referenceName}
                                    errorMsg={ErrorMsg.required()}
                                />
                            }
                        />
                    </FormControl>
                    <FormControl mt={4}>
                        <TextField
                            name="secretToken"
                            label="Auth Token"
                            value={form.secretToken}
                            isRequired
                            onChange={onChange}
                            isInvalid={!!formErrors.secretToken}
                            helperText={
                                <HelperText
                                    hasError={!!formErrors.referenceName}
                                    errorMsg={ErrorMsg.required()}
                                />
                            }
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button
                        mr={3}
                        variant="sublte"
                        colorScheme="gray"
                        onClick={handleCloseClick}
                    >
                        {`CANCEL`}
                    </Button>
                    <Button
                        isLoading={voiceProvider.isLoading}
                        colorScheme="blue"
                        onClick={onSubmit}
                    >
                        {`ADD NUMBER`}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
