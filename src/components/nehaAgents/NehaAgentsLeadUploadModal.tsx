import React from 'react';
import { useSearchParams } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Dialog, DialogTitle, Grid } from '@mui/material';

import { AppLoader } from '@components/common';
import { Dropzone, DROPZONE_FILETYPE } from '@hunar.ai/hunar-design-system';

import { useUploadNehaAgentLeads } from 'hooks/apiHooks/nehaAgents/useUploadNehaAgentLeads';
import { useToast } from 'hooks/useToast';
import { useErrorHelper } from 'hooks/useErrorHelper';

interface NehaSelectLeadUploadModalProps {
    companyId: string | null;
    onUploadSuccess: () => void;
}

export const NehaAgentsLeadUploadModal = ({
    companyId,
    onUploadSuccess
}: NehaSelectLeadUploadModalProps) => {
    const { showSuccess, showError } = useToast();
    const { getApiErrorMsg } = useErrorHelper();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
    const [file, setFile] = React.useState<File | null>(null);

    const uploadNehaLeads = useUploadNehaAgentLeads();

    React.useEffect(() => {
        if (searchParams.has('upload')) {
            setIsUploadModalOpen(true);
        } else {
            setIsUploadModalOpen(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.has('upload')]);

    const handleClose = () => {
        searchParams.delete('upload');
        setIsUploadModalOpen(false);
        setSearchParams(searchParams);
        setFile(null);
    };

    const onFileDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setFile(file);
    };

    const onRemoveClick = () => {
        setFile(null);
    };

    const uploadLeads = async (companyId: string, leadsFile: File) => {
        try {
            await uploadNehaLeads.mutateAsync({
                companyId: companyId,
                leadsFile
            });
        } catch (error) {
            const errorMsg = getApiErrorMsg(error);
            showError({ title: 'Error!', description: errorMsg });
        }
    };

    const onUploadClick = () => {
        if (!file || !companyId) return;

        uploadLeads(companyId, file).then(() => {
            handleClose();
            onUploadSuccess();
            showSuccess({
                title: 'Success',
                description: 'Leads uploaded successfully!'
            });
        });
    };

    return (
        <Dialog open={isUploadModalOpen} onClose={handleClose} fullWidth>
            {uploadNehaLeads.isLoading && <AppLoader />}
            <DialogTitle>{`Upload Lead Call Details CSV`}</DialogTitle>
            <Grid container spacing={2} p={2}>
                <Grid item xs={12}>
                    <Dropzone
                        value={file?.name}
                        onDrop={onFileDrop}
                        onRemoveClick={onRemoveClick}
                        type={DROPZONE_FILETYPE.CSV}
                    />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="end" gap={2}>
                    <Button variant="outlined" onClick={handleClose}>
                        {`CANCEL`}
                    </Button>
                    <LoadingButton
                        loading={uploadNehaLeads.isLoading}
                        variant="contained"
                        onClick={onUploadClick}
                    >
                        {`UPLOAD`}
                    </LoadingButton>
                </Grid>
            </Grid>
        </Dialog>
    );
};
