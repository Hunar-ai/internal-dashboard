import { type SxProps } from '@mui/material';

export const CodeEditorContainerSx: SxProps = {
    backgroundColor: '#1e1e1e',
    color: '#d4d4d4',
    padding: 2,
    fontFamily: 'monospace',
    overflow: 'auto'
};

export const CodeEditorSx: SxProps = {
    width: '100%',
    height: '100%',
    background: 'transparent',
    border: 'none',
    resize: 'none',
    outline: 'none',
    color: '#d4d4d4',
    fontFamily: 'monospace',
    fontSize: '14px',
    lineHeight: '1.5',
    scrollbarWidth: 'thin', // for Firefox
    scrollbarColor: '#555 #1e1e1e', // for Firefox
    '&::-webkit-scrollbar': {
        width: '8px'
    },
    '&::-webkit-scrollbar-track': {
        background: '#1e1e1e'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#555',
        borderRadius: '4px'
    }
};
