import { useState } from 'react';
import { useSessionStorage } from './useSessionStorage';

export const useToken = () => {
    const { deleteItem } = useSessionStorage();

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = tokenString ? JSON.parse(tokenString) : null;
        return userToken;
    };

    const [token, setToken] = useState<string>(getToken());

    const saveToken = ({ access }: { access: string }) => {
        if (access) {
            localStorage.setItem('token', JSON.stringify(access));
            setToken(token);
        }
    };

    const removeToken = () => {
        localStorage.removeItem('token');
    };

    const removeVendorToken = () => {
        deleteItem('vendorToken');
        deleteItem('vendorTokenValue');
    };

    const removeEmployerToken = () => {
        deleteItem('employerToken');
        deleteItem('employerTokenValue');
    };

    return {
        setToken: saveToken,
        token,
        removeToken,
        removeVendorToken,
        removeEmployerToken
    };
};
