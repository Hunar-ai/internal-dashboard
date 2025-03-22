import { ModalWrapper, type Cell } from '@components/common';
import { ContextView } from './ContextView';

interface ContextCellProps {
    cell: Cell;
}

export const ContextCell = ({ cell }: ContextCellProps) => {
    return (
        <ModalWrapper title="Call Context" CTA="View Context">
            <ContextView data={cell?.value} />
        </ModalWrapper>
    );
};
