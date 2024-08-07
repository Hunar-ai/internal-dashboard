import { Box, Button, GridItem, SimpleGrid, Text } from '@chakra-ui/react';

import { LoaderBackdrop } from './LoaderBackdrop';

interface FormWrapperProps {
    formTitle: string;
    children: React.ReactNode;
    isFormDisabled: boolean;
    isLoading: boolean;
    onSubmit: VoidFunction;
}

export const FormWrapper = ({
    formTitle,
    children,
    isFormDisabled,
    isLoading,
    onSubmit
}: FormWrapperProps) => {
    return (
        <>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                padding={4}
                position="relative"
            >
                {isFormDisabled && (
                    <LoaderBackdrop isFullScreen={false} zIndex={1} />
                )}
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacingX={6}
                    spacingY={4}
                    width="100%"
                    alignItems="start"
                >
                    <GridItem colSpan={{ base: 1, md: 2 }} mb={4}>
                        <Text
                            fontSize="xl"
                            lineHeight={1.4}
                            width="100%"
                            fontWeight={600}
                        >
                            {formTitle}
                        </Text>
                    </GridItem>
                    {children}
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacingX={6} mt={8}>
                    <GridItem colStart={{ base: 1, md: 2 }} textAlign="end">
                        <Button
                            colorScheme="blue"
                            onClick={onSubmit}
                            isDisabled={isFormDisabled}
                            isLoading={isLoading}
                        >
                            SAVE AND PUBLISH
                        </Button>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </>
    );
};
