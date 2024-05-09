import { Box, Flex, VStack, Text } from '@chakra-ui/react';

export const CreateCompanyContainer = () => {
    return (
        <>
            <Flex justifyContent="center" alignItems="center" mt={10}>
                <Box
                    px={8}
                    py={6}
                    maxW="lg"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    width="50%"
                    height={'40%'}
                >
                    <VStack spacing={5}>
                        <Text
                            fontSize="xl"
                            lineHeight={1.4}
                            width="100%"
                            fontWeight={600}
                        >
                            Create Company
                        </Text>
                    </VStack>
                </Box>
            </Flex>
        </>
    );
};
