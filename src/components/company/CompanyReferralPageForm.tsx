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
    TextField,
    UploadButton
} from '@components/common';
import { CompanyBrandedPagePreview } from './CompanyBrandedPagePreview';

import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useAddReferralPageSettings } from 'hooks/apiHooks/referralPage/useAddReferralPageSettings';
import { useUploadReferralPageAsset } from 'hooks/apiHooks/referralPage/useUploadReferralPageAsset';
import { useToast } from 'hooks/useToast';
import { useValidationHelper } from 'hooks';

import type {
    ReferralPageFormProps,
    FormErrorProps,
    OptionsProps
} from 'interfaces';
import { ErrorMsg, RegExUtil, StringUtils } from 'utils';
import { ALLOWED_IMAGE_EXTENSIONS, NAVBAR_HEIGHT } from 'Constants';

interface UpdateFieldErrorStateProps {
    fieldName: keyof ReferralPageFormProps;
    fieldValue: string;
}

const validationMap = {
    companyName: (companyName: string) =>
        RegExUtil.isDescription(companyName, 100),
    bannerTextColor: (bannerTextColor: string) =>
        RegExUtil.isHexColor(bannerTextColor),
    bannerBgColor: (bannerBgColor: string) =>
        RegExUtil.isHexColor(bannerBgColor),
    learnMoreLink: (learnMoreLink: string) => StringUtils.isUrl(learnMoreLink),
    primaryColor: (primaryColor: string) => RegExUtil.isHexColor(primaryColor)
};

const requiredFields: (keyof ReferralPageFormProps)[] = [
    'companyId',
    'companyName',
    'primaryColor',
    'bannerTextColor',
    'learnMoreLink',
    'logo',
    'bannerBgColor'
];

const formInitialState: ReferralPageFormProps = {
    companyId: '',
    logo: '',
    bannerBgColor: '',
    companyName: '',
    primaryColor: '',
    bannerTextColor: '',
    learnMoreLink: ''
};

const formErrorStateInitialValues: FormErrorProps<ReferralPageFormProps> = {
    companyId: false,
    logo: false,
    bannerBgColor: false,
    companyName: false,
    primaryColor: false,
    bannerTextColor: false,
    learnMoreLink: false
};

const uploadErrorMapInitialState: Pick<ReferralPageFormProps, 'logo'> = {
    logo: ''
};

export const CompanyReferralPageForm = () => {
    const { showError, showSuccess } = useToast();
    const uploadReferralPageAsset = useUploadReferralPageAsset();
    const addReferralPageSettings = useAddReferralPageSettings();
    const [searchParams] = useSearchParams();
    const { hasFormFieldError, getFormErrorData } =
        useValidationHelper(validationMap);

    const [form, setForm] = React.useState<ReferralPageFormProps>({
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

    const updateForm = (modifiedForm: Partial<ReferralPageFormProps>) => {
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
        const fieldName = e.target.name as keyof ReferralPageFormProps;
        const fieldValue = e.target.value;

        updateForm({ [fieldName]: fieldValue });
        updateFieldErrorState({ fieldName, fieldValue });
    };

    const saveFile = (fieldName: keyof ReferralPageFormProps, file: File) => {
        uploadReferralPageAsset.mutate(
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
        const fieldName = event.target.name as keyof ReferralPageFormProps;
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
            fieldName: fieldName as keyof ReferralPageFormProps,
            fieldValue: ''
        });
    };

    const submitSettings = () => {
        const { companyId, ...restForm } = form;
        addReferralPageSettings.mutate(
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

        submitSettings();
    };

    return (
        <Grid
            templateColumns={{ base: 'auto', md: '8fr 4fr' }}
            height={`calc(100vh - ${NAVBAR_HEIGHT})`}
            overflow={{ base: 'auto', md: 'unset' }}
        >
            {(isCompaniesLoading ||
                uploadReferralPageAsset.isLoading ||
                addReferralPageSettings.isLoading) && <AppLoader />}
            <LeftPanel>
                <FormWrapper
                    formTitle="Referral Page Settings"
                    isFormDisabled={addReferralPageSettings.isSuccess}
                    isLoading={addReferralPageSettings.isLoading}
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
                        placeholder="#FFFFFF"
                        value={form.bannerBgColor}
                        onChange={onFormFieldChange}
                        isRequired
                        isInvalid={formErrorState.bannerBgColor}
                        isDisabled={!form.companyId}
                        helperText={
                            <HelperText
                                hasError={formErrorState.bannerBgColor}
                                errorMsg={ErrorMsg.hexColor()}
                                msg="E.g. #FFFFFF"
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
                    <FormControl
                        isRequired
                        isInvalid={formErrorState.logo || !!uploadErrorMap.logo}
                        isDisabled={!form.companyId}
                    >
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <FormLabel flexGrow={1} sx={{ mb: 0 }}>
                                {`Logo`}
                            </FormLabel>
                            <UploadButton
                                title="UPLOAD"
                                name="logo"
                                value={form.logo}
                                acceptFileType={ALLOWED_IMAGE_EXTENSIONS}
                                isDisabled={!form.companyId}
                                onChange={onFileUpload}
                                onRemove={onFileRemove}
                            />
                        </Flex>
                        <HelperText
                            hasError={
                                formErrorState.logo || !!uploadErrorMap.logo
                            }
                            errorMsg={
                                uploadErrorMap.logo || ErrorMsg.required()
                            }
                            msg={'Dimension: 128x60px'}
                        />
                    </FormControl>
                </FormWrapper>
            </LeftPanel>
            <RightPanel>
                <CompanyBrandedPagePreview
                    primaryLogo={form.logo}
                    bannerBgColor={form.bannerBgColor}
                    primaryColor={form.primaryColor}
                    companyName={form.companyName}
                    bannerTextColor={form.bannerTextColor}
                />
            </RightPanel>
        </Grid>
    );
};
