import React from 'react';

import { Text, SimpleGrid, Button, GridItem, VStack } from '@chakra-ui/react';

import {
    CompanyAddDetailsForm,
    CompanyAddFormWrapper,
    CompanyAddSettingsForm,
    CompanyDomainStatus
} from '@components/company';

import { useValidationHelper } from 'hooks';
import { useCompanyHelper } from './useCompanyHelper';
import { useCreateCompany } from 'hooks/apiHooks/company/useCreateCompany';
import { useToast } from 'hooks/useToast';
import { useAddDNSRecord } from 'hooks/apiHooks/company/useAddDNSRecord';
import { useAddDomainAlias } from 'hooks/apiHooks/company/useAddDomainAlias';

import { RegExUtil } from 'utils';
import type {
    CompanyDetailsFormProps,
    CompanyFormProps,
    FormErrorProps,
    ValidationMapProps
} from 'interfaces';
import { DEFAULT_COMPANY_ADDRESS, DEFAULT_COMPANY_SETTINGS } from 'Constants';

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
    const [showDNSStatus, setShowDNSStatus] = React.useState(false);
    const [showDomainAliasStatus, setShowDomainAliasStatus] =
        React.useState(false);
    const [dnsRetryCount, setDnsRetryCount] = React.useState(0);
    const [domainAliasRetryCount, setDomainAliasRetryCount] = React.useState(0);

    const isDomainStatusVisible = React.useMemo(() => {
        return (
            createCompany.isSuccess && showDNSStatus && showDomainAliasStatus
        );
    }, [createCompany.isSuccess, showDNSStatus, showDomainAliasStatus]);

    const isCreateBtnLoading = React.useMemo(() => {
        if (createCompany.isLoading) return true;

        return (
            !isDomainStatusVisible &&
            (addDNSRecord.isLoading || addDomainAlias.isLoading)
        );
    }, [
        addDNSRecord.isLoading,
        addDomainAlias.isLoading,
        createCompany.isLoading,
        isDomainStatusVisible
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
                    if (showDNSStatus) {
                        setDnsRetryCount(count => count + 1);
                    } else {
                        setShowDNSStatus(true);
                    }
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
                    if (showDomainAliasStatus) {
                        setDomainAliasRetryCount(count => count + 1);
                    } else {
                        setShowDomainAliasStatus(true);
                    }
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

    return (
        <CompanyAddFormWrapper
            statusPanel={
                isDomainStatusVisible && (
                    <VStack spacing={6}>
                        <CompanyDomainStatus
                            title="Google DNS"
                            isRetrying={addDNSRecord.isLoading}
                            isSuccessful={addDNSRecord.isSuccess}
                            isRetryBtnVisible={
                                dnsRetryCount < DOMAIN_RETRY_LIMIT
                            }
                            onRetryClick={createDNSRecord}
                        />
                        <CompanyDomainStatus
                            title="Netlify"
                            isRetrying={addDomainAlias.isLoading}
                            isSuccessful={addDomainAlias.isSuccess}
                            isRetryBtnVisible={
                                domainAliasRetryCount < DOMAIN_RETRY_LIMIT
                            }
                            onRetryClick={createDomainAlias}
                        />
                    </VStack>
                )
            }
        >
            <>
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacingX={6}
                    spacingY={4}
                    width="100%"
                    alignItems="start"
                >
                    <GridItem colSpan={{ base: 1, md: 2 }} mb={4}>
                        <Text
                            fontSize="xl"
                            lineHeight={1.4}
                            width="100%"
                            fontWeight={600}
                        >
                            Create Company
                        </Text>
                    </GridItem>
                    <CompanyAddDetailsForm
                        companyId={form.companyId}
                        description={form.description}
                        email={form.email}
                        mobileNumber={form.mobileNumber}
                        name={form.name}
                        rawAddress={form.rawAddress}
                        formErrorState={formErrorState}
                        isDisabled={createCompany.isSuccess}
                        updateForm={updateForm}
                        updateFieldErrorState={updateFieldErrorState}
                    />
                    <CompanyAddSettingsForm
                        isDisabled={createCompany.isSuccess}
                        settings={form.settings}
                        updateForm={updateForm}
                    />
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacingX={6} mt={8}>
                    <GridItem colStart={{ base: 1, sm: 2 }} textAlign="end">
                        <Button
                            width="100%"
                            colorScheme="blue"
                            onClick={onCreateClick}
                            isDisabled={createCompany.isSuccess}
                            isLoading={isCreateBtnLoading}
                        >
                            CREATE COMPANY
                        </Button>
                    </GridItem>
                </SimpleGrid>
            </>
        </CompanyAddFormWrapper>
    );
};
