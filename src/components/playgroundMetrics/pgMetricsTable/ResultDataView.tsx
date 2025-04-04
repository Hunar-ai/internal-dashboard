import { Typography, Divider, Paper, Chip, Box } from '@mui/material';
import { CheckCircle, ErrorOutline, Info } from '@mui/icons-material';

import { ResultDataSection } from './ResultDataSection';

interface WillingnessToProceedProps {
    level: string;
    explanation: string;
}

export interface ReasonProps {
    concerns: string[];
    nextSteps: string[];
    followUpPoints: string[];
    willingnessToProceed: WillingnessToProceedProps;
}

interface ResultDataViewProps {
    data: ReasonProps;
}

export const ResultDataView = ({ data }: ResultDataViewProps) => {
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
                header="Concerns"
                data={data?.concerns ?? []}
                icon={<ErrorOutline color="error" sx={{ mr: 1 }} />}
                listItemBackgroundColor="#ffe5e5"
            />
            <Divider sx={{ my: 2 }} />

            <ResultDataSection
                header="Next Steps"
                data={data?.nextSteps ?? []}
                icon={<CheckCircle color="success" sx={{ mr: 1 }} />}
                listItemBackgroundColor="#e8f5e9"
            />
            <Divider sx={{ my: 2 }} />

            <ResultDataSection
                header="Follow-Up Points"
                data={data?.followUpPoints ?? []}
                icon={<Info color="primary" sx={{ mr: 1 }} />}
                listItemBackgroundColor="#e3f2fd"
            />
            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" sx={{ mb: 1 }}>
                Willingness to Proceed
                {data.willingnessToProceed?.level && (
                    <Chip
                        sx={{ ml: 2 }}
                        label={
                            data.willingnessToProceed?.level?.toUpperCase() ??
                            ''
                        }
                    />
                )}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">
                    {data?.willingnessToProceed?.explanation ?? '-'}
                </Typography>
            </Box>
        </Paper>
    );
};
