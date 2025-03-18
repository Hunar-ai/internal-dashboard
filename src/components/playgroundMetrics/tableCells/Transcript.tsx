import { Box, Typography, Paper } from '@mui/material';
import { ModalWrapper, type Cell } from 'components/common';

interface ChatBubbleProps {
    text: string;
    speaker: string;
}

interface ChatProps {
    transcript: ChatBubbleProps[];
}

interface TranscriptProps {
    cell: Cell;
}

const ChatBubble = ({ text, speaker }: ChatBubbleProps) => {
    if (!text) return <></>;

    const isAgent = speaker === 'agent';

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

const Chat = ({ transcript = [] }: ChatProps) => {
    return (
        <>
            {transcript.map((msg, index) => (
                <ChatBubble key={index} text={msg.text} speaker={msg.speaker} />
            ))}
        </>
    );
};

export const Transcript = ({ cell }: TranscriptProps) => {
    if (!cell?.value?.length) return <></>;

    return (
        <ModalWrapper CTA="View Conversation" title={`Conversations`}>
            <Chat transcript={cell?.value} />
        </ModalWrapper>
    );
};
