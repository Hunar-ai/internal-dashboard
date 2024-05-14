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

import { ErrorMsg, RegExUtil } from 'utils';
import type {
    CompanyFormProps,
    FormErrorProps,
    ValidationMapProps
} from 'interfaces';
import {
    DEFAULT_COMPANY_SETTINGS,
    DEFAULT_LMS_SETTINGS
} from './CompanyConstants';

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

const companyFormInitialState = {
    companyId: '',
    name: '',
    description: '',
    rawAddress: 'Plot in Gurgaon, Haryana',
    email: '',
    mobileNumber: '',
    governmentIdentifiers: {
        gstin: '09AAACH1279R4ZZ'
    },
    settings: DEFAULT_COMPANY_SETTINGS
};

const formErrorStateInitialValues: FormErrorProps<
    Omit<CompanyFormProps, 'settings'>
> = {
    companyId: false,
    name: false,
    description: false,
    rawAddress: false,
    email: false,
    mobileNumber: false
};

export const CompanyCreationForm = () => {
    const { hasFormFieldError, getFormErrorData } =
        useValidationHelper(validationMap);

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
    };

    return (
        <Box
            px={8}
            py={6}
            borderWidth={{ base: 0, sm: '1px' }}
            borderRadius="lg"
            width="3xl"
        >
            <SimpleGrid
                columns={{ base: 1, sm: 2 }}
                spacingX={6}
                spacingY={4}
                width="100%"
                alignItems="start"
            >
                <GridItem colSpan={{ base: 1, sm: 2 }} mb={4}>
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
                <FormControl isRequired isInvalid={formErrorState.rawAddress}>
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
                <FormControl isRequired isInvalid={formErrorState.description}>
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
                    >
                        CREATE COMPANY
                    </Button>
                </GridItem>
            </SimpleGrid>
        </Box>
    );
};
