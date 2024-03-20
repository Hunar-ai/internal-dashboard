import { Box } from '@chakra-ui/react';

export const NotFound = () => {
    return (
        <Box>
            <img
                style={{
                    display: 'block',
                    width: '100vw',
                    height: '100vh',
                    objectFit: 'cover'
                }}
                src="https://res.cloudinary.com/dczeev0fe/image/upload/v1652506664/6363147_oibkci.jpg"
                alt="Page not found"
            />
        </Box>
    );
};
