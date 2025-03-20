import { ChatBubble, type ChatBubbleProps } from './ChatBubble';

interface ChatProps {
    transcript: ChatBubbleProps[];
}

export const ChatView = ({ transcript = [] }: ChatProps) => {
    return (
        <>
            {transcript.map((msg, index) => (
                <ChatBubble key={index} text={msg.text} speaker={msg.speaker} />
            ))}
        </>
    );
};
