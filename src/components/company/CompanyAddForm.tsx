import React from 'react';

import {
    Box,
    Text,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Switch,
    SimpleGrid,
    Button,
    GridItem
} from '@chakra-ui/react';

import { HelperText } from '@components/common';

import { useValidationHelper } from 'hooks';
import { useCompanyHelper } from './useCompanyHelper';
import { useCreateCompany } from 'hooks/apiHooks/company/useCreateCompany';
import { useToast } from 'hooks/useToast';

import { ErrorMsg, RegExUtil } from 'utils';
import type {
    CompanyFormProps,
    FormErrorProps,
    ValidationMapProps
} from 'interfaces';
import {
    DEFAULT_COMPANY_ADDRESS,
    DEFAULT_COMPANY_SETTINGS,
    DEFAULT_LMS_SETTINGS
} from 'Constants';

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

const formErrorStateInitialValues: FormErrorProps<
    Omit<CompanyFormProps, 'settings' | 'governmentIdentifiers'>
> = {
    companyId: false,
    name: false,
    description: false,
    rawAddress: false,
    email: false,
    mobileNumber: false
};

interface CompanyAddFormProps {
    isCreateBtnLoading: boolean;
    onCreate: (_: string) => void;
}

export const CompanyAddForm = ({
    isCreateBtnLoading,
    onCreate
}: CompanyAddFormProps) => {
    const createCompany = useCreateCompany();
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

    const onFormFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const fieldName = e.target.name as keyof CompanyFormProps;
        const fieldValue = e.target.value;

        setForm(oldForm => ({ ...oldForm, [fieldName]: fieldValue }));
        setFormErrorState(prevErrorState => ({
            ...prevErrorState,
            [fieldName]: hasFormFieldError({
                fieldName,
                fieldValue,
                isRequired: requiredFields.indexOf(fieldName) > -1
            })
        }));

        if (fieldName === 'name') {
            const companyId = RegExUtil.conformToId(fieldValue);
            setForm(oldForm => ({
                ...oldForm,
                companyId,
                description: fieldValue
            }));
            setFormErrorState(prevErrorState => ({
                ...prevErrorState,
                companyId: hasFormFieldError({
                    fieldName: 'companyId',
                    fieldValue: companyId,
                    isRequired: requiredFields.indexOf('companyId') > -1
                }),
                description: hasFormFieldError({
                    fieldName: 'description',
                    fieldValue,
                    isRequired: requiredFields.indexOf('description') > -1
                })
            }));
        }
    };

    const onBlockMessagingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isMessagingBlocked = !e.target.checked;
        const modifiedLmsSettings = isMessagingBlocked
            ? {
                  blockMessaging: true
              }
            : { ...DEFAULT_LMS_SETTINGS };

        setForm(oldForm => ({
            ...oldForm,
            settings: {
                ...oldForm.settings,
                lmsSettings: modifiedLmsSettings
            }
        }));
    };

    const addCompany = () => {
        createCompany.mutate(
            {
                params: { companyId: form.companyId },
                requestBody: form
            },
            {
                onSuccess: () => {
                    onCreate(form.companyId);
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
        <Box px={8} py={6}>
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
                <FormControl isInvalid={formErrorState.companyId} isRequired>
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
                <FormControl isInvalid={formErrorState.mobileNumber} isRequired>
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
                <FormControl isInvalid={formErrorState.rawAddress} isRequired>
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
                <FormControl isInvalid={formErrorState.description} isRequired>
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
                        isChecked={!form.settings.lmsSettings.blockMessaging}
                        onChange={onBlockMessagingChange}
                    />
                </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacingX={6} mt={8}>
                <GridItem colStart={{ base: 1, sm: 2 }} textAlign="end">
                    <Button
                        width="100%"
                        colorScheme="blue"
                        onClick={onCreateClick}
                        isDisabled={createCompany.isSuccess}
                        isLoading={
                            createCompany.isLoading || isCreateBtnLoading
                        }
                    >
                        CREATE COMPANY
                    </Button>
                </GridItem>
            </SimpleGrid>
        </Box>
    );
};
