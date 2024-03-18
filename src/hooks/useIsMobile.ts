import * as React from 'react';

export const useIsMobile = (): boolean => {
    const screenWidth = 'xs';
    const isMobile = React.useMemo(
        () => screenWidth === 'xs' || screenWidth === 'sm',
        [screenWidth]
    );
    return isMobile;
};
