import React from 'react';

export interface MenuProps {
    id: string;
    title: string;
    link: string;
}

export const useMenubarConfig = () => {
    const menuConfig: MenuProps[] = React.useMemo(() => {
        return [
            {
                id: 'client-reset-password',
                title: 'Reset Password',
                link: '/client-reset-password'
            }
        ];
    }, []);

    return menuConfig;
};
