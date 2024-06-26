import React from 'react';

import { useValidationHelper } from 'hooks';
import { useCompanyHelper } from './useCompanyHelper';
import { useCreateCompany } from 'hooks/apiHooks/company/useCreateCompany';
import { useToast } from 'hooks/useToast';
import { useAddDNSRecord } from 'hooks/apiHooks/company/useAddDNSRecord';
import { useAddDomainAlias } from 'hooks/apiHooks/company/useAddDomainAlias';

import { ErrorMsg, RegExUtil } from 'utils';
import type {
    CompanyDetailsFormProps,
    CompanyFormProps,
    FormErrorProps,
    ValidationMapProps
} from 'interfaces';
import {
    DEFAULT_COMPANY_ADDRESS,
    DEFAULT_COMPANY_SETTINGS,
    DEFAULT_LMS_SETTINGS,
    NAVBAR_HEIGHT
} from 'Constants';
import { FormWrapper } from '@components/common/FormWrapper';
import { CompanyAddStatusView } from './CompanyAddStatusView';
import {
    FormControl,
    FormLabel,
    Grid,
    Input,
    Switch,
    Textarea
} from '@chakra-ui/react';
import { HelperText } from '@components/common';
import { LeftPanel } from '@components/common/LeftPanel';
import { RightPanel } from '@components/common/RightPanel';

const validationMap: ValidationMapProps = {
    companyId: (companyId: string) => RegExUtil.isId(companyId),
    name: (name: string) => RegExUtil.isName(name),
    description: (description: string) => RegExUtil.isDescription(description),
    rawAddress: (address: string) => RegExUtil.isDescription(address),
    email: (email: string) => RegExUtil.isEmail(email),
    mobileNumber: (mobile: string) => RegExUtil.isMobileNumber(mobile)
};

const requiredFields: (keyof CompanyFormProps)[] = [
    'companyId',
    'name',
    'description',
    'rawAddress',
    'email',
    'mobileNumber'
];

const formErrorStateInitialValues: FormErrorProps<CompanyDetailsFormProps> = {
    companyId: false,
    name: false,
    description: false,
    rawAddress: false,
    email: false,
    mobileNumber: false
};

interface UpdateFieldErrorStateProps {
    fieldName: keyof CompanyDetailsFormProps;
    fieldValue: string;
}

const DOMAIN_RETRY_LIMIT = 3;

