import React from 'react';
import {
    Card,
    CardContent,
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
import { ModalWrapper } from '../ModalWrapper';

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

interface DataDisplayProps {
    data: ReasonProps;
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

export const Reason = ({ data }: DataDisplayProps) => {
    return (
        <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 2 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    Summary
                </Typography>

                <Typography variant="h6">Concerns</Typography>
                <List>
                    {data.concerns.map((concern, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={concern} />
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ my: 2 }} />

                <Typography variant="h6">Next Steps</Typography>
                <List>
                    {data.nextSteps.map((step, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={step} />
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ my: 2 }} />

                <Typography variant="h6">Follow-Up Points</Typography>
                <List>
                    {data.followUpPoints.map((point, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={point} />
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ my: 2 }} />

                <Typography variant="h6">Willingness to Proceed</Typography>
                <Typography variant="body1">
                    <strong>Level:</strong> {data.willingnessToProceed.level}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.willingnessToProceed.explanation}
                </Typography>
            </CardContent>
        </Card>
    );
};

const DataDisplay: React.FC<DataDisplayProps> = ({ data }) => {
    return (
        <Paper
            // elevation={3}÷
            elevation={0}
            sx={{
                maxWidth: 700,
                margin: 'auto',
                p: 3,
                borderRadius: 2,
                backgroundColor: '#f9f9f9'
            }}
        >
            <Typography
                variant="h6"
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            >
                <ErrorOutline color="error" sx={{ mr: 1 }} /> Concerns
            </Typography>
            <List>
                {data?.concerns?.map((concern, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            backgroundColor: '#ffe5e5',
                            borderRadius: 1,
                            mb: 1
                        }}
                    >
                        <ListItemText primary={concern} />
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ my: 2 }} />

            {/* Next Steps */}
            <Typography
                variant="h6"
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            >
                <CheckCircle color="success" sx={{ mr: 1 }} /> Next Steps
            </Typography>
            <List>
                {data?.nextSteps?.map((step, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            backgroundColor: '#e8f5e9',
                            borderRadius: 1,
                            mb: 1
                        }}
                    >
                        <ListItemText primary={step} />
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ my: 2 }} />

            {/* Follow-Up Points */}
            <Typography
                variant="h6"
                sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            >
                <Info color="primary" sx={{ mr: 1 }} /> Follow-Up Points
            </Typography>
            <List>
                {data?.followUpPoints?.map((point, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            backgroundColor: '#e3f2fd',
                            borderRadius: 1,
                            mb: 1
                        }}
                    >
                        <ListItemText primary={point} />
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ my: 2 }} />

            {/* Willingness to Proceed */}
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

export const Result = ({ cell }) => {
    if (!hasData(cell?.value)) return <> </>;

    return (
        <ModalWrapper title="Summary" CTA="View Result">
            <DataDisplay data={cell?.value} />
        </ModalWrapper>
    );
};
