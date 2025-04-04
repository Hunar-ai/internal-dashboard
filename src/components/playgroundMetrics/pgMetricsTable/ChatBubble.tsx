import { Box, Typography, Paper } from '@mui/material';

import { TRANSCRIPT_SPEAKER_TYPE } from 'Enum';

export interface ChatBubbleProps {
    text: string;
    speaker: TRANSCRIPT_SPEAKER_TYPE;
}

export const ChatBubble = ({ text, speaker }: ChatBubbleProps) => {
    if (!text) return <></>;

    const isAgent = speaker === TRANSCRIPT_SPEAKER_TYPE.AGENT;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: isAgent ? 'flex-start' : 'flex-end',
                mb: 1
            }}
        >
            <Paper
                sx={{
                    p: 1.5,
                    maxWidth: '60%',
                    bgcolor: isAgent ? '#4C79D9' : '#F1F0F0',
                    color: isAgent ? '#FFFFFF' : '#333333',
                    borderRadius: 2,
                    boxShadow: 3
                }}
            >
                <Typography variant="body1">{text}</Typography>
            </Paper>
        </Box>
    );
};
