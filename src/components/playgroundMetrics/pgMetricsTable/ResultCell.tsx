import React from 'react';

import { type Cell } from 'react-table';

import { ModalWrapper } from 'components/common';
import { ResultDataView, type ReasonProps } from './ResultDataView';

interface ResultCellProps {
    cell: Cell;
}

export const ResultCell = ({ cell }: ResultCellProps) => {
    const hasData = React.useCallback((data: ReasonProps): boolean => {
        return Boolean(
            data?.concerns?.length ||
                data?.nextSteps?.length ||
                data?.followUpPoints?.length ||
                data?.willingnessToProceed?.level?.trim()?.length ||
                data?.willingnessToProceed?.explanation?.trim?.length
        );
    }, []);

    if (!hasData(cell?.value)) return <> </>;

    return (
        <ModalWrapper title="Summary" CTA="View Result">
            <ResultDataView data={cell?.value} />
        </ModalWrapper>
    );
};
