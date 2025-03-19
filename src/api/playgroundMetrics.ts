import { ApiClient } from 'middleware';

export const getPlaygroundVoiceCallMetrics = ApiClient({
    url: `/v1/voice-chat/call/search`
});
