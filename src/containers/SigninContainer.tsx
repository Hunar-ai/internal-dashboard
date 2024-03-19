import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useSignin, useToken } from 'hooks';
import { SigninForm } from '@components/signin/SigninForm';
import { useToast } from '@chakra-ui/react';

export interface SigninFormProps {
    email: string;
    password: string;
}

export const SigninContainer = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const { setToken, removeEmployerToken, removeToken, removeVendorToken } =
        useToken();
    const signIn = useSignin();
    const toast = useToast();

    const [apiError, setApiError] = React.useState('');

    React.useEffect(() => {
        removeToken();
        removeVendorToken();
        removeEmployerToken();
    }, []);

    const handleSubmit = (form: SigninFormProps) => {
        if (
            import.meta.env.VITE_ALLOWED_USERS.split(',').indexOf(
                form.email
            ) === -1
        ) {
            toast({
                title: 'Unauthorized!',
                description: 'You are not allowed to access this portal!',
                status: 'error',
                duration: 9000,
                isClosable: true
            });
            return;
        }
        setApiError('');
        signIn.mutate(
            { ...form, companyId: import.meta.env.VITE_DEFAULT_COMPANY },
            {
                onSuccess: data => {
                    setToken(data);
                    const next = searchParams.get('next');
                    if (next) {
                        navigate(next);
                    } else {
                        navigate(`/client-reset-password`);
                    }
                },
                onError: apiError => {
                    setApiError(apiError.errors.displayError);
                }
            }
        );
    };

    return (
        <SigninForm
            apiError={apiError}
            handleSubmit={handleSubmit}
            isLoading={signIn.isLoading}
        />
    );
};
