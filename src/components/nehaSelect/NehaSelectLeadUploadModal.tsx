import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button, Dialog, DialogTitle, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { AppLoader, DropzoneArea } from '@components/common';

import { useUploadNehaLeads } from 'hooks/apiHooks/nehaSelect/useUploadNehaLeads';

import type { ApiError } from 'interfaces';

interface NehaSelectLeadUploadModalProps {
    onUploadSuccess: () => void;
}

export const NehaSelectLeadUploadModal = ({
    onUploadSuccess
}: NehaSelectLeadUploadModalProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
    const [file, setFile] = React.useState<File | null>(null);

    const uploadNehaLeads = useUploadNehaLeads();

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

    const onUpload = () => {
        if (!file) return;

        uploadNehaLeads.mutate(
            {
                companyId: 'select',
                leadsFile: file
            },
            {
                onSuccess: () => {
                    handleClose();
                    onUploadSuccess();
                },
                onError: (error: ApiError) => {
                    console.error(error);
                }
            }
        );
    };

    return (
        <Dialog open={isUploadModalOpen} onClose={handleClose} fullWidth>
            {uploadNehaLeads.isLoading && <AppLoader />}
            <DialogTitle>Upload Lead Call Details CSV</DialogTitle>
            <Grid container spacing={2} p={2}>
                <Grid item xs={12}>
                    <DropzoneArea
                        value={file?.name}
                        onDrop={onFileDrop}
                        onRemoveClick={onRemoveClick}
                        type="csv"
                    />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="end" gap={2}>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    <LoadingButton
                        loading={uploadNehaLeads.isLoading}
                        variant="contained"
                        onClick={onUpload}
                    >
                        Upload
                    </LoadingButton>
                </Grid>
            </Grid>
        </Dialog>
    );
};
