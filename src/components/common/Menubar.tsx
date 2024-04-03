import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerOverlay,
    Flex,
    IconButton
} from '@chakra-ui/react';
import MenuIcon from '@mui/icons-material/Menu';

import { useIsMobile, useMenubarConfig, useToken } from 'hooks';

export const Menubar = () => {
    const { removeToken } = useToken();
    const navigate = useNavigate();
    const menuConfig = useMenubarConfig();
    const { pathname } = useLocation();
    const isMobile = useIsMobile();

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

    return (
        <>
            <Flex
                px={4}
                as="header"
                height={14}
                alignItems="center"
                borderBottom="1px solid"
                borderBottomColor="gray.200"
            >
                {!isMobile ? (
                    <>
                        <Flex
                            as="nav"
                            height="100%"
                            alignItems="center"
                            flexGrow={1}
                        >
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
                    </>
                ) : (
                    <>
                        <IconButton
                            aria-label="Menu"
                            icon={<MenuIcon />}
                            onClick={() => setOpen(true)}
                        />
                        <Drawer
                            placement="left"
                            isOpen={open}
                            onClose={() => setOpen(false)}
                        >
                            <DrawerOverlay />
                            <DrawerContent maxW={'min-content'}>
                                <DrawerBody px={2}>
                                    <Flex
                                        flexDirection="column"
                                        alignItems="start"
                                        rowGap={2}
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
                                            >
                                                {menu.title}
                                            </Button>
                                        ))}
                                    </Flex>
                                </DrawerBody>
                            </DrawerContent>
                        </Drawer>
                    </>
                )}
            </Flex>
        </>
    );
};
