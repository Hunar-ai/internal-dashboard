import { search } from 'api/voiceProviders';

import { usePostReactQuery } from 'hooks/usePostReactQuery';

import type { NehaAgentCallProps, PaginationInfo } from 'interfaces';

interface UseSearchVoiceProvider {
    params: {
        companyId: string;
    };
    enabled: boolean;
    onSuccess?: (data: NehaAgentsCallsResponse) => void;
}

interface NehaAgentsCallsResponse {
    data: NehaAgentCallProps[];
    paginationInfo: PaginationInfo;
}

export const useSearchVoiceProvider = ({
    params: { companyId },
    enabled,
    onSuccess
}: UseSearchVoiceProvider) => {
    return usePostReactQuery<NehaAgentsCallsResponse>({
        queryKey: ['searchVoiceProvider', companyId],
        requestUrl: search,
        params: { companyId },
        body: {},
        enabled,
        onSuccess
    });
};
