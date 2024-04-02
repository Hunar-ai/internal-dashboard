/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList
} from '@chakra-ui/react';

import { useMenubarConfig, useToken } from 'hooks';

export const Menubar = () => {
    const { removeToken } = useToken();
    const navigate = useNavigate();
    const menuConfig = useMenubarConfig();
    const { pathname } = useLocation();

    const isMenuActive = React.useMemo<{
        [key: string]: boolean;
    }>(
        () =>
            menuConfig.reduce((activeState, menu) => {
                return {
                    ...activeState,
                    [menu.id]: menu.subMenus
                        ? menu.subMenus.some(
                              subMenu => pathname.indexOf(subMenu.id) > -1
                          )
                        : pathname.indexOf(menu.id) > -1
                };
            }, {}),
        [menuConfig, pathname]
    );

    const onLogoutClick = () => {
        removeToken();
        navigate(`/signin`);
    };

    return (
        <>
            <Flex
                px={4}
                as="header"
                height={14}
                alignItems="center"
                justifyContent="space-between"
                borderBottom={'1px solid'}
                borderBottomColor={'gray.400'}
            >
                <Flex as="nav" height="100%" alignItems="center">
                    {menuConfig.map(menu => (
                        <Flex
                            key={menu.id}
                            sx={{
                                height: '100%',
                                position: 'relative',
                                '&::after': isMenuActive[menu.id]
                                    ? {
                                          content: '""',
                                          height: 1,
                                          backgroundColor: 'blue.600',
                                          position: 'absolute',
                                          left: 4,
                                          right: 4,
                                          bottom: 0,
                                          borderTopLeftRadius: 2,
                                          borderTopRightRadius: 2
                                      }
                                    : {}
                            }}
                            flexDirection="column"
                            justifyContent="center"
                        >
                            {menu.subMenus?.length ? (
                                <Menu>
                                    <MenuButton as={Button} variant="ghost">
                                        {menu.title}
                                    </MenuButton>
                                    <MenuList>
                                        {menu.subMenus?.map(subMenu => (
                                            <MenuItem
                                                key={subMenu.id}
                                                as={Link}
                                                to={subMenu.link}
                                            >
                                                {subMenu.title}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                            ) : (
                                <Button
                                    as={Link}
                                    to={menu.link}
                                    fontSize={14}
                                    variant="ghost"
                                    sx={{
                                        color: isMenuActive[menu.id]
                                            ? 'blue.600'
                                            : undefined,
                                        '&:hover': {
                                            color: 'inherit'
                                        }
                                    }}
                                >
                                    {menu.title}
                                </Button>
                            )}
                        </Flex>
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
