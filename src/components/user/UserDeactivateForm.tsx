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
    Text,
    VStack
} from '@chakra-ui/react';

import { LoaderBackdrop } from '@components/common';

import { useToast } from 'hooks/useToast';
import { useRemovePersonnel } from 'hooks/apiHooks/useRemovePersonnel';
import { useSearchPersonnels } from 'hooks/apiHooks/useSearchPersonnels';

import type { PersonnelProps } from 'interfaces';

export const UserDeactivateForm = () => {
    const removePersonnel = useRemovePersonnel();
    const { showError, showSuccess } = useToast();

    const [companyId, setCompanyId] = React.useState<string | undefined>(
        undefined
    );
    const [personnelId, setPersonnelId] = React.useState<string | undefined>(
        undefined
    );
    const [isSearchPersonnelsEnabled, setIsSearchPersonnelsEnabled] =
        React.useState(false);
    const [personnelOptions, setPersonnelOptions] = React.useState<
        PersonnelProps[]
    >([]);

    const { data: searchPersonnelResponse, isFetching } = useSearchPersonnels({
        params: { companyId },
        body: { page: 1, itemsPerPage: 1000 },
        enabled: !!isSearchPersonnelsEnabled
    });

    React.useEffect(() => {
        setPersonnelOptions(searchPersonnelResponse?.data ?? []);
    }, [searchPersonnelResponse?.data]);

    const onCompanyIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPersonnelOptions([]);
        setPersonnelId(undefined);
        setCompanyId(e.target.value);
    };

    const onCompanyIdSubmit = () => {
        setIsSearchPersonnelsEnabled(true);
        setTimeout(() => {
            setIsSearchPersonnelsEnabled(false);
        }, 1000);
    };

    const onDeactivateClick = () => {
        const personnel = searchPersonnelResponse?.data.find(
            datum => datum.personnelId === personnelId
        );

        if (companyId && personnel && personnelId)
            removePersonnel.mutate(
                {
                    params: { companyId, personnelId }
                },
                {
                    onSuccess: () => {
                        showSuccess({
                            title: 'Success',
                            description: 'User deactivated successfully!'
                        });
                    },
                    onError: apiError => {
                        showError({
                            title: 'Error',
                            description: apiError.errors.displayError
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
                    position="relative"
                >
                    {removePersonnel.isSuccess && (
                        <LoaderBackdrop isFullScreen={false} zIndex={1} />
                    )}
                    <VStack spacing={5}>
                        <Text
                            fontSize="xl"
                            lineHeight={1.4}
                            width="100%"
                            fontWeight={600}
                        >
                            {`Deactivate User`}
                        </Text>
                        <InputGroup>
                            <Input
                                placeholder={'Enter Company Id'}
                                type="text"
                                name="companyId"
                                isDisabled={removePersonnel.isSuccess}
                                onChange={onCompanyIdChange}
                            />
                            <InputRightElement width="4.5rem">
                                <Button
                                    h="1.75rem"
                                    size="xs"
                                    onClick={onCompanyIdSubmit}
                                    isLoading={isFetching}
                                    isDisabled={
                                        !companyId || removePersonnel.isSuccess
                                    }
                                >
                                    {`SUBMIT`}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <FormControl isDisabled={removePersonnel.isSuccess}>
                            <FormLabel>Personnels</FormLabel>
                            <Select
                                value={personnelId}
                                placeholder="Select personnel"
                                onChange={e => setPersonnelId(e.target.value)}
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
                                width="100%"
                                onClick={onDeactivateClick}
                                isLoading={removePersonnel.isLoading}
                                loadingText="Submitting"
                                fontSize={12}
                                isDisabled={
                                    !companyId ||
                                    !personnelId ||
                                    removePersonnel.isSuccess
                                }
                            >
                                {`DEACTIVATE`}
                            </Button>
                        </FormControl>
                    </VStack>
                </Box>
            </Flex>
        </>
    );
};
