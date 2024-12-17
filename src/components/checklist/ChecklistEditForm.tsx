import React from 'react';

import _ from 'lodash';

import { Button, Text, GridItem } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import {
    AppLoader,
    CenteredContainer,
    FormWrapper,
    HelperText,
    SelectField
} from '@components/common';
import { ChecklistQuestionList } from './ChecklistQuestionList';
import { useCompanyHelper } from '@components/company/useCompanyHelper';

import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useSaveChecklist } from 'hooks/apiHooks/useSaveChecklist';
import { useToast } from 'hooks/useToast';

import { ErrorMsg } from 'utils';
import type { ChecklistFormProps } from 'interfaces';

const MAX_CHECKLIST_QUESTION = 15;

export const ChecklistEditForm = () => {
    const { showError, showSuccess } = useToast();
    const saveChecklist = useSaveChecklist();

    const [companyId, setCompanyId] = React.useState('');
    const [checklistForm, setChecklistForm] =
        React.useState<ChecklistFormProps>({});
    const [hasCompanyIdError, setHasCompanyIdError] = React.useState(false);

    const { data: companiesResponse, isLoading: isCompaniesLoading } =
        useGetCompanies();
    const { companyIdOptions, companyMap } = useCompanyHelper(
        companiesResponse?.data
    );

    const isAddDisabled =
        Object.keys(checklistForm).length >= MAX_CHECKLIST_QUESTION;

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

        submitChecklist();
    };

    return (
        <CenteredContainer>
            <FormWrapper
                formTitle="Selection Checklist Settings"
                isFormDisabled={saveChecklist.isSuccess}
                isLoading={saveChecklist.isLoading}
                onSubmit={onSubmitClick}
                gridColumns={1}
                width="xl"
            >
                {(isCompaniesLoading || saveChecklist.isLoading) && (
                    <AppLoader />
                )}
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
        </CenteredContainer>
    );
};

export default ChecklistEditForm;
