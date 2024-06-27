import React from 'react';
import { useSearchParams } from 'react-router-dom';

import {
    Flex,
    FormControl,
    FormLabel,
    Grid,
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
import { CareerPagePreview } from './CareerPagePreview';

import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useUploadCareerPageAsset } from 'hooks/apiHooks/careerPage/useUploadCareerPageAsset';
import { useAddCareerPageSettings } from 'hooks/apiHooks/careerPage/useAddCareerPageSettings';
import { useToast } from 'hooks/useToast';
import { useValidationHelper } from 'hooks';

import type { CareerPageFormProps, FormErrorProps } from 'interfaces';
import { ALLOWED_EXTENSION } from 'Enum';
import { ErrorMsg, RegExUtil, StringUtils } from 'utils';
import { NAVBAR_HEIGHT } from 'Constants';

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
    companyName: (companyName: string) => RegExUtil.isName(companyName),
    bannerTextColor: (bannerTextColor: string) =>
        RegExUtil.isHexColor(bannerTextColor),
    learnMoreLink: (learnMoreLink: string) => StringUtils.isUrl(learnMoreLink),
    primaryColor: (primaryColor: string) => RegExUtil.isHexColor(primaryColor),
    description: (description: string) =>
        RegExUtil.isDescription(description, 300)
};

const requiredFields: (keyof CareerPageFormProps)[] = [
    'companyId',
    'companyName',
    'primaryColor',
    'bannerTextColor',
    'learnMoreLink',
    'description',
    'primaryLogo',
    'bannerImg'
];

const formInitialState: CareerPageFormProps = {
    companyId: '',
    primaryLogo: '',
    secondaryLogo: '',
    bannerImg: '',
    companyName: '',
    primaryColor: '',
    bannerTextColor: '',
    learnMoreLink: '',
    description: ''
};

const formErrorStateInitialValues: FormErrorProps<CareerPageFormProps> = {
    companyId: false,
    primaryLogo: false,
    secondaryLogo: false,
    bannerImg: false,
    companyName: false,
    primaryColor: false,
    bannerTextColor: false,
    learnMoreLink: false,
    description: false
};

const uploadErrorMapInitialState: Pick<
    CareerPageFormProps,
    'bannerImg' | 'primaryLogo' | 'secondaryLogo'
> = {
    primaryLogo: '',
    secondaryLogo: '',
    bannerImg: ''
};

