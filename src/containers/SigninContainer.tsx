import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useSignin, useToken } from 'hooks';
import { SigninForm } from '@components/signin/SigninForm';

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

    const [apiError, setApiError] = React.useState('');

    React.useEffect(() => {
        removeToken();
        removeVendorToken();
        removeEmployerToken();
    }, []);

    const handleSubmit = (form: SigninFormProps) => {
        setApiError('');
        signIn.mutate(
            { ...form, companyId: 'demo' },
            {
                onSuccess: data => {
                    setToken(data);
                    const next = searchParams.get('next');
                    if (next) {
                        navigate(next);
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
