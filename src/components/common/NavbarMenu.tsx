import { Link as RouterLink } from 'react-router-dom';

import { Button, Flex } from '@chakra-ui/react';

interface NavbarMenuProps {
    isActive: boolean;
    menuLink: string;
    menuTitle: string;
}

export const NavbarMenu = ({
    isActive,
    menuLink,
    menuTitle
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
            <Button
                as={RouterLink}
                to={menuLink}
                fontSize={14}
                variant="ghost"
                color={isActive ? 'blue.600' : undefined}
                sx={{
                    '&:hover': {
                        color: 'inherit'
                    }
                }}
            >
                {menuTitle}
            </Button>
        </Flex>
    );
};