export const CompanyCareerPageForm = () => {
    const { showError, showSuccess } = useToast();
    const uploadCareerPageAsset = useUploadCareerPageAsset();
    const addCareerPageSettings = useAddCareerPageSettings();
    const [searchParams] = useSearchParams();
    const { hasFormFieldError, getFormErrorData } =
        useValidationHelper(validationMap);

    const [form, setForm] = React.useState<CareerPageFormProps>({
        ...formInitialState
    });
    const [formErrorState, setFormErrorState] = React.useState({
        ...formErrorStateInitialValues
    });
    const [uploadErrorMap, setUploadErrorMap] = React.useState({
        ...uploadErrorMapInitialState
    });

    const { data: companiesResponse, isLoading: isCompaniesLoading } =
        useGetCompanies();

    React.useEffect(() => {
        const companyId = searchParams.get('companyId');
        if (companyId) {
            updateForm({ companyId });
        }
    }, [searchParams]);

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
                    setUploadErrorMap(prevErrorValue => ({
                        ...prevErrorValue,
                        [fieldName]: ''
                    }));
                },
                onError: ({ errors }) => {
                    setFormErrorState(prevErrorState => ({
                        ...prevErrorState,
                        [fieldName]: true
                    }));
                    setUploadErrorMap(prevErrorValue => ({
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
            setUploadErrorMap(prevErrorValue => ({
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
                    isFormDisabled={addCareerPageSettings.isSuccess}
                    isLoading={addCareerPageSettings.isLoading}
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
                            isDisabled={searchParams.has('companyId')}
                            value={form.companyId}
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
                        isInvalid={formErrorState.companyName}
                        isRequired
                        isDisabled={
                            !form.companyId || addCareerPageSettings.isSuccess
                        }
                    >
                        <FormLabel>Company Name</FormLabel>
                        <Input
                            placeholder="Enter Company Name"
                            name="companyName"
                            value={form.companyName}
                            onChange={onFormFieldChange}
                        />
                        <HelperText
                            hasError={formErrorState.companyName}
                            errorMsg={ErrorMsg.alphaNumeric()}
                        />
                    </FormControl>
                    <FormControl
                        isInvalid={formErrorState.primaryColor}
                        isRequired
                        isDisabled={
                            !form.companyId || addCareerPageSettings.isSuccess
                        }
                    >
                        <FormLabel>Primary Color</FormLabel>
                        <Input
                            placeholder="Enter Primary Color"
                            name="primaryColor"
                            value={form.primaryColor}
                            onChange={onFormFieldChange}
                        />
                        <HelperText
                            hasError={formErrorState.primaryColor}
                            errorMsg={ErrorMsg.hexColor()}
                        />
                    </FormControl>
                    <FormControl
                        isInvalid={formErrorState.bannerTextColor}
                        isRequired
                        isDisabled={
                            !form.companyId || addCareerPageSettings.isSuccess
                        }
                    >
                        <FormLabel>Banner Text Color</FormLabel>
                        <Input
                            placeholder="Enter Banner Text Color"
                            name="bannerTextColor"
                            value={form.bannerTextColor}
                            onChange={onFormFieldChange}
                        />
                        <HelperText
                            hasError={formErrorState.bannerTextColor}
                            errorMsg={ErrorMsg.hexColor()}
                        />
                    </FormControl>
                    <FormControl
                        isInvalid={formErrorState.learnMoreLink}
                        isRequired
                        isDisabled={
                            !form.companyId || addCareerPageSettings.isSuccess
                        }
                    >
                        <FormLabel>Learn More Link</FormLabel>
                        <Input
                            placeholder="Enter Learn More Link"
                            name="learnMoreLink"
                            value={form.learnMoreLink}
                            onChange={onFormFieldChange}
                        />
                        <HelperText
                            hasError={formErrorState.learnMoreLink}
                            errorMsg={ErrorMsg.url()}
                        />
                    </FormControl>
                    <FormControl
                        isInvalid={formErrorState.description}
                        isRequired
                        isDisabled={
                            !form.companyId || addCareerPageSettings.isSuccess
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
                    <FormControl
                        isRequired
                        isInvalid={
                            formErrorState.primaryLogo ||
                            !!uploadErrorMap.primaryLogo
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
                                name="primaryLogo"
                                value={form.primaryLogo}
                                acceptFileType={allowedImageExtensions}
                                isDisabled={!form.companyId}
                                onChange={onFileUpload}
                                onRemove={onFileRemove}
                            />
                        </Flex>
                        <HelperText
                            hasError={
                                formErrorState.primaryLogo ||
                                !!uploadErrorMap.primaryLogo
                            }
                            errorMsg={
                                uploadErrorMap.primaryLogo ||
                                ErrorMsg.required()
                            }
                        />
                    </FormControl>
                    <FormControl
                        isInvalid={
                            formErrorState.secondaryLogo ||
                            !!uploadErrorMap.secondaryLogo
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
                                name="secondaryLogo"
                                value={form.secondaryLogo ?? ''}
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
                                formErrorState.secondaryLogo ||
                                !!uploadErrorMap.secondaryLogo
                            }
                            errorMsg={uploadErrorMap.secondaryLogo}
                        />
                    </FormControl>
                    <FormControl
                        isRequired
                        isInvalid={
                            formErrorState.bannerImg ||
                            !!uploadErrorMap.bannerImg
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
                                !!uploadErrorMap.bannerImg
                            }
                            errorMsg={
                                uploadErrorMap.bannerImg || ErrorMsg.required()
                            }
                        />
                    </FormControl>
                </FormWrapper>
            </LeftPanel>
            <RightPanel>
                <CareerPagePreview
                    primaryLogo={form.primaryLogo}
                    secondaryLogo={form.secondaryLogo || ''}
                    bannerImg={form.bannerImg}
                    primaryColor={form.primaryColor}
                    description={form.description}
                    companyName={form.companyName}
                    learnMoreLink={form.learnMoreLink}
                    bannerTextColor={form.bannerTextColor}
                />
            </RightPanel>
        </Grid>
    );
};
