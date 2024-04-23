import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, Button, Flex } from '@chakra-ui/react';

import { NavbarMenu } from './NavbarMenu';

import { useBaseLogo, useNavbarMenuConfig, useToken } from 'hooks';

const navbarHeight = '56px';

export const Navbar = () => {
    const { removeToken } = useToken();
    const navigate = useNavigate();
    const menuConfig = useNavbarMenuConfig();
    const logo = useBaseLogo();
    const { pathname } = useLocation();

    const isMenuActive = React.useMemo<{
        [key: string]: boolean;
    }>(
        () =>
            menuConfig.reduce((activeState, menu) => {
                return {
                    ...activeState,
                    [menu.id]: pathname.indexOf(menu.id) > -1
                };
            }, {}),
        [menuConfig, pathname]
    );

    const onLogoutClick = () => {
        removeToken();
        navigate(`/`);
    };

    return (
        <>
            <Flex
                px={4}
                as="header"
                height={navbarHeight}
                alignItems="center"
                borderBottom="1px solid"
                borderBottomColor="gray.200"
            >
                <Flex as="nav" height="100%" alignItems="center" flexGrow={1}>
                    <Box
                        as="img"
                        src={logo}
                        height={5}
                        pr={3}
                        alt="Hunar Logo"
                    />
                    {menuConfig.map(menu => (
                        <NavbarMenu
                            key={menu.id}
                            isActive={isMenuActive[menu.id]}
                            menuLink={menu.link}
                            menuTitle={menu.title}
                        />
                    ))}
                </Flex>
                <Button
                    size="sm"
                    onClick={onLogoutClick}
                    fontSize={12}
                    variant="ghost"
                >
                    LOGOUT
                </Button>
            </Flex>
        </>
    );
};
