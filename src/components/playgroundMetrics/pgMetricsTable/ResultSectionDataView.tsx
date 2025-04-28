import { Box } from '@mui/material';
import { grey } from '@mui/material/colors';

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
        <Box
            maxWidth={700}
            margin="auto"
            p={3}
            borderRadius={2}
            bgcolor={grey[100]}
        >
            <ResultDataSection
                header={NEHA_SELECT_SECTION_MAP[section].title}
                data={data ?? []}
                icon={NEHA_SELECT_SECTION_MAP[section].icon}
                listItemBackgroundColor={
                    NEHA_SELECT_SECTION_MAP[section].listItemBackgroundColor
                }
            />
        </Box>
    );
};
