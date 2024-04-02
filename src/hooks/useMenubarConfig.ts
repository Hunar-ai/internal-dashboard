import React from 'react';

export interface MenuProps {
    id: string;
    title: string;
    link: string;
    subMenus?: { id: string; title: string; link: string }[];
}

export const useMenubarConfig = () => {
    const menuConfig: MenuProps[] = React.useMemo(() => {
        return [
            {
                id: 'client-reset-password',
                title: 'Reset Password',
                link: '/client-reset-password'
            },
            {
                id: 'custom-settings',
                title: 'Custom Fields',
                link: '/custom-settings',
                subMenus: [
                    {
                        id: 'custom-settings',
                        title: 'Custom Field A',
                        link: '/custom-settings/a'
                    }
                ]
            },
            {
                id: 'reset-something',
                title: 'Reset',
                link: '/reset-something'
            },
            {
                id: 'password-place',
                title: 'Password',
                link: '/password-place'
            }
        ] satisfies MenuProps[];
    }, []);

    return menuConfig;
};
