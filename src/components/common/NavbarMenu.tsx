import { Link as RouterLink } from 'react-router-dom';

import {
    Badge,
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Portal
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import type { MenuProps } from 'interfaces';

interface NavbarMenuProps {
    isActive: boolean;
    menuTitle: string;
    menuLink?: string;
    subMenus?: MenuProps['subMenus'];
    isNewFeature?: boolean;
}

export const NavbarMenu = ({
    isActive,
    menuLink,
    menuTitle,
    subMenus,
    isNewFeature
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
                        rightIcon={<ChevronDownIcon fontSize="lg" />}
                    >
                        {menuTitle}
                    </MenuButton>
                    <Portal>
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
                    </Portal>
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
                    {isNewFeature && (
                        <Badge colorScheme="green" sx={{ ml: 1, p: 1 }}>
                            {'New'}
                        </Badge>
                    )}
                </Button>
            )}
        </Flex>
    );
};
