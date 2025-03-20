import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

interface DropzoneUploadAreaProps {
    isDragActive: boolean;
    uploadType: {
        name: string;
        extensions: string[];
        uploadText: string;
        ctaText: string;
    };
    isLoading: boolean;
}

export const DropzoneUploadArea = ({
    isDragActive,
    isLoading,
    uploadType
}: DropzoneUploadAreaProps) => {
    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
        >
            {!isDragActive && (
                <Typography variant="body1" align="center" color={grey[900]}>
                    {uploadType.uploadText}
                </Typography>
            )}
            <Typography
                fontSize="16px"
                variant="body1"
                align="center"
                color={grey[500]}
            >
                or
            </Typography>
            <LoadingButton variant="outlined" loading={isLoading}>
                {uploadType.ctaText}
            </LoadingButton>
        </Grid>
    );
};
