import React from 'react';

import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Select,
    VStack,
    useToast
} from '@chakra-ui/react';

import { useResetNotify } from 'hooks/apiHooks/useResetPassword';
import { useSearchPersonnels } from 'hooks/apiHooks/useSearchPersonnels';

import type { PersonnelProps } from 'interfaces';

export const ResetPasswordContainer = () => {
    const [companyId, setCompanyId] = React.useState<string | undefined>(
        undefined
    );
    const [selectedPersonnelId, setSelectedPersonnelId] = React.useState<
        string | undefined
    >('');
    const [getPersonnels, setGetPersonnels] = React.useState(false);
    const [personnelOptions, setPersonnelOptions] = React.useState<
        PersonnelProps[]
    >([]);

    const toast = useToast();
    const { data: searchPersonnelResponse, isFetching } = useSearchPersonnels({
        params: {
            companyId
        },
        body: {
            page: 1,
            itemsPerPage: 1000
        },
        enabled: !!getPersonnels
    });

    const resetPasswordAndNotify = useResetNotify();

    React.useEffect(() => {
        setPersonnelOptions(searchPersonnelResponse?.data ?? []);
    }, [searchPersonnelResponse?.data]);

    const onReset = () => {
        const personnel = searchPersonnelResponse?.data.find(
            datum => datum.personnelId === selectedPersonnelId
        );
        if (companyId && personnel && selectedPersonnelId)
            resetPasswordAndNotify.mutate(
                {
                    companyId,
                    email: personnel.email,
                    personnelId: selectedPersonnelId
                },
                {
                    onSuccess: () => {
                        toast({
                            title: 'Password reset successfully!',
                            description:
                                'Personnel must have receieved an email!',
                            status: 'success',
                            duration: 9000,
                            isClosable: true
                        });
                    },
                    onError: apiError => {
                        toast({
                            title: 'Something went wrong!',
                            description: apiError.errors.displayError,
                            status: 'error',
                            duration: 9000,
                            isClosable: true
                        });
                    }
                }
            );
    };

    return (
        <>
            <Flex justifyContent="center" alignItems="center" mt={10}>
                <Box
                    p={5}
                    maxW="lg"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    width="50%"
                    height={'40%'}
                >
                    <VStack spacing={5}>
                        <InputGroup>
                            <Input
                                placeholder={'Enter Company Id'}
                                type="text"
                                name="companyID"
                                onChange={e => {
                                    setPersonnelOptions([]);
                                    setSelectedPersonnelId('');
                                    setCompanyId(e.target.value);
                                }}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="xs"
                                    onClick={() => {
                                        setGetPersonnels(true);
                                        setTimeout(() => {
                                            setGetPersonnels(false);
                                        }, 1000);
                                    }}
                                    isLoading={isFetching}
                                    isDisabled={!companyId}
                                >
                                    SUBMIT
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        <FormControl>
                            <FormLabel>Personnels</FormLabel>
                            <Select
                                value={selectedPersonnelId}
                                placeholder="Select option"
                                onChange={e => {
                                    setSelectedPersonnelId(e.target.value);
                                }}
                            >
                                {personnelOptions.map(datum => (
                                    <option
                                        value={datum.personnelId}
                                        key={datum.personnelId}
                                    >
                                        {datum.fullName} - {datum.email}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <Button
                                colorScheme="blue"
                                size="sm"
                                width={'100%'}
                                onClick={onReset}
                                isLoading={resetPasswordAndNotify.isLoading}
                                loadingText="Submitting"
                                fontSize={12}
                                isDisabled={!companyId || !selectedPersonnelId}
                            >
                                RESET
                            </Button>
                        </FormControl>
                    </VStack>
                </Box>
            </Flex>
        </>
    );
};
