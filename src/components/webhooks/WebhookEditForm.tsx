import React from 'react';

import {
    Button,
    Divider,
    Flex,
    GridItem,
    Switch,
    Text,
    Tooltip
} from '@chakra-ui/react';
import { AddIcon, CopyIcon } from '@chakra-ui/icons';

import {
    AppLoader,
    ConfirmationDialog,
    FieldRequiredIndicator,
    FormWrapper,
    HelperText,
    SelectField
} from '@components/common';
import { useCompanyHelper } from '@components/company/useCompanyHelper';

import { WebhookEditRow } from './WebhookEditRow';
import { WEBHOOK_MESSAGE } from './WebhookConstants';
import { useWebhookHelper } from './useWebhookHelper';

import { useToast } from 'hooks/useToast';
import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useGetWebhookSecret } from 'hooks/apiHooks/webhook/useGetWebhookSecret';
import { useGetWebhookConfigs } from 'hooks/apiHooks/webhook/useGetWebhookConfigs';
import { useEnableWebhookSecret } from 'hooks/apiHooks/webhook/useEnableWebhookSecret';
import { useDisableWebhookSecret } from 'hooks/apiHooks/webhook/useDisableWebhookSecret';
import { useRevealWebhookSecret } from 'hooks/apiHooks/webhook/useRevealWebhookSecret';
import { useCreateWebhookConfig } from 'hooks/apiHooks/webhook/useCreateWebhookConfig';
import { useUpdateWebhookConfig } from 'hooks/apiHooks/webhook/useUpdateWebhookConfig';
import { useDeleteWebhookConfig } from 'hooks/apiHooks/webhook/useDeleteWebhookConfig';

import { SettingsContext } from 'contexts';
import { ErrorMsg } from 'utils';
import type { ApiError, WebhookRowProps } from 'interfaces';

