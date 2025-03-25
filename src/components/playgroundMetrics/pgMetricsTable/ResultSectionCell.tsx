import React from 'react';

import { ModalWrapper } from 'components/common';
import { ResultSectionDataView } from './ResultSectionDataView';
import { CALL_RESULT_SECTION } from 'Enum';
import { NEHA_SELECT_SECTION_MAP } from '@components/nehaSelect/NehaSelectConstants';

interface ResultSectionCellProps {
    value: string[];
    section: CALL_RESULT_SECTION;
}

export const ResultSectionCell = ({
    value,
    section
}: ResultSectionCellProps) => {
    const hasData = React.useCallback((data: string[]): boolean => {
        return Boolean(data?.length);
    }, []);

    if (!hasData(value)) return <> </>;

    return (
        <ModalWrapper
            title={`Call Summary: ${NEHA_SELECT_SECTION_MAP[section]?.title}`}
            CTA={NEHA_SELECT_SECTION_MAP[section]?.ctaTitle}
        >
            <ResultSectionDataView data={value} section={section} />
        </ModalWrapper>
    );
};
