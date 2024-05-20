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

interface CompanyFieldProps {
    fieldName: keyof Omit<
        CompanyFormProps,
        'settings' | 'governmentIdentifiers'
    >;
    label: string;
    placeholder: string;
    type: 'text' | 'textArea';
    isRequired: boolean;
    errorMsg: string;
    helperText?: string;
}

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

export const CompanyCreationForm = () => {
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

    const companyFields: CompanyFieldProps[] = React.useMemo(
        () => [
            {
                fieldName: 'name',
                label: 'Company Name',
                placeholder: 'Enter Company Name',
                type: 'text',
                errorMsg: ErrorMsg.alphaNumeric(),
                isRequired: true
            },
            {
                fieldName: 'companyId',
                label: 'Company ID',
                placeholder: 'Enter Company ID',
                type: 'text',
                errorMsg: ErrorMsg.id(),
                helperText: 'Please keep it short (upto 15 characters)',
                isRequired: true
            },
            {
                fieldName: 'email',
                label: 'Email ID of Company POC',
                placeholder: 'Enter Email ID',
                type: 'text',
                errorMsg: ErrorMsg.email(),
                isRequired: true
            },
            {
                fieldName: 'mobileNumber',
                label: 'Phone Number of Company POC',
                placeholder: 'Enter Phone Number',
                type: 'text',
                errorMsg: ErrorMsg.mobileNumber(),
                isRequired: true
            },
            {
                fieldName: 'rawAddress',
                label: 'Address',
                placeholder: 'Enter Address',
                type: 'textArea',
                errorMsg: ErrorMsg.characterLength(),
                isRequired: true
            },
            {
                fieldName: 'description',
                label: 'Description',
                placeholder: 'Enter Description',
                type: 'textArea',
                errorMsg: ErrorMsg.characterLength(),
                isRequired: true
            }
        ],
        []
    );

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

        // TODO: Integrate API (done in next PR)
    };

    return (
        <Box
            px={8}
            py={6}
            borderWidth={{ base: 0, sm: 1 }}
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
                {companyFields.map(field => (
                    <FormControl
                        key={field.fieldName}
                        isInvalid={formErrorState[field.fieldName]}
                        isRequired={field.isRequired}
                    >
                        <FormLabel>{field.label}</FormLabel>
                        {field.type === 'textArea' ? (
                            <Textarea
                                placeholder={field.placeholder}
                                name={field.fieldName}
                                value={form[field.fieldName]}
                                onChange={onFormFieldChange}
                            />
                        ) : (
                            <Input
                                placeholder={field.placeholder}
                                name={field.fieldName}
                                value={form[field.fieldName]}
                                onChange={onFormFieldChange}
                            />
                        )}
                        <HelperText
                            hasError={formErrorState[field.fieldName]}
                            errorMsg={field.errorMsg}
                            msg={field.helperText}
                        />
                    </FormControl>
                ))}
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
