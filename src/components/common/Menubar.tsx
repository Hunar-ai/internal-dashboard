/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    IconButton
} from '@chakra-ui/react';
import MenuIcon from '@mui/icons-material/Menu';

import { useBaseLogo, useIsMobile, useMenubarConfig, useToken } from 'hooks';

const menuBarHeight = {
    desktop: '56px',
    mobile: '40px'
};

interface MenubarProps {
    children: React.ReactNode;
}

export const Menubar = ({ children }: MenubarProps) => {
    const { removeToken } = useToken();
    const navigate = useNavigate();
    const menuConfig = useMenubarConfig();
    const { pathname } = useLocation();
    const isMobile = useIsMobile();
    const logo = useBaseLogo();

    const [open, setOpen] = React.useState(false);

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

    return isMobile ? (
        <>
            <Box overflow="hidden">
                <Box
                    width="80%"
                    position="fixed"
                    top={0}
                    bottom={0}
                    boxShadow="inset -10px 0 6px -5px hsla(0,0%,0%,.25)"
                    sx={{
                        transform: open ? `translate(0)` : `translate(-100%)`,
                        transition: 'transform 0.2s ease-in'
                    }}
                >
                    <Flex
                        height={10}
                        py={3}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box as="img" src={logo} height={6} alt="Hunar Logo" />
                    </Flex>
                    <Flex
                        px={2}
                        height={`calc(100% - ${menuBarHeight.mobile})`}
                        flexDirection="column"
                        alignItems="start"
                    >
                        <Flex
                            flexDirection="column"
                            alignItems="start"
                            width="100%"
                            flexGrow={1}
                            rowGap={1}
                        >
                            {menuConfig.map(menu => (
                                <Button
                                    key={menu.id}
                                    as={Link}
                                    to={menu.link}
                                    fontSize={14}
                                    variant={
                                        isMenuActive[menu.id]
                                            ? undefined
                                            : 'ghost'
                                    }
                                    width="100%"
                                    justifyContent="start"
                                    sx={{
                                        color: isMenuActive[menu.id]
                                            ? 'blue.600'
                                            : undefined,
                                        '&:hover': {
                                            color: 'inherit'
                                        }
                                    }}
                                    onClick={() => setOpen(false)}
                                >
                                    {menu.title}
                                </Button>
                            ))}
                        </Flex>
                        <Button
                            onClick={onLogoutClick}
                            fontSize={14}
                            my={4}
                            variant="ghost"
                        >
                            Logout
                        </Button>
                    </Flex>
                </Box>
                <Box
                    sx={{
                        transform: open ? `translate(80%)` : `translate(0)`,
                        transition: 'transform 0.2s ease-in'
                    }}
                >
                    <Flex
                        px={2}
                        height={menuBarHeight.mobile}
                        alignItems="center"
                        justifyContent="space-between"
                        borderBottom="1px solid"
                        borderBottomColor="gray.200"
                    >
                        <IconButton
                            aria-label="Menu"
                            size="sm"
                            variant="ghost"
                            icon={<MenuIcon />}
                            onClick={() => setOpen(!open)}
                        />
                        <Box
                            as="img"
                            src={logo}
                            position="absolute"
                            height={6}
                            left={0}
                            right={0}
                            mx="auto"
                            alt="Hunar Logo"
                        />
                    </Flex>
                    <Box
                        height={`calc(100vh - ${menuBarHeight.mobile})`}
                        overflow="auto"
                    >
                        {children}
                    </Box>
                </Box>
            </Box>
        </>
    ) : (
        <>
            <Flex
                px={4}
                height={menuBarHeight.desktop}
                alignItems="center"
                justifyContent="space-between"
                borderBottom="1px solid"
                borderBottomColor="gray.200"
            >
                <Box
                    as="img"
                    src={logo}
                    height="100%"
                    py={4}
                    pr={3}
                    alt="Hunar Logo"
                />
                <Flex as="nav" height="100%" alignItems="center" flexGrow={1}>
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
            <Box
                height={`calc(100vh - ${menuBarHeight.desktop})`}
                overflow="auto"
            >
                {children}
            </Box>
        </>
    );
};
