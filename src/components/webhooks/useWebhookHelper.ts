import { WEBHOOK_STATUS } from 'Enum';
import type {
    OptionsProps,
    WebhookConfigProps,
    WebhookRowProps
} from 'interfaces';

export const useWebhookHelper = () => {
    const getBlankWebhookRow = (): WebhookRowProps => ({
        key: crypto.randomUUID(),
        isSaved: false,
        event: '',
        url: '',
        webhookStatus: WEBHOOK_STATUS.ENABLED
    });

    const getWebhookRows = (
        webhookConfigs: WebhookConfigProps[]
    ): WebhookRowProps[] =>
        webhookConfigs.length
            ? webhookConfigs.map(({ event, url, webhookStatus }) => ({
                  key: event,
                  isSaved: true,
                  event,
                  url,
                  webhookStatus
              }))
            : [getBlankWebhookRow()];

    const getWebhookEventOptions = (
        webhookEventTypes: OptionsProps,
        selectedEvent: string,
        usedEvents: string[]
    ): OptionsProps =>
        webhookEventTypes.filter(
            ({ value }) =>
                value === selectedEvent || !usedEvents.includes(value)
        );

    return {
        getBlankWebhookRow,
        getWebhookRows,
        getWebhookEventOptions
    };
};
