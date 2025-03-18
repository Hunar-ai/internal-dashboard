import { ApiClient } from 'middleware';

export const getPlaygroundCallMetrics = ApiClient({
    url: `/v1/voice-chat/call/search`
});
