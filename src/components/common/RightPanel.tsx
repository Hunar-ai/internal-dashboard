import { GridItem } from '@chakra-ui/react';

export const RightPanel = ({ children }: { children: React.ReactNode }) => {
    return (
        <GridItem
            borderLeftWidth={{ base: 0, sm: 1 }}
            px={8}
            pt={{ base: 4, sm: 4 }}
            overflow={{ base: 'unset', sm: 'auto' }}
        >
            {children}
        </GridItem>
    );
};
