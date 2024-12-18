import React from 'react';

import _ from 'lodash';

import { Button, Text, GridItem } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import {
    AppLoader,
    FormWrapper,
    HelperText,
    SelectField
} from '@components/common';
import { ChecklistQuestionList } from './ChecklistQuestionList';
import { useCompanyHelper } from '@components/company/useCompanyHelper';

import { useToast } from 'hooks/useToast';
import { useValidationHelper } from 'hooks';
import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useSaveChecklist } from 'hooks/apiHooks/useSaveChecklist';

import { ErrorMsg } from 'utils';
import { ChecklistFormProps, FormErrorStateProps } from 'interfaces';

const MAX_CHECKLIST_QUESTION = 15;

export const ChecklistEditForm = () => {
    const { showError, showSuccess } = useToast();
    const { getStandardFieldValidity } = useValidationHelper();
    const saveChecklist = useSaveChecklist();

    const [companyId, setCompanyId] = React.useState('');
    const [checklistForm, setChecklistForm] =
        React.useState<ChecklistFormProps>({});
    const [checklistFormErrorState, setChecklistFormErrorState] =
        React.useState<FormErrorStateProps>({});
    const [hasCompanyIdError, setHasCompanyIdError] = React.useState(false);

    const { data: companiesResponse, isLoading: isCompaniesLoading } =
        useGetCompanies();
    const { companyIdOptions, companyMap } = useCompanyHelper(
        companiesResponse?.data
    );

    const isAddDisabled =
        Object.keys(checklistForm).length >= MAX_CHECKLIST_QUESTION;

    const getFormErrorState = () => {
        let hasFormError = false;
        const modifiedFormErrorState = Object.values(checklistForm).reduce(
            (errorState, question) => {
                const { errorMsg, hasError } = getStandardFieldValidity(
                    checklistForm[question.key].question,
                    true,
                    { max: 200 }
                );

                if (hasError) {
                    hasFormError = true;
                }

                return {
                    ...errorState,
                    [question.key]: { error: hasError, errorMsg }
                };
            },
            {} as FormErrorStateProps
        );

        return {
            hasFormError,
            modifiedFormErrorState
        };
    };

    const onQuestionAddClick = () => {
        const checklistQuestionCount = Object.keys(checklistForm).length;
        const newKey = `q_${checklistQuestionCount + 1}`;
        setChecklistForm({
            ...checklistForm,
            [newKey]: { key: newKey, question: '' }
        });
    };

    const onQuestionDeleteClick = (key: string) => {
        const modifiedChecklistForm = { ...checklistForm };
        delete modifiedChecklistForm[key];
        setChecklistForm(modifiedChecklistForm);
    };

    const onQuestionFieldChange = ({
        target: { value, name }
    }: React.ChangeEvent<HTMLInputElement>) => {
        const modifiedChecklistForm: ChecklistFormProps = {
            ...checklistForm,
            [name]: { key: name, question: value }
        };
        setChecklistForm(modifiedChecklistForm);

        const { hasError, errorMsg } = getStandardFieldValidity(value, true, {
            max: 200
        });
        setChecklistFormErrorState(prevErrorState => ({
            ...prevErrorState,
            [name]: { error: hasError, errorMsg }
        }));
    };

    const onCompanyIdChange = ({
        target: { value }
    }: React.ChangeEvent<HTMLSelectElement>) => {
        const selectionChecklist =
            companyMap[value]?.settings.dashboardSettings?.selectionChecklist ??
            [];
        let modifiedChecklistForm = {} as ChecklistFormProps;

        if (selectionChecklist.length) {
            modifiedChecklistForm = selectionChecklist.reduce(
                (form, checklistField) => {
                    return { ...form, [checklistField.key]: checklistField };
                },
                {} as ChecklistFormProps
            );
        } else {
            modifiedChecklistForm = { ['q_1']: { key: 'q_1', question: '' } };
        }

        setChecklistForm(modifiedChecklistForm);
        setCompanyId(value);
        setHasCompanyIdError(!value);
    };

    const submitChecklist = () => {
        const selectionChecklist = _.sortBy(Object.values(checklistForm), [
            'key'
        ]);

        saveChecklist.mutate(
            {
                params: { companyId },
                requestBody: { selectionChecklist }
            },
            {
                onSuccess: () => {
                    showSuccess({
                        title: 'Success',
                        description: 'Successfully saved Selection Checklist!'
                    });
                },
                onError: error => {
                    showError({
                        title: 'Error',
                        description: error.errors.displayError
                    });
                }
            }
        );
    };

    const onSubmitClick = () => {
        if (!companyId) {
            setHasCompanyIdError(true);
            return;
        }

        const { hasFormError, modifiedFormErrorState } = getFormErrorState();
        setChecklistFormErrorState(modifiedFormErrorState);

        if (hasFormError) {
            return;
        }

        submitChecklist();
    };

    return (
        <FormWrapper
            formTitle="Selection Checklist Settings"
            isFormDisabled={saveChecklist.isSuccess}
            isLoading={saveChecklist.isLoading}
            onSubmit={onSubmitClick}
            gridColumns={1}
            width={{ base: 'xl', lg: '60%' }}
        >
            {(isCompaniesLoading || saveChecklist.isLoading) && <AppLoader />}
            <SelectField
                label="Company Id"
                name="companyId"
                placeholder="Select Company Id"
                options={companyIdOptions}
                value={companyId}
                onChange={onCompanyIdChange}
                isRequired
                isInvalid={hasCompanyIdError}
                helperText={
                    <HelperText
                        hasError={hasCompanyIdError}
                        errorMsg={ErrorMsg.required()}
                    />
                }
            />
            {companyId && (
                <>
                    <Text
                        fontWeight={600}
                    >{`Selection Checklist Questions`}</Text>
                    <ChecklistQuestionList
                        checklistForm={checklistForm}
                        checklistFormErrorState={checklistFormErrorState}
                        onQuestionChange={onQuestionFieldChange}
                        onQuestionDelete={onQuestionDeleteClick}
                    />
                    <GridItem>
                        <Button
                            leftIcon={<AddIcon />}
                            variant="outline"
                            colorScheme="blue"
                            onClick={onQuestionAddClick}
                            isDisabled={isAddDisabled}
                            isLoading={saveChecklist.isLoading}
                        >
                            {'ADD QUESTION'}
                        </Button>
                    </GridItem>
                </>
            )}
        </FormWrapper>
    );
};

export default ChecklistEditForm;
