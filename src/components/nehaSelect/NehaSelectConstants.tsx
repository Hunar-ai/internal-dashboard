import { CALL_RESULT_SECTION } from 'Enum';
import { CheckCircle, ErrorOutline, Info } from '@mui/icons-material';

export const NEHA_SELECT_SECTION_MAP = {
    [CALL_RESULT_SECTION.CONCERNS]: {
        title: 'Concerns',
        ctaTitle: 'View Concerns',
        icon: <ErrorOutline color="error" sx={{ mr: 1 }} />,
        listItemBackgroundColor: '#ffe5e5'
    },
    [CALL_RESULT_SECTION.NEXT_STEPS]: {
        title: 'Next Steps',
        ctaTitle: 'View Next Steps',
        icon: <CheckCircle color="success" sx={{ mr: 1 }} />,
        listItemBackgroundColor: '#e8f5e9'
    },
    [CALL_RESULT_SECTION.FOLLOW_UP_POINTS]: {
        title: 'Follow Up Points',
        ctaTitle: 'View Follow Up Points',
        icon: <Info color="primary" sx={{ mr: 1 }} />,
        listItemBackgroundColor: '#e3f2fd'
    }
};
