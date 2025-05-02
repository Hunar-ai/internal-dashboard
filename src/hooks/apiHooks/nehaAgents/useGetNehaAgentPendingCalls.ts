import { pendingCallsCount } from 'api/nehaAgents';

import { useGetReactQuery } from 'hooks/useGetReactQuery';

import type { NehaAgentPendingCallsProps } from 'interfaces';

interface SearchNehaAgentCallsProps {
    enabled: boolean;
    params: {
        companyId: string;
    };
}

export const useGetNehaAgentPendingCalls = ({
    enabled,
    params: { companyId }
}: SearchNehaAgentCallsProps) => {
    return useGetReactQuery<NehaAgentPendingCallsProps>({
        queryKey: ['getNehaAgentPendingCalls', companyId],
        requestUrl: pendingCallsCount,
        params: { companyId },
        enabled
    });
};
