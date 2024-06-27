import React from 'react';

import {
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Input,
    Select,
    Textarea
} from '@chakra-ui/react';

import {
    FormWrapper,
    HelperText,
    LeftPanel,
    RightPanel,
    UploadButton
} from '@components/common';

import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useUploadCareerPageAsset } from 'hooks/apiHooks/careerPage/useUploadCareerPageAsset';

import type { CareerPageSettingsProps, FormErrorProps } from 'interfaces';
import { ALLOWED_EXTENSION } from 'Enum';
import { ErrorMsg } from 'utils';
import { NAVBAR_HEIGHT } from 'Constants';

type CareerPageFormProps = CareerPageSettingsProps;

const allowedImageExtensions = [
    ALLOWED_EXTENSION.PNG,
    ALLOWED_EXTENSION.JPG,
    ALLOWED_EXTENSION.JPEG
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
    const { data: companiesResponse } = useGetCompanies();

    const [companyId, setCompanyId] = React.useState('');
    const [form, setForm] = React.useState({ ...formInitialState });
    const [formErrorState, setFormErrorState] = React.useState({
        ...formErrorStateInitialValues
    });
    const [formErrorValue, setFormErrorValue] = React.useState({
        ...formErrorValueInitialState
    });

    const updateForm = (modifiedForm: Partial<CareerPageFormProps>) => {
        setForm(oldForm => ({ ...oldForm, ...modifiedForm }));
    };

    const onFormFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        updateForm({ [fieldName]: fieldValue });
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
            // TODO: show error here
            return;
        }

        uploadFile(fieldName, file);
    };

    const onFileRemove = (fieldName: string) => {
        updateForm({ [fieldName]: '' });
    };

    return (
        <Grid
            templateColumns={{ base: 'auto', md: '8fr 4fr' }}
            height={`calc(100vh - ${NAVBAR_HEIGHT})`}
            overflow={{ base: 'auto', md: 'unset' }}
        >
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
                    >
                        <FormLabel>Primary Colour</FormLabel>
                        {/* TODO: Add Input left addon of # */}
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
                                errorMsg={ErrorMsg.characterLength()}
                            />
                        </FormControl>
                    </GridItem>
                    <FormControl
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        isRequired
                    >
                        <FormLabel>Logo 1</FormLabel>
                        <UploadButton
                            title="UPLOAD"
                            name="logo1"
                            value={form.logo1}
                            acceptFileType={allowedImageExtensions}
                            onChange={onFileUpload}
                            onRemove={onFileRemove}
                        />
                        <HelperText
                            hasError={formErrorState.logo1}
                            errorMsg={formErrorValue.logo1}
                        />
                    </FormControl>
                    <FormControl
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <FormLabel>Logo 2</FormLabel>
                        <UploadButton
                            title="UPLOAD"
                            name="logo2"
                            value={form.logo2 ?? ''}
                            acceptFileType={allowedImageExtensions}
                            onChange={onFileUpload}
                            onRemove={onFileRemove}
                        />
                        <HelperText
                            hasError={formErrorState.logo2}
                            errorMsg={formErrorValue.logo2}
                        />
                    </FormControl>
                    <FormControl
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        isRequired
                    >
                        <FormLabel>Banner Image</FormLabel>
                        <UploadButton
                            title="UPLOAD"
                            name="bannerImg"
                            value={form.bannerImg}
                            acceptFileType={allowedImageExtensions}
                            onChange={onFileUpload}
                            onRemove={onFileRemove}
                        />
                        <HelperText
                            hasError={formErrorState.bannerImg}
                            errorMsg={formErrorValue.bannerImg}
                        />
                    </FormControl>
                </FormWrapper>
            </LeftPanel>
            <RightPanel>Preview Here</RightPanel>
        </Grid>
    );
};
