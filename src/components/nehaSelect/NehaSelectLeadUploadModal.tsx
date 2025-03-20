import React from 'react';
import { useSearchParams } from 'react-router-dom';

import Papa from 'papaparse';

import { Button, Dialog, DialogTitle, Grid } from '@mui/material';
import { DropzoneArea } from '@components/common';
import LoadingButton from '@mui/lab/LoadingButton';

export const NehaSelectLeadUploadModal = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
    const [bulkUploadData, setBulkUploadData] = React.useState<unknown[]>([]);

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
        Papa.parse(file, {
            complete: (parsedData: Papa.ParseResult<{ data: string[][] }>) => {
                setBulkUploadData(parsedData.data);
                console.log(bulkUploadData);
            }
        });
    };

    const onUpload = () => {
        console.log('upload');
    };

    return (
        <Dialog open={isUploadModalOpen} onClose={onClose} fullWidth>
            <DialogTitle>Upload Lead Call Details CSV</DialogTitle>
            <Grid container spacing={2} p={2}>
                <Grid item xs={12}>
                    <DropzoneArea onDrop={onFileDrop} type="csv" />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="end" gap={2}>
                    <Button variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <LoadingButton variant="contained" onClick={onUpload}>
                        Upload
                    </LoadingButton>
                </Grid>
            </Grid>
        </Dialog>
    );
};
