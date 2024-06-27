import React from 'react';

import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    Select,
    Textarea,
    Text
} from '@chakra-ui/react';

import {
    AppLoader,
    FormWrapper,
    HelperText,
    LeftPanel,
    RightPanel,
    UploadButton
} from '@components/common';
import { CareerPagePreview } from './CareerPagePreview';

import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useUploadCareerPageAsset } from 'hooks/apiHooks/careerPage/useUploadCareerPageAsset';
import { useAddCareerPageSettings } from 'hooks/apiHooks/careerPage/useAddCareerPageSettings';
import { useToast } from 'hooks/useToast';
import { useValidationHelper } from 'hooks';

import type { CareerPageSettingsProps, FormErrorProps } from 'interfaces';
import { ALLOWED_EXTENSION } from 'Enum';
import { ErrorMsg, RegExUtil } from 'utils';
import { NAVBAR_HEIGHT } from 'Constants';

type CareerPageFormProps = CareerPageSettingsProps & {
    companyId: string;
};

interface UpdateFieldErrorStateProps {
    fieldName: keyof CareerPageFormProps;
    fieldValue: string;
}

const allowedImageExtensions = [
    ALLOWED_EXTENSION.PNG,
    ALLOWED_EXTENSION.JPG,
    ALLOWED_EXTENSION.JPEG
];

const validationMap = {
    primaryColor: (primaryColor: string) => RegExUtil.isHexColor(primaryColor),
    description: (description: string) =>
        RegExUtil.isDescription(description, 300)
};

const requiredFields: (keyof CareerPageFormProps)[] = [
    'companyId',
    'primaryColor',
    'description',
    'logo1',
    'bannerImg'
];

const formInitialState: CareerPageFormProps = {
    companyId: '',
    logo1: '',
    logo2: '',
    bannerImg: '',
    primaryColor: '',
    description: ''
};

const formErrorStateInitialValues: FormErrorProps<CareerPageFormProps> = {
    companyId: false,
    logo1: false,
    logo2: false,
    bannerImg: false,
    description: false,
    primaryColor: false
};

// TODO: keep only upload fields
const formErrorValueInitialState: Record<keyof CareerPageFormProps, string> = {
    companyId: '',
    logo1: '',
    logo2: '',
    bannerImg: '',
    primaryColor: '',
    description: ''
};

