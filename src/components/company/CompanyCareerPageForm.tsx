import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Flex, FormControl, FormLabel, Grid, GridItem } from '@chakra-ui/react';

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
import { CompanyBrandedPagePreview } from './CompanyBrandedPagePreview';
import { ReferralPageSetupDialog } from './ReferralPageSetupDialog';

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
import { ErrorMsg, RegExUtil, StringUtils } from 'utils';
import { ALLOWED_IMAGE_EXTENSIONS, NAVBAR_HEIGHT } from 'Constants';

interface UpdateFieldErrorStateProps {
    fieldName: keyof CareerPageFormProps;
    fieldValue: string;
}

const validationMap = {
    companyName: (companyName: string) =>
        RegExUtil.isDescription(companyName, 100),
    bannerTextColor: (bannerTextColor: string) =>
        RegExUtil.isHexColor(bannerTextColor),
    bannerBgColor: (bannerTextColor: string) =>
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
    'bannerBgColor'
];

const formInitialState: CareerPageFormProps = {
    companyId: '',
    primaryLogo: '',
    secondaryLogo: '',
    bannerBgColor: '',
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
    bannerBgColor: false,
    companyName: false,
    primaryColor: false,
    bannerTextColor: false,
    learnMoreLink: false,
    description: false
};

const uploadErrorMapInitialState: Pick<
    CareerPageFormProps,
    'primaryLogo' | 'secondaryLogo'
> = {
    primaryLogo: '',
    secondaryLogo: ''
};

export const CompanyCareerPageForm = () => {
    const { showError, showSuccess } = useToast();
    const uploadCareerPageAsset = useUploadCareerPageAsset();
    const addCareerPageSettings = useAddCareerPageSettings();
    const [searchParams, setSearchParams] = useSearchParams();
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
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

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

    const saveFile = (fieldName: keyof CareerPageFormProps, file: File) => {
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

        saveFile(fieldName, file);
    };

    const onFileRemove = (fieldName: string) => {
        updateForm({ [fieldName]: '' });
        updateFieldErrorState({
            fieldName: fieldName as keyof CareerPageFormProps,
            fieldValue: ''
        });
    };

    const submitSettings = () => {
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
                    setIsDialogOpen(true);
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

        submitSettings();
    };

    const onReferralSetupProceedClick = () => {
        searchParams.delete('career');
        searchParams.set('referral', 'true');
        searchParams.set('companyId', form.companyId);
        setSearchParams(searchParams);
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
                                errorMsg={ErrorMsg.characterLength({
                                    max: 100
                                })}
                            />
                        }
                    />
                    <TextField
                        label="Primary Color"
                        name="primaryColor"
                        placeholder="#97262A"
                        value={form.primaryColor}
                        onChange={onFormFieldChange}
                        isRequired
                        isInvalid={formErrorState.primaryColor}
                        isDisabled={!form.companyId}
                        helperText={
                            <HelperText
                                hasError={formErrorState.primaryColor}
                                errorMsg={ErrorMsg.hexColor()}
                                msg="E.g. #97262A"
                            />
                        }
                    />
                    <TextField
                        label="Banner BG Color"
                        name="bannerBgColor"
                        placeholder="#97262A"
                        value={form.bannerBgColor}
                        onChange={onFormFieldChange}
                        isRequired
                        isInvalid={formErrorState.bannerBgColor}
                        isDisabled={!form.companyId}
                        helperText={
                            <HelperText
                                hasError={formErrorState.bannerBgColor}
                                errorMsg={ErrorMsg.hexColor()}
                                msg="E.g. #97262A"
                            />
                        }
                    />
                    <TextField
                        label="Banner Text Color"
                        name="bannerTextColor"
                        placeholder="#FFFFFF"
                        value={form.bannerTextColor}
                        onChange={onFormFieldChange}
                        isRequired
                        isInvalid={formErrorState.bannerTextColor}
                        isDisabled={!form.companyId}
                        helperText={
                            <HelperText
                                hasError={formErrorState.bannerTextColor}
                                errorMsg={ErrorMsg.hexColor()}
                                msg="E.g. #FFFFFF"
                            />
                        }
                    />
                    <TextField
                        label="Learn More Link"
                        name="learnMoreLink"
                        placeholder="https://en.wikipedia.org"
                        value={form.learnMoreLink}
                        onChange={onFormFieldChange}
                        isRequired
                        isInvalid={formErrorState.learnMoreLink}
                        isDisabled={!form.companyId}
                        helperText={
                            <HelperText
                                hasError={formErrorState.learnMoreLink}
                                errorMsg={ErrorMsg.url()}
                                msg="E.g. https://en.wikipedia.org"
                            />
                        }
                    />
                    <GridItem colSpan={{ base: 1, md: 2 }}>
                        <TextAreaField
                            label="Description"
                            name="description"
                            placeholder="Description"
                            value={form.description}
                            onChange={onFormFieldChange}
                            isRequired
                            isInvalid={formErrorState.description}
                            isDisabled={!form.companyId}
                            maxLength={300}
                            helperText={
                                <HelperText
                                    hasError={formErrorState.description}
                                    errorMsg={ErrorMsg.characterLength({
                                        max: 300
                                    })}
                                />
                            }
                        />
                    </GridItem>
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
                                acceptFileType={ALLOWED_IMAGE_EXTENSIONS}
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
                            msg={'Dimension: 128x60px'}
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
                                acceptFileType={ALLOWED_IMAGE_EXTENSIONS}
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
                            msg={'Dimension: 128x60px'}
                        />
                    </FormControl>
                </FormWrapper>
            </LeftPanel>
            <RightPanel>
                <CompanyBrandedPagePreview
                    primaryLogo={form.primaryLogo}
                    secondaryLogo={form.secondaryLogo || ''}
                    bannerBgColor={form.bannerBgColor}
                    primaryColor={form.primaryColor}
                    description={form.description}
                    companyName={form.companyName}
                    learnMoreLink={form.learnMoreLink}
                    bannerTextColor={form.bannerTextColor}
                />
            </RightPanel>
            <ReferralPageSetupDialog
                isOpen={isDialogOpen}
                onCloseClick={() => setIsDialogOpen(false)}
                onProceedClick={onReferralSetupProceedClick}
            />
        </Grid>
    );
};
