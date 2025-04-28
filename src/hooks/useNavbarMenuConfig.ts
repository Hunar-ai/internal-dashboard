import React from 'react';

import { useGetLoggedInPersonnel, useToken } from 'hooks';

import type { MenuProps } from 'interfaces';

const PLAYGROUND_METRICS_USERS =
    import.meta.env.VITE_PLAYGROUND_METRICS_USERS?.split(',') ?? [];

export const useNavbarMenuConfig = () => {
    const { token } = useToken();
    const { data: personnel } = useGetLoggedInPersonnel({ enabled: !!token });

    const menuConfig: MenuProps[] = React.useMemo(() => {
        const baseRoutes = [
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
            },
            {
                id: 'checklist',
                title: 'Checklist',
                link: '/checklist',
                isNewFeature: true
            },
            { id: 'assessment', title: 'Assessment', link: '/assessment' }
        ];

        if (PLAYGROUND_METRICS_USERS?.includes(personnel?.email)) {
            baseRoutes.push({
                id: 'playground',
                title: 'Playground Metrics',
                subMenus: [
                    {
                        id: 'playground-metrics',
                        title: 'Data Table',
                        link: '/playground-metrics'
                    },
                    {
                        id: 'playground-metrics/charts',
                        title: 'Charts',
                        link: '/playground-metrics/charts'
                    }
                ]
            });
            baseRoutes.push({
                id: 'neha-select',
                title: 'Neha Select',
                link: '/neha-select'
            });
        }

        return baseRoutes;
    }, [personnel?.email]);

    return menuConfig;
};