export const WebhookEditForm = () => {
    const { showError, showSuccess } = useToast();
    const { getBlankWebhookRow, getWebhookRows } = useWebhookHelper();
    const {
        formFields: { webhookEventTypes }
    } = React.useContext(SettingsContext);
    const { data: companiesResponse, isLoading: isCompaniesLoading } =
        useGetCompanies();

    const [companyId, setCompanyId] = React.useState('');
    const [hasCompanyIdError, setHasCompanyIdError] = React.useState(false);
    const [webhookRows, setWebhookRows] = React.useState<WebhookRowProps[]>([
        getBlankWebhookRow()
    ]);
    const [webhookRowToDelete, setWebhookRowToDelete] =
        React.useState<WebhookRowProps | null>(null);
    const [editingRowKey, setEditingRowKey] = React.useState<string | null>(
        null
    );

    const showApiError = ({ errors }: ApiError) =>
        showError({
            title: 'Error',
            description:
                errors.fieldErrors?.url?.[0] ??
                errors.fieldErrors?.event?.[0] ??
                errors.displayError
        });

    const { companyIdOptions } = useCompanyHelper(companiesResponse?.data);

    const {
        data: webhookSecret,
        isInitialLoading: isWebhookSecretLoading,
        refetch: refetchWebhookSecret
    } = useGetWebhookSecret({ companyId, onError: showApiError });

    const isWebhooksEnabled = !!webhookSecret?.configured;

    const {
        data: webhookConfigs,
        isInitialLoading: areWebhookConfigsLoading,
        refetch: refetchWebhookConfigs
    } = useGetWebhookConfigs({
        companyId,
        enabled: isWebhooksEnabled,
        onSuccess: configs => {
            const rows = getWebhookRows(configs);
            setWebhookRows(rows);
            setEditingRowKey(configs.length ? null : rows[0].key);
        },
        onError: showApiError
    });

    const enableWebhookSecret = useEnableWebhookSecret();
    const disableWebhookSecret = useDisableWebhookSecret();
    const revealWebhookSecret = useRevealWebhookSecret();
    const createWebhookConfig = useCreateWebhookConfig();
    const updateWebhookConfig = useUpdateWebhookConfig();
    const deleteWebhookConfig = useDeleteWebhookConfig();

    const savedWebhookConfigByEvent = React.useMemo(
        () =>
            new Map(
                (webhookConfigs ?? []).map(config => [config.event, config])
            ),
        [webhookConfigs]
    );

    const usedEvents = webhookRows.map(({ event }) => event);
    const isAddWebhookDisabled = webhookRows.length >= webhookEventTypes.length;
    const isRowDisabled =
        createWebhookConfig.isLoading ||
        updateWebhookConfig.isLoading ||
        deleteWebhookConfig.isLoading;

    const resetWebhookRows = () => {
        const blankRow = getBlankWebhookRow();
        setWebhookRows([blankRow]);
        setEditingRowKey(blankRow.key);
    };

    const onCompanyIdChange = ({
        target: { value }
    }: React.ChangeEvent<HTMLSelectElement>) => {
        setCompanyId(value);
        setHasCompanyIdError(!value);
        resetWebhookRows();
    };

    const onEnableWebhooksChange = ({
        target: { checked }
    }: React.ChangeEvent<HTMLInputElement>) => {
        const secretMutationOptions = {
            onSuccess: () => {
                if (!checked) {
                    resetWebhookRows();
                }
                refetchWebhookSecret();
            },
            onError: showApiError
        };

        if (checked) {
            enableWebhookSecret.mutate(
                { params: { companyId } },
                secretMutationOptions
            );
            return;
        }

        disableWebhookSecret.mutate(
            { params: { companyId } },
            secretMutationOptions
        );
    };

    const onCopySecretClick = () => {
        revealWebhookSecret.mutate(
            { params: { companyId } },
            {
                onSuccess: async ({ secret }) => {
                    await navigator.clipboard.writeText(secret);
                    showSuccess({
                        title: WEBHOOK_MESSAGE.SECRET_COPIED,
                        description: ''
                    });
                },
                onError: showApiError
            }
        );
    };

    const onWebhookRowChange = (
        key: string,
        updatedFields: Partial<WebhookRowProps>
    ) => {
        setWebhookRows(rows =>
            rows.map(row =>
                row.key === key ? { ...row, ...updatedFields } : row
            )
        );
    };

    const saveWebhookRow = ({ event, url, webhookStatus }: WebhookRowProps) => {
        const mutationOptions = {
            onSuccess: () => {
                setEditingRowKey(null);
                refetchWebhookConfigs();
                showSuccess({
                    title: 'Success',
                    description: WEBHOOK_MESSAGE.SAVE_SUCCESS
                });
            },
            onError: showApiError
        };

        if (savedWebhookConfigByEvent.has(event)) {
            updateWebhookConfig.mutate(
                {
                    params: { companyId, event },
                    requestBody: { url, webhookStatus }
                },
                mutationOptions
            );
            return;
        }

        createWebhookConfig.mutate(
            {
                params: { companyId },
                requestBody: { event, url, webhookStatus }
            },
            mutationOptions
        );
    };

    const onWebhookRowSaveClick = (webhookRow: WebhookRowProps) => {
        const savedConfig = savedWebhookConfigByEvent.get(webhookRow.event);
        const isUnchanged =
            !!savedConfig &&
            savedConfig.url === webhookRow.url &&
            savedConfig.webhookStatus === webhookRow.webhookStatus;

        if (isUnchanged) {
            setEditingRowKey(null);
            return;
        }

        saveWebhookRow(webhookRow);
    };

    const onWebhookRowDeleteClick = (webhookRow: WebhookRowProps) => {
        const isSavedRow = savedWebhookConfigByEvent.has(webhookRow.event);

        if (!isSavedRow) {
            setWebhookRows(rows =>
                rows.filter(row => row.key !== webhookRow.key)
            );
            return;
        }

        setWebhookRowToDelete(webhookRow);
    };

    const onDeleteWebhookConfirm = () => {
        if (!webhookRowToDelete) {
            return;
        }

        deleteWebhookConfig.mutate(
            {
                params: {
                    companyId,
                    event: webhookRowToDelete.event
                }
            },
            {
                onSuccess: () => {
                    setWebhookRowToDelete(null);
                    refetchWebhookConfigs();
                    showSuccess({
                        title: 'Success',
                        description: WEBHOOK_MESSAGE.DELETE_SUCCESS
                    });
                },
                onError: showApiError
            }
        );
    };

    const onAddWebhookClick = () => {
        const blankRow = getBlankWebhookRow();
        setWebhookRows(rows => [...rows, blankRow]);
        setEditingRowKey(blankRow.key);
    };

    return (
        <FormWrapper
            id="webhook-form-container"
            formTitle="Webhooks setup"
            isFormDisabled={false}
            isLoading={false}
            hideSubmitButton
            gridColumns={1}
            width={{ base: 'xl', lg: '60%' }}
        >
            {(isCompaniesLoading ||
                isWebhookSecretLoading ||
                areWebhookConfigsLoading) && <AppLoader />}
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
            {!!companyId && (
                <GridItem>
                    <Flex justify="space-between" align="center">
                        <Text fontWeight={600}>
                            {'Enable Webhooks'}
                            <FieldRequiredIndicator />
                        </Text>
                        <Switch
                            isChecked={isWebhooksEnabled}
                            onChange={onEnableWebhooksChange}
                        />
                    </Flex>
                </GridItem>
            )}
            {isWebhooksEnabled && (
                <>
                    <GridItem>
                        <Flex align="center" gap={3} mb={4}>
                            <Text color="gray.600">
                                {webhookSecret?.maskedSecret}
                            </Text>
                            <Button
                                variant="link"
                                colorScheme="blue"
                                rightIcon={<CopyIcon />}
                                onClick={onCopySecretClick}
                                isLoading={revealWebhookSecret.isLoading}
                            >
                                {'Copy secret'}
                            </Button>
                        </Flex>
                        <Divider />{' '}
                    </GridItem>
                    <GridItem pt={2}>
                        {webhookRows.map(webhookRow => (
                            <WebhookEditRow
                                key={webhookRow.key}
                                webhookRow={webhookRow}
                                isSavedRow={savedWebhookConfigByEvent.has(
                                    webhookRow.event
                                )}
                                webhookEventTypes={webhookEventTypes}
                                usedEvents={usedEvents}
                                isEditing={editingRowKey === webhookRow.key}
                                isDisabled={isRowDisabled}
                                onChange={onWebhookRowChange}
                                onEditClick={setEditingRowKey}
                                onSaveClick={onWebhookRowSaveClick}
                                onDeleteClick={onWebhookRowDeleteClick}
                            />
                        ))}
                        <Tooltip
                            label={WEBHOOK_MESSAGE.ADD_WEBHOOK_DISABLED}
                            isDisabled={!isAddWebhookDisabled}
                            shouldWrapChildren
                        >
                            <Button
                                leftIcon={<AddIcon />}
                                marginTop={3}
                                variant="link"
                                colorScheme="blue"
                                onClick={onAddWebhookClick}
                                isDisabled={isAddWebhookDisabled}
                            >
                                {'Add another webhook'}
                            </Button>
                        </Tooltip>
                    </GridItem>
                </>
            )}
            <ConfirmationDialog
                title={WEBHOOK_MESSAGE.DELETE_TITLE}
                description={WEBHOOK_MESSAGE.DELETE_DESCRIPTION}
                isOpen={!!webhookRowToDelete}
                submitText="DELETE"
                isCentered
                onSubmitClick={onDeleteWebhookConfirm}
                onCancelClick={() => setWebhookRowToDelete(null)}
            />
        </FormWrapper>
    );
};
