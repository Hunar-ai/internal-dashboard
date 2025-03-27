import { searchLeads } from 'api/nehaSelect';
import { useGetReactQuery } from 'hooks/useGetReactQuery';
import type { NehaSelectLeadProps } from 'interfaces';

interface SearchNehaSelectLeadsProps {
    params: {
        companyId: string;
    };
}

export const useSearchNehaSelectLeads = ({
    params: { companyId }
}: SearchNehaSelectLeadsProps) => {
    return useGetReactQuery<NehaSelectLeadProps[]>({
        queryKey: ['searchNehaSelectLeads', companyId],
        requestUrl: searchLeads,
        params: { companyId }
    });
};
