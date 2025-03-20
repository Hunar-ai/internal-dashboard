import { ReactNode } from 'react';

import { Typography, List, ListItem, ListItemText } from '@mui/material';

interface ResultDataSectionProps {
    header: string;
    data: any[];
    icon: ReactNode;
    listItemBackgroundColor: string;
}

export const ResultDataSection = ({
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
