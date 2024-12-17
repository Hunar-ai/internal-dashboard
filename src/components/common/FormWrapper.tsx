import {
    Box,
    Button,
    GridItem,
    SimpleGrid,
    Text,
    type ResponsiveValue
} from '@chakra-ui/react';

import { LoaderBackdrop } from './LoaderBackdrop';

interface FormWrapperProps {
    formTitle: string;
    children: React.ReactNode;
    isFormDisabled: boolean;
    isLoading: boolean;
    width?: ResponsiveValue<string | number>;
    gridColumns?: ResponsiveValue<number>;
    onSubmit: VoidFunction;
}

export const FormWrapper = ({
    formTitle,
    children,
    isFormDisabled,
    isLoading,
    width = undefined,
    gridColumns = undefined,
    onSubmit
}: FormWrapperProps) => {
    const columns = gridColumns ?? { base: 1, md: 2 };
    return (
        <>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                padding={4}
                position="relative"
                width={width}
            >
                {isFormDisabled && (
                    <LoaderBackdrop isFullScreen={false} zIndex={1} />
                )}
                <SimpleGrid
                    columns={columns}
                    spacingX={6}
                    spacingY={4}
                    width="100%"
                    alignItems="start"
                >
                    <GridItem colSpan={columns} mb={4}>
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
                <SimpleGrid columns={columns} spacingX={6} mt={8}>
                    <GridItem colStart={columns} textAlign="end">
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
