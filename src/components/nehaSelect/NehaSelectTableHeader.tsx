import { Button, Grid } from '@mui/material';

import { useUpdateSearchParams } from 'hooks/useUpdateSearchParams';
import { useExportNehaLeads } from 'hooks/apiHooks/nehaSelect/useExportNehaLeads';
import LoadingButton from '@mui/lab/LoadingButton';

export const NehaSelectTableHeader = () => {
    const { append } = useUpdateSearchParams();
    const exportNehaLeads = useExportNehaLeads();

    const onUploadClick = () => {
        append('upload', 'true');
    };

    const onExportClick = () => {
        exportNehaLeads.mutate(
            { companyId: '123' },
            {
                onSuccess: data => {
                    const file = new File([data], 'leads.csv', {
                        type: 'text/csv'
                    });
                    const url = URL.createObjectURL(file);
                    window.open(url, '_blank');
                },
                onError: error => {
                    console.log(error);
                }
            }
        );
    };
    return (
        <>
            <Grid
                item
                xs={12}
                display="flex"
                justifyContent="end"
                alignItems="center"
                gap={1}
            >
                <LoadingButton
                    loading={exportNehaLeads.isLoading}
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={onExportClick}
                >
                    EXPORT
                </LoadingButton>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={onUploadClick}
                >
                    UPLOAD
                </Button>
            </Grid>
        </>
    );
};
