import { Box, useTheme } from '@chakra-ui/react';

interface LoaderBackdropProps {
    zIndex?: number;
    children?: React.ReactNode;
    isFullScreen?: boolean;
}

export const LoaderBackdrop = ({
    zIndex = undefined,
    children,
    isFullScreen = true
}: LoaderBackdropProps) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                zIndex: zIndex ?? theme.zIndex.drawer + 10,
                position: isFullScreen ? 'fixed' : 'absolute',
                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            id="loader-backdrop"
        >
            {children}
        </Box>
    );
};