export const CompanyAddForm = () => {
    const createCompany = useCreateCompany();
    const addDNSRecord = useAddDNSRecord();
    const addDomainAlias = useAddDomainAlias();
    const { showError } = useToast();
    const { hasFormFieldError, getFormErrorData } =
        useValidationHelper(validationMap);
    const { generateRandomGSTIN } = useCompanyHelper();

    const companyFormInitialState = React.useMemo(
        () => ({
            companyId: '',
            name: '',
            description: '',
            rawAddress: DEFAULT_COMPANY_ADDRESS,
            email: '',
            mobileNumber: '',
            governmentIdentifiers: {
                gstin: generateRandomGSTIN()
            },
            settings: { ...DEFAULT_COMPANY_SETTINGS }
        }),
        [generateRandomGSTIN]
    );

    const [form, setForm] = React.useState<CompanyFormProps>({
        ...companyFormInitialState
    });
    const [formErrorState, setFormErrorState] = React.useState({
        ...formErrorStateInitialValues
    });
    const [dnsRetryCount, setDnsRetryCount] = React.useState(-1);
    const [domainAliasRetryCount, setDomainAliasRetryCount] =
        React.useState(-1);

    const isDefaultView = React.useMemo(() => {
        return dnsRetryCount === -1 || domainAliasRetryCount == -1;
    }, [dnsRetryCount, domainAliasRetryCount]);

    const isCreateBtnLoading = React.useMemo(() => {
        if (createCompany.isLoading) return true;

        return (
            isDefaultView &&
            (addDNSRecord.isLoading || addDomainAlias.isLoading)
        );
    }, [
        addDNSRecord.isLoading,
        addDomainAlias.isLoading,
        createCompany.isLoading,
        isDefaultView
    ]);

    const updateForm = (modifiedForm: Partial<CompanyFormProps>) => {
        setForm(oldForm => ({ ...oldForm, ...modifiedForm }));
    };

    const updateFieldErrorState = ({
        fieldName,
        fieldValue
    }: UpdateFieldErrorStateProps) => {
        setFormErrorState(prevErrorState => ({
            ...prevErrorState,
            [fieldName]: hasFormFieldError({
                fieldName,
                fieldValue,
                isRequired: requiredFields.indexOf(fieldName) > -1
            })
        }));
    };

    const createDNSRecord = () => {
        addDNSRecord.mutate(
            {
                params: { companyId: form.companyId },
                requestBody: { name: `${form.companyId}.hunar.ai` }
            },
            {
                onSettled: () => {
                    setDnsRetryCount(count => count + 1);
                }
            }
        );
    };

    const createDomainAlias = () => {
        addDomainAlias.mutate(
            {
                params: { companyId: form.companyId },
                requestBody: { domainAlias: `${form.companyId}.hunar.ai` }
            },
            {
                onSettled: () => {
                    setDomainAliasRetryCount(count => count + 1);
                }
            }
        );
    };

    const addCompany = () => {
        createCompany.mutate(
            {
                params: { companyId: form.companyId },
                requestBody: form
            },
            {
                onSuccess: () => {
                    createDNSRecord();
                    createDomainAlias();
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

    const onCreateClick = () => {
        const { errorState: modifiedErrorState, hasFormError } =
            getFormErrorData({
                form,
                requiredFields
            });

        setFormErrorState(prevErrorState => ({
            ...prevErrorState,
            ...modifiedErrorState
        }));

        if (hasFormError) {
            return;
        }

        addCompany();
    };

    const onFormFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const fieldName = e.target.name as keyof CompanyDetailsFormProps;
        const fieldValue = e.target.value;

        updateForm({ [fieldName]: fieldValue });
        updateFieldErrorState({ fieldName, fieldValue });

        if (fieldName === 'name') {
            const companyId = RegExUtil.conformToId(fieldValue);
            updateForm({ companyId, description: fieldValue });
            updateFieldErrorState({
                fieldName: 'companyId',
                fieldValue: companyId
            });
            updateFieldErrorState({ fieldName: 'description', fieldValue });
        }
    };

    const onBlockMessagingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isMessagingBlocked = !e.target.checked;
        const modifiedLmsSettings = isMessagingBlocked
            ? {
                  blockMessaging: true
              }
            : { ...DEFAULT_LMS_SETTINGS };

        updateForm({
            settings: { ...form.settings, lmsSettings: modifiedLmsSettings }
        });
    };

    return (
        <Grid
            templateColumns={{ base: 'auto', md: '8fr 4fr' }}
            height={`calc(100vh - ${NAVBAR_HEIGHT})`}
            overflow={{ base: 'auto', md: 'unset' }}
        >
            <LeftPanel>
                <FormWrapper
                    formTitle="Create Company"
                    isFormDisabled={createCompany.isSuccess}
                    isLoading={isCreateBtnLoading}
                    onSubmit={onCreateClick}
                >
                    <FormControl isInvalid={formErrorState.name} isRequired>
                        <FormLabel>Company Name</FormLabel>
                        <Input
                            placeholder="Enter Company Name"
                            name="name"
                            value={form.name}
                            onChange={onFormFieldChange}
                        />
                        <HelperText
                            hasError={formErrorState.name}
                            errorMsg={ErrorMsg.alphaNumeric()}
                        />
                    </FormControl>
                    <FormControl
                        isInvalid={formErrorState.companyId}
                        isRequired
                    >
                        <FormLabel>Company ID</FormLabel>
                        <Input
                            placeholder="Enter Company ID"
                            name="companyId"
                            value={form.companyId}
                            onChange={onFormFieldChange}
                        />
                        <HelperText
                            hasError={formErrorState.companyId}
                            errorMsg={ErrorMsg.id()}
                            msg="Please keep it short (upto 15 characters)"
                        />
                    </FormControl>
                    <FormControl isInvalid={formErrorState.email} isRequired>
                        <FormLabel>Email ID of Company POC</FormLabel>
                        <Input
                            placeholder="Enter Email ID"
                            name="email"
                            value={form.email}
                            onChange={onFormFieldChange}
                        />
                        <HelperText
                            hasError={formErrorState.email}
                            errorMsg={ErrorMsg.email()}
                        />
                    </FormControl>
                    <FormControl
                        isInvalid={formErrorState.mobileNumber}
                        isRequired
                    >
                        <FormLabel>Phone Number of Company POC</FormLabel>
                        <Input
                            placeholder="Enter Phone Number"
                            name="mobileNumber"
                            value={form.mobileNumber}
                            onChange={onFormFieldChange}
                        />
                        <HelperText
                            hasError={formErrorState.mobileNumber}
                            errorMsg={ErrorMsg.mobileNumber()}
                        />
                    </FormControl>
                    <FormControl
                        isInvalid={formErrorState.rawAddress}
                        isRequired
                    >
                        <FormLabel>Address</FormLabel>
                        <Textarea
                            placeholder="Enter Address"
                            name="rawAddress"
                            value={form.rawAddress}
                            onChange={onFormFieldChange}
                        />
                        <HelperText
                            hasError={formErrorState.rawAddress}
                            errorMsg={ErrorMsg.characterLength()}
                        />
                    </FormControl>
                    <FormControl
                        isInvalid={formErrorState.description}
                        isRequired
                    >
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder="Enter Description"
                            name="description"
                            value={form.description}
                            onChange={onFormFieldChange}
                        />
                        <HelperText
                            hasError={formErrorState.description}
                            errorMsg={ErrorMsg.characterLength()}
                        />
                    </FormControl>
                    <FormControl
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <FormLabel>Allow Messaging</FormLabel>
                        <Switch
                            name="blockMessaging"
                            isChecked={
                                !form.settings.lmsSettings.blockMessaging
                            }
                            onChange={onBlockMessagingChange}
                        />
                    </FormControl>
                </FormWrapper>
            </LeftPanel>
            <RightPanel>
                <CompanyAddStatusView
                    isDefaultView={isDefaultView}
                    isDNSLoading={addDNSRecord.isLoading}
                    isDNSSuccessful={addDNSRecord.isSuccess}
                    isDNSRetryVisible={dnsRetryCount < DOMAIN_RETRY_LIMIT}
                    onDNSRetryClick={createDNSRecord}
                    isDomainAddLoading={addDomainAlias.isLoading}
                    isDomainAddSuccessful={addDomainAlias.isSuccess}
                    isDomainRetryVisible={
                        domainAliasRetryCount < DOMAIN_RETRY_LIMIT
                    }
                    onDomainRetryClick={createDomainAlias}
                />
            </RightPanel>
        </Grid>
    );
};
