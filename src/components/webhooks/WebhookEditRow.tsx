import React from 'react';

import {
    Box,
    Button,
    Flex,
    FormControl,
    IconButton,
    Input,
    Select
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { WebhookStatusSelect } from './WebhookStatusSelect';
import { useWebhookHelper } from './useWebhookHelper';

import { HelperText } from '@components/common';

import { ErrorMsg, RegExUtil } from 'utils';

import { WEBHOOK_STATUS } from 'Enum';
import type { OptionsProps, WebhookRowProps } from 'interfaces';

interface WebhookEditRowProps {
    webhookRow: WebhookRowProps;
    isSavedRow: boolean;
    webhookEventTypes: OptionsProps;
    usedEvents: string[];
    isEditing: boolean;
    isDisabled: boolean;
    onChange: (key: string, updatedFields: Partial<WebhookRowProps>) => void;
    onEditClick: (key: string) => void;
    onSaveClick: (webhookRow: WebhookRowProps) => void;
    onDeleteClick: (webhookRow: WebhookRowProps) => void;
}

export const WebhookEditRow = ({
    webhookRow,
    isSavedRow,
    webhookEventTypes,
    usedEvents,
    isEditing,
    isDisabled,
    onChange,
    onEditClick,
    onSaveClick,
    onDeleteClick
}: WebhookEditRowProps) => {
    const { key, event, url, webhookStatus } = webhookRow;

    const { getWebhookEventOptions } = useWebhookHelper();

    const [isSaveAttempted, setIsSaveAttempted] = React.useState(false);

    const hasEventError = isSaveAttempted && !event;
    const hasUrlError = isSaveAttempted && !RegExUtil.isHttpsUrl(url);
    const urlErrorMsg = url.trim() ? ErrorMsg.httpsUrl() : ErrorMsg.required();

    const onEventChange = ({
        target: { value }
    }: React.ChangeEvent<HTMLSelectElement>) => {
        setIsSaveAttempted(false);
        onChange(key, { event: value });
    };

    const onUrlChange = ({
        target: { value }
    }: React.ChangeEvent<HTMLInputElement>) => {
        setIsSaveAttempted(false);
        onChange(key, { url: value });
    };

    const onWebhookStatusChange = (updatedStatus: WEBHOOK_STATUS) => {
        onChange(key, { webhookStatus: updatedStatus });
    };

    const onRowSaveClick = () => {
        setIsSaveAttempted(true);

        if (!event || !RegExUtil.isHttpsUrl(url)) {
            return;
        }

        onSaveClick(webhookRow);
    };

    return (
        <Flex gap={2} align="flex-start" mb={3}>
            <Box flex="0 0 24%">
                <FormControl isInvalid={hasEventError}>
                    <Select
                        name="event"
                        placeholder="Choose Event"
                        value={event}
                        isDisabled={isDisabled || !isEditing || isSavedRow}
                        onChange={onEventChange}
                    >
                        {getWebhookEventOptions(
                            webhookEventTypes,
                            event,
                            usedEvents
                        ).map(({ value, label }) => (
                            <option value={value} key={value}>
                                {label}
                            </option>
                        ))}
                    </Select>
                    {hasEventError && (
                        <HelperText hasError errorMsg={ErrorMsg.required()} />
                    )}
                </FormControl>
            </Box>
            <Box flex="1">
                <FormControl isInvalid={hasUrlError}>
                    <Input
                        key={isEditing ? 'url-edit' : 'url-read'}
                        name="url"
                        placeholder="https://your-app.example.com/webhooks"
                        value={url}
                        autoFocus={isEditing}
                        isDisabled={isDisabled || !isEditing}
                        onChange={onUrlChange}
                    />
                    {hasUrlError && (
                        <HelperText hasError errorMsg={urlErrorMsg} />
                    )}
                </FormControl>
            </Box>
            <Box flex="0 0 8rem" minWidth={0}>
                <WebhookStatusSelect
                    webhookStatus={webhookStatus}
                    isDisabled={isDisabled || !isEditing}
                    onChange={onWebhookStatusChange}
                />
            </Box>
            <Flex flex="0 0 9rem" gap={2} align="center" height={10}>
                {isEditing ? (
                    <Button
                        colorScheme="blue"
                        size="sm"
                        width="4.5rem"
                        isDisabled={isDisabled}
                        onClick={onRowSaveClick}
                    >
                        {'SAVE'}
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        colorScheme="blue"
                        size="sm"
                        width="4.5rem"
                        isDisabled={isDisabled}
                        onClick={() => onEditClick(key)}
                    >
                        {'EDIT'}
                    </Button>
                )}
                <IconButton
                    aria-label="Delete webhook"
                    icon={<DeleteIcon />}
                    size="md"
                    variant="ghost"
                    color="gray.700"
                    isDisabled={isDisabled}
                    onClick={() => onDeleteClick(webhookRow)}
                />
            </Flex>
        </Flex>
    );
};
