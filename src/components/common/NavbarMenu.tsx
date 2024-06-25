import { Link as RouterLink } from 'react-router-dom';

import {
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList
} from '@chakra-ui/react';

import type { MenuProps } from 'interfaces';

interface NavbarMenuProps {
    isActive: boolean;
    menuLink?: string;
    menuTitle: string;
    subMenus?: MenuProps['subMenus'];
}

export const NavbarMenu = ({
    isActive,
    menuLink,
    menuTitle,
    subMenus
}: NavbarMenuProps) => {
    return (
        <Flex
            height="100%"
            position="relative"
            flexDirection="column"
            justifyContent="center"
            sx={{
                '&::after': isActive
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
        >
            {subMenus ? (
                <Menu gutter={3} autoSelect={false}>
                    <MenuButton
                        as={Button}
                        fontSize={14}
                        variant="ghost"
                        color={isActive ? 'blue.600' : undefined}
                        sx={{ '&:hover': { color: 'inherit' } }}
                    >
                        {menuTitle}
                    </MenuButton>
                    <MenuList>
                        {subMenus.map(subMenu => (
                            <MenuItem
                                key={subMenu.id}
                                as={RouterLink}
                                to={subMenu.link}
                            >
                                {subMenu.title}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            ) : (
                <Button
                    as={RouterLink}
                    to={menuLink}
                    fontSize={14}
                    variant="ghost"
                    color={isActive ? 'blue.600' : undefined}
                    sx={{ '&:hover': { color: 'inherit' } }}
                >
                    {menuTitle}
                </Button>
            )}
        </Flex>
    );
};
