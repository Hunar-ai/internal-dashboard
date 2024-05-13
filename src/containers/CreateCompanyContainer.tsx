import {
    Box,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Switch,
    SimpleGrid,
    Button,
    GridItem
} from '@chakra-ui/react';

export const CreateCompanyContainer = () => {
    return (
        <Flex justifyContent="center" alignItems="center" my={6}>
            <Box
                px={8}
                py={6}
                borderWidth={{ base: 0, sm: '1px' }}
                borderRadius="lg"
                width="3xl"
            >
                <SimpleGrid
                    columns={{ base: 1, sm: 2 }}
                    spacingX={6}
                    spacingY={4}
                    width="100%"
                >
                    <GridItem colSpan={{ base: 1, sm: 2 }} mb={4}>
                        <Text
                            fontSize="xl"
                            lineHeight={1.4}
                            width="100%"
                            fontWeight={600}
                        >
                            Create Company
                        </Text>
                    </GridItem>
                    <FormControl isRequired>
                        <FormLabel>Company Name</FormLabel>
                        <Input placeholder="Enter Company Name" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Company ID</FormLabel>
                        <Input placeholder="Enter Company ID" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Email ID of Company POC</FormLabel>
                        <Input placeholder="Enter Email ID" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Phone Number of Company POC</FormLabel>
                        <Input placeholder="Enter Phone Number" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Textarea placeholder="Enter Address" />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea placeholder="Enter Description" />
                    </FormControl>
                    <FormControl
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <FormLabel>Allow Messaging</FormLabel>
                        <Switch />
                    </FormControl>
                </SimpleGrid>
                <SimpleGrid columns={{ base: 1, sm: 2 }} spacingX={6} mt={8}>
                    <GridItem colStart={{ base: 1, sm: 2 }} textAlign="end">
                        <Button size="md" colorScheme="gray" width="100%">
                            CREATE COMPANY
                        </Button>
                    </GridItem>
                </SimpleGrid>
            </Box>
        </Flex>
    );
};
