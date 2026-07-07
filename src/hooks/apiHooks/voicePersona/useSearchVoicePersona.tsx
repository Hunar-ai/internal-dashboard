import { search } from 'api/voicePersona';

import { usePostReactQuery } from 'hooks/usePostReactQuery';

import type { VoicePersonaProps, PaginationInfo } from 'interfaces';

interface UseSearchVoicePersonaProps {
    params: {
        companyId: string;
    };
    enabled: boolean;
    onSuccess?: (data: SearchVoicePersonaResponse) => void;
}

interface SearchVoicePersonaResponse {
    data: VoicePersonaProps[];
    paginationInfo: PaginationInfo;
}

export const useSearchVoicePersona = ({
    params: { companyId },
    enabled,
    onSuccess
}: UseSearchVoicePersonaProps) => {
    return usePostReactQuery<SearchVoicePersonaResponse>({
        queryKey: ['searchVoicePersona', companyId],
        requestUrl: search,
        params: { companyId },
        body: {},
        enabled,
        onSuccess
    });
};
