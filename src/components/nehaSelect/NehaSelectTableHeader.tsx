import { Button, Grid } from '@mui/material';

import { useUpdateSearchParams } from 'hooks/useUpdateSearchParams';

export const NehaSelectTableHeader = () => {
    const { append } = useUpdateSearchParams();

    const onUploadClick = () => {
        append('upload', 'true');
    };

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
