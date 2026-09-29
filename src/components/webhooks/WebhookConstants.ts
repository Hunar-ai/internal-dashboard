import { WEBHOOK_STATUS } from 'Enum';

export const WEBHOOK_MESSAGE = {
    SECRET_COPIED: 'Copied to clipboard!',
    SAVE_SUCCESS: 'Successfully saved webhook!',
    DELETE_SUCCESS: 'Webhook deleted',
    DELETE_TITLE: 'Delete webhook?',
    DELETE_DESCRIPTION:
        'This webhook will stop receiving events. You can add it again later.',
    ADD_WEBHOOK_DISABLED:
        'Every available event already has a webhook. Delete one to add another.'
};

export const WEBHOOK_STATUS_LABEL: Record<WEBHOOK_STATUS, string> = {
    [WEBHOOK_STATUS.ENABLED]: 'Active',
    [WEBHOOK_STATUS.DISABLED]: 'Paused'
};

export const WEBHOOK_STATUS_COLOR: Record<WEBHOOK_STATUS, string> = {
    [WEBHOOK_STATUS.ENABLED]: 'green.500',
    [WEBHOOK_STATUS.DISABLED]: 'orange.400'
};

export const WEBHOOK_STATUSES = Object.values(WEBHOOK_STATUS);
