import React from 'react';

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

import { RegExUtil } from 'utils';
import { CHECK_INTEREST_PROVIDER } from 'Enum';

const companyFormInitState = {
    companyId: '',
    name: '',
    description: '',
    rawAddress: 'Plot in Gurgaon, Haryana',
    email: '',
    mobileNumber: '',
    governamentIdentifiers: {
        gstin: ''
    },
    settings: {
        lmsSettings: {
            blockMessaging: false,
            checkInterestProvider: CHECK_INTEREST_PROVIDER.WATI
        }
    }
};

interface CompanyFormProps {
    companyId: string;
    name: string;
    description: string;
    rawAddress: string;
    email: string;
    mobileNumber: string;
    governamentIdentifiers: {
        gstin: string;
    };
    settings: {
        lmsSettings: {
            blockMessaging: boolean;
            checkInterestProvider: CHECK_INTEREST_PROVIDER;
        };
    };
}

export const CreateCompanyContainer = () => {
    const [form, setForm] = React.useState<CompanyFormProps>({
        ...companyFormInitState
    });

    const onFormFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setForm(oldForm => ({ ...oldForm, [fieldName]: fieldValue }));

        if (fieldName === 'name') {
            const companyId = RegExUtil.conformToId(fieldValue);
            setForm(oldForm => ({
                ...oldForm,
                companyId,
                description: fieldValue
            }));
        }
    };

    const onBlockMessagingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.checked;

        setForm(oldForm => ({
            ...oldForm,
            settings: {
                ...oldForm.settings,
                lmsSettings: {
                    ...oldForm.settings.lmsSettings,
                    [fieldName]: !fieldValue
                }
            }
        }));
    };

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
                    alignItems="start"
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
                        <Input
                            placeholder="Enter Company Name"
                            name="name"
                            value={form.name}
                            onChange={onFormFieldChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Company ID</FormLabel>
                        <Input
                            placeholder="Enter Company ID"
                            name="companyId"
                            value={form.companyId}
                            onChange={onFormFieldChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Email ID of Company POC</FormLabel>
                        <Input
                            placeholder="Enter Email ID"
                            name="email"
                            value={form.email}
                            onChange={onFormFieldChange}
                        />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Phone Number of Company POC</FormLabel>
                        <Input
                            placeholder="Enter Phone Number"
                            name="mobileNumber"
                            value={form.mobileNumber}
                            onChange={onFormFieldChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Textarea
                            placeholder="Enter Address"
                            name="rawAddress"
                            value={form.rawAddress}
                            onChange={onFormFieldChange}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            placeholder="Enter Description"
                            name="description"
                            value={form.description}
                            onChange={onFormFieldChange}
                        />
                    </FormControl>
                    <FormControl
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <FormLabel>Allow Messaging</FormLabel>
                        <Switch
                            name="blockMessaging"
                            isChecked={
                                !form.settings.lmsSettings.blockMessaging
                            }
                            onChange={onBlockMessagingChange}
                        />
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
