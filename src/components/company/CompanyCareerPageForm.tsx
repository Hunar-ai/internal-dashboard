import React from 'react';

import {
    Flex,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    Select,
    Textarea
} from '@chakra-ui/react';

import {
    AppLoader,
    FormWrapper,
    HelperText,
    LeftPanel,
    RightPanel,
    UploadButton
} from '@components/common';

import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useUploadCareerPageAsset } from 'hooks/apiHooks/careerPage/useUploadCareerPageAsset';
import { useValidationHelper } from 'hooks';

import type { CareerPageSettingsProps, FormErrorProps } from 'interfaces';
import { ALLOWED_EXTENSION } from 'Enum';
import { ErrorMsg, RegExUtil } from 'utils';
import { NAVBAR_HEIGHT } from 'Constants';

type CareerPageFormProps = CareerPageSettingsProps;

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
    'primaryColor',
    'description',
    'logo1',
    'bannerImg'
];

const formInitialState: CareerPageFormProps = {
    logo1: '',
    logo2: '',
    bannerImg: '',
    primaryColor: '',
    description: ''
};

const formErrorStateInitialValues: FormErrorProps<CareerPageFormProps> = {
    logo1: false,
    logo2: false,
    bannerImg: false,
    description: false,
    primaryColor: false
};

const formErrorValueInitialState: Record<keyof CareerPageFormProps, string> = {
    logo1: '',
    logo2: '',
    bannerImg: '',
    primaryColor: '',
    description: ''
};

export const CompanyCareerPageForm = () => {
    const uploadCareerPageAsset = useUploadCareerPageAsset();
    const { hasFormFieldError } = useValidationHelper(validationMap);
    const { data: companiesResponse, isLoading: isCompaniesLoading } =
        useGetCompanies();

    const [companyId, setCompanyId] = React.useState('');
    const [form, setForm] = React.useState<CareerPageFormProps>({
        ...formInitialState
    });
    const [formErrorState, setFormErrorState] = React.useState({
        ...formErrorStateInitialValues
    });
    const [formErrorValue, setFormErrorValue] = React.useState({
        ...formErrorValueInitialState
    });

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
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const fieldName = e.target.name as keyof CareerPageFormProps;
        const fieldValue = e.target.value;

        updateForm({ [fieldName]: fieldValue });
        updateFieldErrorState({ fieldName, fieldValue });
    };

    const uploadFile = (fieldName: keyof CareerPageFormProps, file: File) => {
        uploadCareerPageAsset.mutate(
            {
                params: { companyId },
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

    return (
        <Grid
            templateColumns={{ base: 'auto', md: '8fr 4fr' }}
            height={`calc(100vh - ${NAVBAR_HEIGHT})`}
            overflow={{ base: 'auto', md: 'unset' }}
        >
            {(isCompaniesLoading || uploadCareerPageAsset.isLoading) && (
                <AppLoader />
            )}
            <LeftPanel>
                <FormWrapper
                    formTitle="Career Page Settings"
                    isFormDisabled={false}
                    isLoading={false}
                    onSubmit={() => console.log('TODO')}
                >
                    <FormControl isRequired>
                        <FormLabel>Company Id</FormLabel>
                        <Select
                            placeholder="Select Company Id"
                            onChange={e => setCompanyId(e.target.value)}
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
                    </FormControl>
                    <FormControl
                        isInvalid={formErrorState.primaryColor}
                        isRequired
                        isDisabled={!companyId}
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
                            isDisabled={!companyId}
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
                        isDisabled={!companyId}
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
                                isDisabled={!companyId}
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
                        isDisabled={!companyId}
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
                                isDisabled={!companyId}
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
                        isDisabled={!companyId}
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
                                isDisabled={!companyId}
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
            <RightPanel>Preview Here</RightPanel>
        </Grid>
    );
};
