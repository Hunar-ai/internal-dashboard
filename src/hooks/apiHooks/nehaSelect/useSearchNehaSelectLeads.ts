import { search } from 'api/nehaSelect';
import { useGetReactQuery } from 'hooks/useGetReactQuery';
import type { NehaSelectLeadProps } from 'interfaces';

interface GetSearchNehaSelectLeads {
    params: {
        companyId: string;
    };
}

export const useSearchNehaSelectLeads = ({
    params: { companyId }
}: GetSearchNehaSelectLeads) => {
    return useGetReactQuery<NehaSelectLeadProps[]>({
        queryKey: ['searchNehaSelectLeads', companyId],
        requestUrl: search,
        params: { companyId }
    });
};
