import { CircularProgress } from '@chakra-ui/react';

import { LoaderBackdrop } from './LoaderBackdrop';

interface AppLoaderProps {
    isFullScreen?: boolean;
    zIndex?: number;
}

export const AppLoader = ({
    isFullScreen = true,
    zIndex = undefined
}: AppLoaderProps) => {
    return (
        <LoaderBackdrop isFullScreen={isFullScreen} zIndex={zIndex}>
            <CircularProgress isIndeterminate />
        </LoaderBackdrop>
    );
};
