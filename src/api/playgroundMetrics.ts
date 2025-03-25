import { ApiClient } from 'middleware';

export const getPlaygroundMetrics = ApiClient({
    url: `v1/voice-chat/call/metrics`
});

export const searchPlaygroundMetrics = ApiClient({
    url: `/v1/voice-chat/call/search`
});
