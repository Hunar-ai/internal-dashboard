import React from 'react';

import type { MenuProps } from 'interfaces';

export const useNavbarMenuConfig = () => {
    const menuConfig: MenuProps[] = React.useMemo(() => {
        return [
            {
                id: 'user',
                title: 'User',
                subMenus: [
                    {
                        id: 'client-reset-password',
                        title: 'Reset Password',
                        link: '/client-reset-password'
                    },
                    {
                        id: 'user/deactivate',
                        title: 'Deactivate User',
                        link: '/user?deactivate=true'
                    }
                ]
            },
            {
                id: 'company',
                title: 'Company',
                subMenus: [
                    {
                        id: 'company/add',
                        title: 'Add',
                        link: '/company?add=true'
                    },
                    {
                        id: 'company/career-page',
                        title: 'Career Page',
                        link: '/company?career=true'
                    },
                    {
                        id: 'company/referral-page',
                        title: 'Referral Page',
                        link: '/company?referral=true'
                    }
                ]
            }
        ];
    }, []);

    return menuConfig;
};
