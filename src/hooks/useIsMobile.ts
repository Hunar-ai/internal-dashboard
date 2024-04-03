import { useBreakpoint } from '@chakra-ui/react';
import * as React from 'react';

export const useIsMobile = (): boolean => {
    const screenWidth = useBreakpoint();
    const isMobile = React.useMemo(() => screenWidth === 'base', [screenWidth]);
    return isMobile;
};
