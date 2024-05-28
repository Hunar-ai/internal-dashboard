import { GridItem } from '@chakra-ui/react';

export const LeftPanel = ({ children }: { children: React.ReactNode }) => {
    return (
        <GridItem
            rowStart={{ base: 2, sm: 1 }}
            px={8}
            py={6}
            overflow={{ base: 'unset', sm: 'auto' }}
        >
            {children}
        </GridItem>
    );
};
