import { Button, Grid } from '@mui/material';

interface NehaSelectTableHeaderProps {
    onUploadClick: () => void;
}

export const NehaSelectTableHeader = ({
    onUploadClick
}: NehaSelectTableHeaderProps) => {
    return (
        <>
            <Grid
                item
                xs={12}
                display="flex"
                justifyContent="end"
                alignItems="center"
            >
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
