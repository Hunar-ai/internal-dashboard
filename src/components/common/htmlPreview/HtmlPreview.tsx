import { Box, Paper } from '@mui/material';

import HtmlPreviewErrorBoundary from './HtmlPreviewErrorBoundary';

interface HtmlPreviewerProps {
    htmlInput: string;
    containerHeight?: string;
}

export const HtmlPreview = ({
    htmlInput,
    containerHeight = '100%'
}: HtmlPreviewerProps) => {
    return (
        <HtmlPreviewErrorBoundary>
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    height: containerHeight,
                    backgroundColor: '#fff',
                    overflow: 'auto'
                }}
            >
                <Box
                    component="iframe"
                    srcDoc={htmlInput}
                    sx={{ width: '100%', height: '100%' }}
                />
            </Paper>
        </HtmlPreviewErrorBoundary>
    );
};
