import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { SigninForm } from '@components/signin/SigninForm';

import { useSignin, useToken } from 'hooks';
import { useToast } from 'hooks/useToast';

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
    const { showError } = useToast();

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
            showError({
                title: 'Unauthorized!',
                description: 'You are not allowed to access this portal!'
            });
            return;
        }
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
                    showError({
                        title: 'Unauthorized!',
                        description: apiError.errors.displayError
                    });
                }
            }
        );
    };

    return (
        <SigninForm handleSubmit={handleSubmit} isLoading={signIn.isLoading} />
    );
};
