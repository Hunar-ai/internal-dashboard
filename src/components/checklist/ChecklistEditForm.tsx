import React from 'react';

import { Flex, Text } from '@chakra-ui/react';

import {
    AppLoader,
    ConfirmationDialog,
    FieldRequiredIndicator,
    FormWrapper,
    HelperText,
    SelectField
} from '@components/common';
import { ChecklistQuestionList } from './components/ChecklistQuestionList';
import { ChecklistUploadModal } from './components/ChecklistUploadModal';
import { useCompanyHelper } from '@components/company/useCompanyHelper';

import { useToast } from 'hooks/useToast';
import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useSaveChecklist } from 'hooks/apiHooks/useSaveChecklist';

import { useChecklistForm } from './useChecklistForm';
import { toChecklistPayload } from './helpers/ChecklistUtils';

import { ErrorMsg } from 'utils';

export const ChecklistEditForm = () => {
    const { showError, showSuccess } = useToast();
    const saveChecklist = useSaveChecklist();

    const [companyId, setCompanyId] = React.useState('');
    const [hasCompanyIdError, setHasCompanyIdError] = React.useState(false);

    const { data: companiesResponse, isLoading: isCompaniesLoading } =
        useGetCompanies();
    const { companyIdOptions, companyMap } = useCompanyHelper(
        companiesResponse?.data
    );

    const {
        checklistForm,
        checklistFormErrorState,
        expandedQuestionKey,
        handlers,
        onQuestionAdd,
        openUploadModal,
        activeOperation,
        loadCompanyChecklist,
        validate
    } = useChecklistForm();

    const onCompanyIdChange = ({
        target: { value }
    }: React.ChangeEvent<HTMLSelectElement>) => {
        loadCompanyChecklist(
            companyMap[value]?.settings.dashboardSettings?.selectionChecklist ??
                []
        );
        setCompanyId(value);
        setHasCompanyIdError(!value);
    };

    const onSubmitClick = () => {
        if (!companyId) {
            setHasCompanyIdError(true);
            return;
        }

        const { hasError, firstErrorKey } = validate();

        if (hasError) {
            document
                .getElementById(`${firstErrorKey}-card`)
                ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        saveChecklist.mutate(
            {
                params: { companyId },
                requestBody: {
                    selectionChecklist: toChecklistPayload(checklistForm)
                }
            },
            {
                onSuccess: () =>
                    showSuccess({
                        title: 'Success',
                        description: 'Successfully saved Selection Checklist!'
                    }),
                onError: error =>
                    showError({
                        title: 'Error',
                        description: error.errors.displayError
                    })
            }
        );
    };

    // Reviewer Note: not moving this to the constants file since this is a important function to show all the modals
    //habing a single render function for modals so that its scalable for future modals and more readable
    const renderActiveOperation = () => {
        if (!activeOperation) {
            return null;
        }

        switch (activeOperation.type) {
            case 'CSVUploadModal':
                return <ChecklistUploadModal {...activeOperation.data} />;
            case 'ConfirmationModal':
                return <ConfirmationDialog {...activeOperation.data} />;
        }
    };

    return (
        <FormWrapper
            id="selection-checklist-form-container"
            formTitle="Selection Checklist Settings"
            isFormDisabled={false}
            isLoading={saveChecklist.isLoading}
            onSubmit={onSubmitClick}
            gridColumns={1}
            width={{ base: 'xl', lg: '75%' }}
        >
            {(isCompaniesLoading || saveChecklist.isLoading) && <AppLoader />}
            <SelectField
                label="Company Id"
                name="companyId"
                placeholder="Select company Id"
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
            {!!companyId && (
                <Flex direction="column" gap={4}>
                    <Text fontWeight={600}>
                        {`Selection Checklist Questions`}
                        <FieldRequiredIndicator />
                    </Text>
                    <ChecklistQuestionList
                        checklistForm={checklistForm}
                        checklistFormErrorState={checklistFormErrorState}
                        expandedQuestionKey={expandedQuestionKey}
                        onQuestionAdd={onQuestionAdd}
                        openUploadModal={openUploadModal}
                        handlers={handlers}
                    />
                </Flex>
            )}
            {renderActiveOperation()}
        </FormWrapper>
    );
};

export default ChecklistEditForm;
