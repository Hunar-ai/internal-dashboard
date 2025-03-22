import { Typography, List, ListItem, ListItemText } from '@mui/material';

import { PGMetricsModalField } from './PGMetricsModalField';

interface PGMetricsModalDataListProps {
    header: string;
    data: any[];
}

export const PGMetricsModalDataList = ({
    header,
    data
}: PGMetricsModalDataListProps) => {
    return (
        <>
            <PGMetricsModalField label={header} variant="subtitle1" />
            <List dense>
                {data?.length ? (
                    data.map((value, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText primary={value} />
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body2">N/A</Typography>
                )}
            </List>
        </>
    );
};