export const CompanyCareerPageForm = () => {
    const { showError, showSuccess } = useToast();
    const uploadCareerPageAsset = useUploadCareerPageAsset();
    const addCareerPageSettings = useAddCareerPageSettings();
    const { hasFormFieldError, getFormErrorData } =
        useValidationHelper(validationMap);

    const [form, setForm] = React.useState<CareerPageFormProps>({
        ...formInitialState
    });
    const [formErrorState, setFormErrorState] = React.useState({
        ...formErrorStateInitialValues
    });
    const [formErrorValue, setFormErrorValue] = React.useState({
        ...formErrorValueInitialState
    });

    const { data: companiesResponse, isLoading: isCompaniesLoading } =
        useGetCompanies();

    const companyName = React.useMemo(
        () =>
            companiesResponse?.data.find(
                company => company.companyId === form.companyId
            )?.name || '',
        [companiesResponse?.data, form.companyId]
    );

    const updateForm = (modifiedForm: Partial<CareerPageFormProps>) => {
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

    const onFormFieldChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const fieldName = e.target.name as keyof CareerPageFormProps;
        const fieldValue = e.target.value;

        updateForm({ [fieldName]: fieldValue });
        updateFieldErrorState({ fieldName, fieldValue });
    };

    const uploadFile = (fieldName: keyof CareerPageFormProps, file: File) => {
        uploadCareerPageAsset.mutate(
            {
                params: { companyId: form.companyId },
                requestBody: { file }
            },
            {
                onSuccess: ({ assetUrl }) => {
                    updateForm({ [fieldName]: assetUrl });
                    updateFieldErrorState({ fieldName, fieldValue: assetUrl });
                    setFormErrorValue(prevErrorValue => ({
                        ...prevErrorValue,
                        [fieldName]: ''
                    }));
                },
                onError: ({ errors }) => {
                    setFormErrorState(prevErrorState => ({
                        ...prevErrorState,
                        [fieldName]: true
                    }));
                    setFormErrorValue(prevErrorValue => ({
                        ...prevErrorValue,
                        [fieldName]: errors.displayError
                    }));
                }
            }
        );
    };

    const onFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name as keyof CareerPageFormProps;
        const file = event.target.files?.[0];

        if (!file) {
            setFormErrorValue(prevErrorValue => ({
                ...prevErrorValue,
                [fieldName]: 'File not found. Please upload again'
            }));
            return;
        }

        uploadFile(fieldName, file);
    };

    const onFileRemove = (fieldName: string) => {
        updateForm({ [fieldName]: '' });
        updateFieldErrorState({
            fieldName: fieldName as keyof CareerPageFormProps,
            fieldValue: ''
        });
    };

    const addSettings = () => {
        const { companyId, ...restForm } = form;
        addCareerPageSettings.mutate(
            {
                params: { companyId },
                requestBody: restForm
            },
            {
                onSuccess: () => {
                    showSuccess({
                        title: 'Success',
                        description: 'Successfully added settings!'
                    });
                },
                onError: ({ errors }) => {
                    showError({
                        title: 'Error',
                        description: errors.displayError
                    });
                }
            }
        );
    };

    const onSubmit = () => {
        const hasCompanyIdError = hasFormFieldError({
            fieldName: 'companyId',
            fieldValue: form.companyId,
            isRequired: true
        });

        if (hasCompanyIdError) {
            updateFieldErrorState({
                fieldName: 'companyId',
                fieldValue: form.companyId
            });
            return;
        }

        const { errorState, hasFormError } = getFormErrorData({
            form,
            requiredFields
        });

        setFormErrorState(prevErrorState => ({
            ...prevErrorState,
            ...errorState
        }));

        if (hasFormError) {
            return;
        }

        addSettings();
    };

    return (
        <Grid
            templateColumns={{ base: 'auto', md: '8fr 4fr' }}
            height={`calc(100vh - ${NAVBAR_HEIGHT})`}
            overflow={{ base: 'auto', md: 'unset' }}
        >
            {(isCompaniesLoading ||
                uploadCareerPageAsset.isLoading ||
                addCareerPageSettings.isLoading) && <AppLoader />}
            <LeftPanel>
                <FormWrapper
                    formTitle="Career Page Settings"
                    isFormDisabled={false}
                    isLoading={false}
                    onSubmit={onSubmit}
                >
                    <FormControl
                        isRequired
                        isInvalid={formErrorState.companyId}
                        isDisabled={addCareerPageSettings.isSuccess}
                    >
                        <FormLabel>Company Id</FormLabel>
                        <Select
                            placeholder="Select Company Id"
                            name="companyId"
                            onChange={onFormFieldChange}
                        >
                            {companiesResponse?.data.map(company => (
                                <option
                                    value={company.companyId}
                                    key={company.companyId}
                                >
                                    {company.companyId}
                                </option>
                            ))}
                        </Select>
                        <HelperText
                            hasError={formErrorState.companyId}
                            errorMsg={ErrorMsg.required()}
                        />
                    </FormControl>
                    <FormControl
                        isInvalid={formErrorState.primaryColor}
                        isRequired
                        isDisabled={
                            !form.companyId || addCareerPageSettings.isSuccess
                        }
                    >
                        <FormLabel>Primary Colour</FormLabel>
                        <Input
                            placeholder="Enter Primary Colour"
                            name="primaryColor"
                            value={form.primaryColor}
                            onChange={onFormFieldChange}
                        />
                        <HelperText
                            hasError={formErrorState.primaryColor}
                            errorMsg={ErrorMsg.hexColor()}
                        />
                    </FormControl>
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                        <FormControl
                            isInvalid={formErrorState.description}
                            isRequired
                            isDisabled={
                                !form.companyId ||
                                addCareerPageSettings.isSuccess
                            }
                        >
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                placeholder="Description"
                                name="description"
                                value={form.description}
                                onChange={onFormFieldChange}
                            />
                            <HelperText
                                hasError={formErrorState.description}
                                errorMsg={ErrorMsg.characterLength({
                                    max: 300
                                })}
                            />
                        </FormControl>
                    </GridItem>
                    <FormControl
                        isRequired
                        isInvalid={
                            formErrorState.logo1 || !!formErrorValue.logo1
                        }
                        isDisabled={
                            !form.companyId || addCareerPageSettings.isSuccess
                        }
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <FormLabel flexGrow={1} sx={{ mb: 0 }}>
                                Logo 1
                            </FormLabel>
                            <UploadButton
                                title="UPLOAD"
                                name="logo1"
                                value={form.logo1}
                                acceptFileType={allowedImageExtensions}
                                isDisabled={!form.companyId}
                                onChange={onFileUpload}
                                onRemove={onFileRemove}
                            />
                        </Flex>
                        <HelperText
                            hasError={
                                formErrorState.logo1 || !!formErrorValue.logo1
                            }
                            errorMsg={
                                formErrorValue.logo1 || ErrorMsg.required()
                            }
                        />
                    </FormControl>
                    <FormControl
                        isInvalid={
                            formErrorState.logo2 || !!formErrorValue.logo2
                        }
                        isDisabled={
                            !form.companyId || addCareerPageSettings.isSuccess
                        }
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <FormLabel flexGrow={1} sx={{ mb: 0 }}>
                                Logo 2
                            </FormLabel>
                            <UploadButton
                                title="UPLOAD"
                                name="logo2"
                                value={form.logo2 ?? ''}
                                acceptFileType={allowedImageExtensions}
                                isDisabled={
                                    !form.companyId ||
                                    addCareerPageSettings.isSuccess
                                }
                                onChange={onFileUpload}
                                onRemove={onFileRemove}
                            />
                        </Flex>
                        <HelperText
                            hasError={
                                formErrorState.logo2 || !!formErrorValue.logo2
                            }
                            errorMsg={formErrorValue.logo2}
                        />
                    </FormControl>
                    <FormControl
                        isRequired
                        isInvalid={
                            formErrorState.bannerImg ||
                            !!formErrorValue.bannerImg
                        }
                        isDisabled={
                            !form.companyId || addCareerPageSettings.isSuccess
                        }
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <FormLabel flexGrow={1} sx={{ mb: 0 }}>
                                Banner Image
                            </FormLabel>
                            <UploadButton
                                title="UPLOAD"
                                name="bannerImg"
                                value={form.bannerImg}
                                acceptFileType={allowedImageExtensions}
                                isDisabled={
                                    !form.companyId ||
                                    addCareerPageSettings.isSuccess
                                }
                                onChange={onFileUpload}
                                onRemove={onFileRemove}
                            />
                        </Flex>
                        <HelperText
                            hasError={
                                formErrorState.bannerImg ||
                                !!formErrorValue.bannerImg
                            }
                            errorMsg={
                                formErrorValue.bannerImg || ErrorMsg.required()
                            }
                        />
                    </FormControl>
                </FormWrapper>
            </LeftPanel>
            <RightPanel>
                <Accordion allowToggle height="100%" defaultIndex={0}>
                    <AccordionItem>
                        <AccordionButton>
                            <Text as="span" flex="1" textAlign="left">
                                PREVIEW
                            </Text>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel>
                            <CareerPagePreview
                                logo1={form.logo1}
                                logo2={form.logo2 || ''}
                                bannerImg={form.bannerImg}
                                primaryColor={form.primaryColor}
                                description={form.description}
                                companyName={companyName}
                            />
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </RightPanel>
        </Grid>
    );
};
