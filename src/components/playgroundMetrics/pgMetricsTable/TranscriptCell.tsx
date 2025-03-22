import { ModalWrapper, type Cell } from 'components/common';

import { ChatView } from './ChatView';

interface TranscriptCellProps {
    cell: Cell;
}

export const TranscriptCell = ({ cell }: TranscriptCellProps) => {
    if (!cell?.value?.length) return <></>;

    return (
        <ModalWrapper CTA="View Conversation" title={`Conversations`}>
            <ChatView transcript={cell?.value} />
        </ModalWrapper>
    );
};
