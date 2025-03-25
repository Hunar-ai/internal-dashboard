import { Paper } from '@mui/material';

import { ResultDataSection } from './ResultDataSection';
import { CALL_RESULT_SECTION } from 'Enum';
import { NEHA_SELECT_SECTION_MAP } from '@components/nehaSelect/NehaSelectConstants';

interface ResultSectionDataViewProps {
    data: string[];
    section: CALL_RESULT_SECTION;
}

export const ResultSectionDataView = ({
    data,
    section
}: ResultSectionDataViewProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                maxWidth: 700,
                margin: 'auto',
                p: 3,
                borderRadius: 2,
                backgroundColor: '#f9f9f9'
            }}
        >
            <ResultDataSection
                header={NEHA_SELECT_SECTION_MAP[section]?.title}
                data={data ?? []}
                icon={NEHA_SELECT_SECTION_MAP[section]?.icon}
                listItemBackgroundColor={
                    NEHA_SELECT_SECTION_MAP[section]?.listItemBackgroundColor
                }
            />
        </Paper>
    );
};
