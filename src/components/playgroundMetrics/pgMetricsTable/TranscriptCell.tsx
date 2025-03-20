import { ModalWrapper, type Cell } from 'components/common';

import { ChatBubble, type ChatBubbleProps } from './ChatBubble';

interface ChatProps {
    transcript: ChatBubbleProps[];
}

interface TranscriptCellProps {
    cell: Cell;
}

const Chat = ({ transcript = [] }: ChatProps) => {
    return (
        <>
            {transcript.map((msg, index) => (
                <ChatBubble key={index} text={msg.text} speaker={msg.speaker} />
            ))}
        </>
    );
};

export const TranscriptCell = ({ cell }: TranscriptCellProps) => {
    if (!cell?.value?.length) return <></>;

    return (
        <ModalWrapper CTA="View Conversation" title={`Conversations`}>
            <Chat transcript={cell?.value} />
        </ModalWrapper>
    );
};
