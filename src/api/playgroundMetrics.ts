import { ApiClient } from 'middleware';

/* TODO: Update Endpoint */
export const getPlaygroundMetrics = ApiClient({
    // url: `v1/voice-chat/call/metrics`
    url: `/v1/voice-chat/call/search`
});

export const searchPlaygroundMetrics = ApiClient({
    url: `/v1/voice-chat/call/search`
});
