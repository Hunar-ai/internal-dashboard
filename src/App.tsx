import React from 'react';

import RoutesContainer from './routes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'theme';

import './config';

const queryClient = new QueryClient();

const App = () => {
    return (
        <ChakraProvider>
            <ThemeProvider theme={theme}>
                <QueryClientProvider client={queryClient}>
                    <RoutesContainer />
                </QueryClientProvider>
            </ThemeProvider>
        </ChakraProvider>
    );
};

export default App;
