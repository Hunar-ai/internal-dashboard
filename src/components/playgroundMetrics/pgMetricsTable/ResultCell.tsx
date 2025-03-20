import { ReactNode } from 'react';

import { type Cell } from 'react-table';

import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
    Paper,
    Chip,
    Box
} from '@mui/material';
import { CheckCircle, ErrorOutline, Info } from '@mui/icons-material';

import { ModalWrapper } from 'components/common';

interface WillingnessToProceed {
    level: string;
    explanation: string;
}

interface ReasonProps {
    concerns: string[];
    nextSteps: string[];
    followUpPoints: string[];
    willingnessToProceed: WillingnessToProceed;
}

interface ResultDataProps {
    data: ReasonProps;
}

interface ResultDataSectionProps {
    header: string;
    data: any[];
    icon: ReactNode;
    listItemBackgroundColor: string;
}

interface ResultCellProps {
    cell: Cell;
}

const hasData = (data: ReasonProps): boolean => {
    return Boolean(
        data?.concerns?.length ||
            data?.nextSteps?.length ||
            data?.followUpPoints?.length ||
            data?.willingnessToProceed?.level?.trim()?.length ||
            data?.willingnessToProceed?.explanation?.trim?.length
    );
};

const ResultDataSection = ({
    icon,
    header,
    data = [],
    listItemBackgroundColor
}: ResultDataSectionProps) => {
    return (
        <>
            <Typography
                variant="h6"
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            >
                {icon} {header}
            </Typography>
            <List>
                {data?.map((value, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            backgroundColor: listItemBackgroundColor,
                            borderRadius: 1,
                            mb: 1
                        }}
                    >
                        <ListItemText primary={value} />
                    </ListItem>
                ))}
            </List>
        </>
    );
};

const ResultData = ({ data }: ResultDataProps) => {
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

export const ResultCell = ({ cell }: ResultCellProps) => {
    if (!hasData(cell?.value)) return <> </>;

    return (
        <ModalWrapper title="Summary" CTA="View Result">
            <ResultData data={cell?.value} />
        </ModalWrapper>
    );
};
