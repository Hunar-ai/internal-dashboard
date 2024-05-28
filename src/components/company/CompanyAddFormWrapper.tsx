import { Grid, GridItem } from '@chakra-ui/react';

import { NAVBAR_HEIGHT } from 'Constants';

interface CompanyAddFormWrapperProps {
    children: React.ReactNode;
    statusPanel: React.ReactNode;
}

export const CompanyAddFormWrapper = ({
    children,
    statusPanel
}: CompanyAddFormWrapperProps) => {
    return (
        <Grid
            templateColumns={{ base: 'auto', sm: '7fr 5fr' }}
            height={`calc(100vh - ${NAVBAR_HEIGHT})`}
            overflow={{ base: 'auto', sm: 'unset' }}
        >
            <GridItem
                rowStart={{ base: 2, sm: 1 }}
                px={8}
                py={6}
                overflow={{ base: 'unset', sm: 'auto' }}
            >
                {children}
            </GridItem>
            <GridItem
                borderLeftWidth={{ base: 0, sm: 1 }}
                px={8}
                pt={6}
                overflow={{ base: 'unset', sm: 'auto' }}
            >
                {statusPanel}
            </GridItem>
        </Grid>
    );
};
