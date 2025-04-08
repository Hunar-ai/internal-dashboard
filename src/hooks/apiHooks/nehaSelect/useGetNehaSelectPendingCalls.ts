import { pendingCalls } from 'api/nehaSelect';

import { useGetReactQuery } from 'hooks/useGetReactQuery';

import type { NehaSelectPendingCallsProps } from 'interfaces';

interface SearchNehaSelectCallsProps {
    params: {
        companyId: string;
    };
}

export const useGetNehaSelectPendingCalls = ({
    params: { companyId }
}: SearchNehaSelectCallsProps) => {
    return useGetReactQuery<NehaSelectPendingCallsProps>({
        queryKey: ['getNehaSelectPendingCalls', companyId],
        requestUrl: pendingCalls,
        params: { companyId }
    });
};
