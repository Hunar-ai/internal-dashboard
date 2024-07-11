import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Flex, FormControl, FormLabel, Grid } from '@chakra-ui/react';

import {
    AppLoader,
    FormWrapper,
    HelperText,
    LeftPanel,
    RightPanel,
    SelectField,
    TextAreaField,
    TextField,
    UploadButton
} from '@components/common';
import { CompanyCareerPagePreview } from './CompanyCareerPagePreview';

import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useUploadCareerPageAsset } from 'hooks/apiHooks/careerPage/useUploadCareerPageAsset';
import { useAddCareerPageSettings } from 'hooks/apiHooks/careerPage/useAddCareerPageSettings';
import { useToast } from 'hooks/useToast';
import { useValidationHelper } from 'hooks';

import type {
    CareerPageFormProps,
    FormErrorProps,
    OptionsProps
} from 'interfaces';
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

    const searchParamCompanyId = React.useMemo(
        () => searchParams.get('companyId'),
        [searchParams]
    );

    const companyIdOptions: OptionsProps = React.useMemo(() => {
        return (
            companiesResponse?.data.map(company => ({
                value: company.companyId,
                label: company.companyId
            })) ?? []
        );
    }, [companiesResponse?.data]);

    React.useEffect(() => {
        if (searchParamCompanyId) {
            updateForm({ companyId: searchParamCompanyId });
        }
    }, [searchParamCompanyId]);

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

    const getFormErrorState = () => {
        const hasCompanyIdError = hasFormFieldError({
            fieldName: 'companyId',
            fieldValue: form.companyId,
            isRequired: true
        });

        const { errorState: formErrorState, hasFormError } = getFormErrorData({
            form,
            requiredFields
        });

        return { hasCompanyIdError, formErrorState, hasFormError };
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

    const saveFile = async (file: File) => {
        return await uploadCareerPageAsset.mutateAsync({
            params: { companyId: form.companyId },
            requestBody: { file }
        });
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

        saveFile(file)
            .then(({ assetUrl }) => {
                updateForm({ [fieldName]: assetUrl });
                updateFieldErrorState({ fieldName, fieldValue: assetUrl });
                setUploadErrorMap(prevErrorValue => ({
                    ...prevErrorValue,
                    [fieldName]: ''
                }));
            })
            .catch(({ errors }) => {
                setFormErrorState(prevErrorState => ({
                    ...prevErrorState,
                    [fieldName]: true
                }));
                setUploadErrorMap(prevErrorValue => ({
                    ...prevErrorValue,
                    [fieldName]: errors.displayError
                }));
            });
    };

    const onFileRemove = (fieldName: string) => {
        updateForm({ [fieldName]: '' });
        updateFieldErrorState({
            fieldName: fieldName as keyof CareerPageFormProps,
            fieldValue: ''
        });
    };

    const submitSettings = async () => {
        const { companyId, ...restForm } = form;
        return await addCareerPageSettings.mutateAsync({
            params: { companyId },
            requestBody: restForm
        });
    };

    const onSubmit = () => {
        const { hasCompanyIdError, formErrorState, hasFormError } =
            getFormErrorState();

        if (hasCompanyIdError) {
            updateFieldErrorState({
                fieldName: 'companyId',
                fieldValue: form.companyId
            });
            return;
        }

        setFormErrorState(prevErrorState => ({
            ...prevErrorState,
            ...formErrorState
        }));

        if (hasFormError) {
            return;
        }

        submitSettings()
            .then(() => {
                showSuccess({
                    title: 'Success',
                    description: 'Successfully added settings!'
                });
            })
            .catch(({ errors }) => {
                showError({
                    title: 'Error',
                    description: errors.displayError
                });
            });
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
                    <SelectField
                        label="Company Id"
                        name="companyId"
                        placeholder="Select Company Id"
                        options={companyIdOptions}
                        value={form.companyId}
                        onChange={onFormFieldChange}
                        isRequired
                        isInvalid={formErrorState.companyId}
                        isDisabled={searchParams.has('companyId')}
                        helperText={
                            <HelperText
                                hasError={formErrorState.companyId}
                                errorMsg={ErrorMsg.required()}
                            />
                        }
                    />
                    <TextField
                        label="Company Name"
                        name="companyName"
                        placeholder="Enter Company Name"
                        value={form.companyName}
                        onChange={onFormFieldChange}
                        isRequired
                        isDisabled={!form.companyId}
                        isInvalid={formErrorState.companyName}
                        helperText={
                            <HelperText
                                hasError={formErrorState.companyName}
                                errorMsg={ErrorMsg.alphaNumeric()}
                            />
                        }
                    />
                    <TextField
                        label="Primary Color"
                        name="primaryColor"
                        placeholder="Enter Primary Color"
                        value={form.primaryColor}
                        onChange={onFormFieldChange}
                        isRequired
                        isInvalid={formErrorState.primaryColor}
                        isDisabled={!form.companyId}
                        helperText={
                            <HelperText
                                hasError={formErrorState.primaryColor}
                                errorMsg={ErrorMsg.hexColor()}
                            />
                        }
                    />
                    <TextField
                        label="Banner Text Color"
                        name="bannerTextColor"
                        placeholder="Enter Banner Text Color"
                        value={form.bannerTextColor}
                        onChange={onFormFieldChange}
                        isRequired
                        isInvalid={formErrorState.bannerTextColor}
                        isDisabled={!form.companyId}
                        helperText={
                            <HelperText
                                hasError={formErrorState.bannerTextColor}
                                errorMsg={ErrorMsg.hexColor()}
                            />
                        }
                    />
                    <TextField
                        label="Learn More Link"
                        name="learnMoreLink"
                        placeholder="Enter Learn More Link"
                        value={form.learnMoreLink}
                        onChange={onFormFieldChange}
                        isRequired
                        isInvalid={formErrorState.learnMoreLink}
                        isDisabled={!form.companyId}
                        helperText={
                            <HelperText
                                hasError={formErrorState.learnMoreLink}
                                errorMsg={ErrorMsg.url()}
                            />
                        }
                    />
                    <TextAreaField
                        label="Description"
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={onFormFieldChange}
                        isRequired
                        isInvalid={formErrorState.description}
                        isDisabled={!form.companyId}
                        helperText={
                            <HelperText
                                hasError={formErrorState.description}
                                errorMsg={ErrorMsg.characterLength({
                                    max: 300
                                })}
                            />
                        }
                    />
                    <FormControl
                        isRequired
                        isInvalid={
                            formErrorState.primaryLogo ||
                            !!uploadErrorMap.primaryLogo
                        }
                        isDisabled={!form.companyId}
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <FormLabel flexGrow={1} sx={{ mb: 0 }}>
                                {`Logo 1`}
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
                        isDisabled={!form.companyId}
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <FormLabel flexGrow={1} sx={{ mb: 0 }}>
                                {`Logo 2`}
                            </FormLabel>
                            <UploadButton
                                title="UPLOAD"
                                name="secondaryLogo"
                                value={form.secondaryLogo ?? ''}
                                acceptFileType={allowedImageExtensions}
                                isDisabled={!form.companyId}
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
                        isDisabled={!form.companyId}
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <FormLabel flexGrow={1} sx={{ mb: 0 }}>
                                {`Banner Image`}
                            </FormLabel>
                            <UploadButton
                                title="UPLOAD"
                                name="bannerImg"
                                value={form.bannerImg}
                                acceptFileType={allowedImageExtensions}
                                isDisabled={!form.companyId}
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
                <CompanyCareerPagePreview
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
