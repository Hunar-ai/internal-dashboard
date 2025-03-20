import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const useUpdateSearchParams = () => {
    const navigate = useNavigate();
    const [isPending, setIsPending] = React.useState(false);
    const [searchParams] = useSearchParams();

    const replace = (oldvalue: string, newValue: string) => {
        setIsPending(true);
        setTimeout(() => {
            navigate({
                pathname: location.pathname,
                search: location.search.replace(oldvalue, newValue)
            });
        }, 1);
        setTimeout(() => {
            setIsPending(false);
        }, 1);
    };

    const append = (key: string, value: string) => {
        setTimeout(() => {
            const search = new URLSearchParams(location.search);
            search.set(key, value);
            navigate({
                pathname: location.pathname,
                search: search.toString()
            });
        }, 1);
    };

    const deleteParams = (keys: string[], delay = false) => {
        if (delay) {
            setTimeout(() => {
                keys.forEach(key => searchParams.delete(key));
                navigate({
                    pathname: location.pathname,
                    search: searchParams.toString()
                });
            }, 0.000001);
        } else {
            keys.forEach(key => searchParams.delete(key));
            navigate({
                pathname: location.pathname,
                search: searchParams.toString()
            });
        }
    };

    return { isPending, replace, append, deleteParams };
};
