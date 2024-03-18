import React from 'react';

import { toast } from 'react-toastify';
import Alert from '@mui/material/Alert';

const Container = (props: { children: React.ReactNode }) => (
    <div>{props.children}</div>
);

interface ShowToastProps {
    message: string;
    autoClose?: number;
    pauseOnHover?: boolean;
}

const getMessageTemplate = (
    message: string,
    severity: 'error' | 'info' | 'success' | 'warning'
) => {
    return (
        <Container>
            <Alert severity={severity}>{message}</Alert>
        </Container>
    );
};

export const useToast = () => {
    const showError = React.useCallback(({ message }: ShowToastProps) => {
        toast(getMessageTemplate(message, 'error'), {
            type: 'error',
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            toastId: 'error'
        });
    }, []);

    const showSuccess = ({
        message,
        autoClose = 2500,
        pauseOnHover = true
    }: ShowToastProps) => {
        toast(getMessageTemplate(message, 'success'), {
            type: 'success',
            position: 'bottom-right',
            autoClose,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover,
            toastId: 'success'
        });
    };

    const showInfo = ({ message }: ShowToastProps) => {
        toast(getMessageTemplate(message, 'info'), {
            type: 'info',
            position: 'bottom-right',
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            toastId: 'info'
        });
    };
    return {
        showError,
        showSuccess,
        showInfo
    };
};
