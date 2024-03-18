import RoutesContainer from './routes';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from 'theme';

import './config';

const queryClient = new QueryClient();

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <ChakraProvider>
                <QueryClientProvider client={queryClient}>
                    <RoutesContainer />
                </QueryClientProvider>
            </ChakraProvider>
        </ThemeProvider>
    );
};

export default App;
