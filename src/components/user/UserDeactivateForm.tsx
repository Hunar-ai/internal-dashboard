import React from 'react';

import {
    Box,
    Button,
    Flex,
    FormControl,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    VStack
} from '@chakra-ui/react';

import { AppLoader, HelperText, TextField } from '@components/common';
import { UserDeactivateDialog } from './UserDeactivateDialog';

import { useToast } from 'hooks/useToast';
import { useRemovePersonnel } from 'hooks/apiHooks/useRemovePersonnel';
import { useSearchPersonnels } from 'hooks/apiHooks/useSearchPersonnels';
import { useValidationHelper } from 'hooks';

import type { PersonnelProps, ValidationMapProps } from 'interfaces';
import { ErrorMsg, RegExUtil } from 'utils';

const DEACTIVATION_BLOCKED_USERS: string[] =
    import.meta.env.VITE_DEACTIVATION_BLOCKED_USERS.split(',');

const validationMap: ValidationMapProps = {
    companyId: (companyId: string) => RegExUtil.isId(companyId),
    personnelId: (personnelId: string) => RegExUtil.isId(personnelId)
};

const formErrorStateInitialValues = {
    companyId: false,
    personnelId: false
};

export const UserDeactivateForm = () => {
    const removePersonnel = useRemovePersonnel();
    const { showError, showSuccess } = useToast();
    const { hasFormFieldError } = useValidationHelper(validationMap);

    const [companyId, setCompanyId] = React.useState<string | undefined>(
        undefined
    );
    const [personnelId, setPersonnelId] = React.useState<string | undefined>(
        undefined
    );
    const [isSearchPersonnelsEnabled, setIsSearchPersonnelsEnabled] =
        React.useState(false);
    const [formErrorState, setFormErrorState] = React.useState({
        ...formErrorStateInitialValues
    });
    const [selectedPersonnel, setSelectedPersonnel] = React.useState<
        PersonnelProps | undefined
    >(undefined);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const { data: searchPersonnelResponse, isFetching } = useSearchPersonnels({
        params: { companyId },
        body: { page: 1, itemsPerPage: 1000 },
        enabled: !!isSearchPersonnelsEnabled
    });

    const isDeactivateBtnDisabled = React.useMemo(
        () => !companyId || !personnelId || removePersonnel.isSuccess,
        [companyId, personnelId, removePersonnel.isSuccess]
    );

    const onCompanyIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const modifiedCompanyId = e.target.value.trimStart();
        setPersonnelId(undefined);
        setCompanyId(modifiedCompanyId);
        setFormErrorState(prevErrorState => ({
            ...prevErrorState,
            companyId: hasFormFieldError({
                fieldName: 'companyId',
                fieldValue: modifiedCompanyId,
                isRequired: false
            })
        }));
    };

    const onPersonnelIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const modifiedPersonnelId = e.target.value.trimStart();
        setPersonnelId(modifiedPersonnelId);
        setFormErrorState(prevErrorState => ({
            ...prevErrorState,
            personnelId: hasFormFieldError({
                fieldName: 'personnelId',
                fieldValue: modifiedPersonnelId,
                isRequired: false
            })
        }));
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

        if (!personnel) {
            showError({
                title: 'Not Found',
                description: 'No personnel found with the provided personnel id'
            });
        } else if (DEACTIVATION_BLOCKED_USERS.indexOf(personnel.email) > -1) {
            showError({
                title: 'Unauthorized!',
                description: 'You are not allowed to deactivate this personnel!'
            });
        } else {
            setSelectedPersonnel(personnel);
            setIsDialogOpen(true);
        }
    };

    const onDialogSubmitClick = () => {
        if (companyId && personnelId)
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
                        setIsDialogOpen(false);
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
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
                    {removePersonnel.isLoading && <AppLoader zIndex={1410} />}
                    <VStack spacing={5}>
                        <Text
                            fontSize="xl"
                            lineHeight={1.4}
                            width="100%"
                            fontWeight={600}
                        >
                            {`Deactivate User`}
                        </Text>
                        <FormControl isInvalid={formErrorState.companyId}>
                            <InputGroup>
                                <Input
                                    placeholder={'Enter Company Id'}
                                    type="text"
                                    name="companyId"
                                    value={companyId || ''}
                                    onChange={onCompanyIdChange}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button
                                        h="1.75rem"
                                        size="xs"
                                        onClick={onCompanyIdSubmit}
                                        isLoading={isFetching}
                                        isDisabled={!companyId}
                                    >
                                        {`SUBMIT`}
                                    </Button>
                                </InputRightElement>
                                <HelperText
                                    hasError={formErrorState.companyId}
                                    errorMsg={ErrorMsg.id()}
                                />
                            </InputGroup>
                        </FormControl>
                        <TextField
                            isDisabled={!searchPersonnelResponse}
                            label="Personnel Id"
                            placeholder="Enter Personnel Id"
                            name="personnelId"
                            value={personnelId || ''}
                            onChange={onPersonnelIdChange}
                            isInvalid={formErrorState.personnelId}
                            helperText={
                                <HelperText
                                    hasError={formErrorState.personnelId}
                                    errorMsg={ErrorMsg.id()}
                                />
                            }
                        />
                        <FormControl>
                            <Button
                                colorScheme="blue"
                                size="sm"
                                width="100%"
                                onClick={onDeactivateClick}
                                isLoading={removePersonnel.isLoading}
                                loadingText="Submitting"
                                fontSize={12}
                                isDisabled={isDeactivateBtnDisabled}
                            >
                                {`DEACTIVATE`}
                            </Button>
                        </FormControl>
                        {selectedPersonnel && (
                            <UserDeactivateDialog
                                isOpen={isDialogOpen}
                                personnelId={selectedPersonnel.personnelId}
                                personnelName={selectedPersonnel.fullName}
                                personnelEmail={selectedPersonnel.email}
                                personnelMobileNumber={
                                    selectedPersonnel.mobileNumber
                                }
                                onSubmitClick={onDialogSubmitClick}
                                onCancelClick={() => setIsDialogOpen(false)}
                            />
                        )}
                    </VStack>
                </Box>
            </Flex>
        </>
    );
};
