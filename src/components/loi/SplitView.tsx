import { type ReactNode } from 'react';

import { Grid, GridItem } from '@chakra-ui/react';

interface SplitViewProps {
    children: ReactNode;
    gap?: number;
}

interface PanelProps {
    children: ReactNode;
    colSpan?: number;
}

export const SplitView = ({ children, gap = 2 }: SplitViewProps) => {
    return (
        <Grid
            display="flex"
            templateColumns="repeat(12, 1fr)"
            width="100%"
            height="100%"
            overflow="hidden"
            gap={gap}
        >
            {children}
        </Grid>
    );
};

const Left = ({ children, colSpan = 6 }: PanelProps) => {
    return (
        <GridItem colSpan={colSpan} height="100%" width="100%" overflowY="auto">
            {children}
        </GridItem>
    );
};

const Right = ({ children, colSpan = 6 }: PanelProps) => {
    return (
        <GridItem colSpan={colSpan} height="100%" width="100%" overflowY="auto">
            {children}
        </GridItem>
    );
};

SplitView.Left = Left;
SplitView.Right = Right;
