import { type ReactNode } from 'react';
import { Box } from '@mui/material';

interface SplitViewProps {
    children: ReactNode;
    gap?: number;
}

interface PanelProps {
    children: ReactNode;
    flex?: number;
}

export const SplitView = ({ children, gap = 2 }: SplitViewProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                gap: theme => theme.spacing(gap),
                overflow: 'hidden'
            }}
        >
            {children}
        </Box>
    );
};

const Left = ({ children, flex = 1 }: PanelProps) => {
    return (
        <Box sx={{ flex: flex, height: '100%', overflowY: 'auto' }}>
            {children}
        </Box>
    );
};

const Right = ({ children, flex = 1 }: PanelProps) => {
    return (
        <Box sx={{ flex: flex, height: '100%', overflowY: 'auto' }}>
            {children}
        </Box>
    );
};

SplitView.Left = Left;
SplitView.Right = Right;
