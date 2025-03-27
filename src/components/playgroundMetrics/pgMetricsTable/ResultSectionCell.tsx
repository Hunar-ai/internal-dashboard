import React from 'react';

import { ModalWrapper } from '@components/common';
import { NEHA_SELECT_SECTION_MAP } from '@components/nehaSelect/NehaSelectConstants';
import { ResultSectionDataView } from './ResultSectionDataView';

import { CALL_RESULT_SECTION } from 'Enum';

interface ResultSectionCellProps {
    value: string[];
    section: CALL_RESULT_SECTION;
}

export const ResultSectionCell = ({
    value,
    section
}: ResultSectionCellProps) => {
    const hasData = React.useMemo(() => {
        return Boolean(value.length);
    }, [value]);

    if (!hasData) return <> </>;

    return (
        <ModalWrapper
            title={`Call Summary: ${NEHA_SELECT_SECTION_MAP[section].title}`}
            CTA={NEHA_SELECT_SECTION_MAP[section].ctaTitle}
        >
            <ResultSectionDataView data={value} section={section} />
        </ModalWrapper>
    );
};
