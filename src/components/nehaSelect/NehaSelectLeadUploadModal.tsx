import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button, Dialog, DialogTitle, Grid } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { DropzoneArea } from '@components/common';

import { useUploadNehaLeads } from 'hooks/apiHooks/nehaSelect/useUploadNehaLeads';

import type { ApiError } from 'interfaces';

export const NehaSelectLeadUploadModal = () => {
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

    const onClose = () => {
        searchParams.delete('upload');
        setSearchParams(searchParams);
    };

    const onFileDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setFile(file);
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
                    onClose();
                },
                onError: (error: ApiError) => {
                    console.error(error);
                }
            }
        );
    };

    return (
        <Dialog open={isUploadModalOpen} onClose={onClose} fullWidth>
            <DialogTitle>Upload Lead Call Details CSV</DialogTitle>
            <Grid container spacing={2} p={2}>
                <Grid item xs={12}>
                    <DropzoneArea
                        value={file?.name}
                        onDrop={onFileDrop}
                        type="csv"
                    />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="end" gap={2}>
                    <Button variant="outlined" onClick={onClose}>
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
