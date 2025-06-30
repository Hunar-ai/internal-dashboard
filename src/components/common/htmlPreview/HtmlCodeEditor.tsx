import { Paper, Box } from '@mui/material';

import { CodeEditorContainerSx, CodeEditorSx } from './htmlPreviewStyles';

interface HtmlCodeEditorProps {
    htmlInput: string;
    containerHeight?: string;
    codeEditorPlaceholder?: string;
    onChange: (_: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const HtmlCodeEditor = ({
    htmlInput,
    containerHeight = '100%',
    codeEditorPlaceholder = '',
    onChange
}: HtmlCodeEditorProps) => {
    return (
        <Paper
            sx={{ height: containerHeight, ...CodeEditorContainerSx }}
            elevation={3}
        >
            <Box
                component="textarea"
                value={htmlInput}
                onChange={onChange}
                placeholder={codeEditorPlaceholder}
                sx={CodeEditorSx}
            />
        </Paper>
    );
};
