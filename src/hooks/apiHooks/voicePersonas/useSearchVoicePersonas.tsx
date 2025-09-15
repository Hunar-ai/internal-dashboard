import { search } from 'api/voicePersonas';

import { usePostReactQuery } from 'hooks/usePostReactQuery';

import type { VoicePersonasProps, PaginationInfo } from 'interfaces';

interface UseSearchVoicePersonasProps {
    enabled: boolean;
    params: {
        companyId: string;
    };
    onSuccess?: (data: SearchVoicePersonasResponse) => void;
}

interface SearchVoicePersonasResponse {
    data: VoicePersonasProps[];
    paginationInfo: PaginationInfo;
}

export const useSearchVoicePersonas = ({
    enabled,
    params: { companyId },
    onSuccess
}: UseSearchVoicePersonasProps) => {
    return usePostReactQuery<SearchVoicePersonasResponse>({
        queryKey: ['searchVoicePersonas', companyId],
        requestUrl: search,
        params: { companyId },
        body: {},
        enabled,
        onSuccess
    });
};
