import { useSearchParams } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Grid, Typography } from '@mui/material';

import { SearchBar } from '@hunar.ai/hunar-design-system';

import { useGetNehaSelectPendingCalls } from 'hooks/apiHooks/nehaSelect/useGetNehaSelectPendingCalls';
import { useExportNehaSelectCalls } from 'hooks/apiHooks/nehaSelect/useExportNehaSelectCalls';
import { useErrorHelper } from 'hooks/useErrorHelper';
import { useToast } from 'hooks/useToast';

import type { TableFiltersProps } from 'interfaces';
import { NEHA_SELECT_COMPANY_ID } from './NehaSelectConstants';

interface NehaSelectTableHeaderProps {
    setSearchKey: (_: string) => void;
    filters: TableFiltersProps;
}

export const NehaSelectTableHeader = ({
    setSearchKey,
    filters
}: NehaSelectTableHeaderProps) => {
    const { showError, showSuccess } = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const { getApiErrorMsg } = useErrorHelper();
    const exportNehaSelectCalls = useExportNehaSelectCalls();

    const { data: pendingCallsData } = useGetNehaSelectPendingCalls({
        params: { companyId: NEHA_SELECT_COMPANY_ID }
    });

    const onUploadClick = () => {
        searchParams.set('upload', 'true');
        setSearchParams(searchParams);
    };

    const saveFile = (data: string) => {
        const file = new File([data], 'leads.csv', {
            type: 'text/csv'
        });
        const url = URL.createObjectURL(file);
        window.open(url, '_blank');
        URL.revokeObjectURL(url);
    };

    const exportLeads = async () => {
        try {
            const data = await exportNehaSelectCalls.mutateAsync({
                params: { companyId: NEHA_SELECT_COMPANY_ID },
                requestBody: { filters }
            });
            return data;
        } catch (error) {
            const errorMsg = getApiErrorMsg(error);
            showError({ title: 'Error!', description: errorMsg });
        }
    };

    const onExportClick = () => {
        exportLeads().then(data => {
            if (!data) return;

            saveFile(data);
            showSuccess({
                title: 'Success!',
                description: 'Leads exported successfully!'
            });
        });
    };

    return (
        <>
            <Grid
                item
                xs={12}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={1.5}
            >
                <Grid>
                    <Typography variant="body2">
                        {`Pending Calls: ${
                            pendingCallsData
                                ? pendingCallsData.callsCount
                                : 'Loading...'
                        }`}
                    </Typography>
                </Grid>
                <Grid display="flex" alignItems="center" gap={1.5}>
                    <SearchBar
                        setSearchValue={setSearchKey}
                        placeholder="Search"
                    />
                    <LoadingButton
                        loading={exportNehaSelectCalls.isLoading}
                        variant="outlined"
                        color="primary"
                        size="medium"
                        onClick={onExportClick}
                    >
                        {`EXPORT`}
                    </LoadingButton>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={onUploadClick}
                    >
                        {`UPLOAD`}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};
