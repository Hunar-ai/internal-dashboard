import React from 'react';

import { Box, Flex, useToast, VStack, Text } from '@chakra-ui/react';

import { CompanyCreationForm, DomainUpdateStatus } from '@components/company';

import GoogleIconImage from 'assets/google.png';
import NetlifyIconImage from 'assets/netlify.png';

import { useAddDNSRecord } from 'hooks/apiHooks/company/useAddDNSRecord';
import { useAddDomainAlias } from 'hooks/apiHooks/company/useAddDomainAlias';
import { useCreateCompany } from 'hooks/apiHooks/company/useCreateCompany';

import type { CompanyFormProps } from 'interfaces';

export const CreateCompanyContainer = () => {
    const toast = useToast();
    const createCompany = useCreateCompany();
    const addDNSRecord = useAddDNSRecord();
    const addDomainAlias = useAddDomainAlias();

    const [formCompanyId, setFormCompanyId] = React.useState('');

    const showCreationStatus = React.useMemo(() => {
        return (
            createCompany.isSuccess &&
            (addDNSRecord.isLoading ||
                addDNSRecord.isSuccess ||
                addDNSRecord.isError) &&
            (addDomainAlias.isLoading ||
                addDomainAlias.isSuccess ||
                addDomainAlias.isError)
        );
    }, [
        addDNSRecord.isError,
        addDNSRecord.isLoading,
        addDNSRecord.isSuccess,
        addDomainAlias.isError,
        addDomainAlias.isLoading,
        addDomainAlias.isSuccess,
        createCompany.isSuccess
    ]);

    const createDNSRecord = (companyId: string) => {
        addDNSRecord.mutate({
            params: { companyId },
            requestBody: { name: `${companyId}.hunar.ai` }
        });
    };

    const createDomainAlias = (companyId: string) => {
        addDomainAlias.mutate({
            params: { companyId },
            requestBody: { domainAlias: `${companyId}.hunar.ai` }
        });
    };

    const onSubmitClick = (form: CompanyFormProps) => {
        createCompany.mutate(
            {
                params: { companyId: form.companyId },
                requestBody: form
            },
            {
                onSuccess: () => {
                    setFormCompanyId(form.companyId);
                    createDNSRecord(form.companyId);
                    createDomainAlias(form.companyId);
                },
                onError: error => {
                    toast({
                        title: 'Failed to create company',
                        description: error.errors.displayError,
                        status: 'error',
                        duration: 9000,
                        isClosable: true
                    });
                }
            }
        );
    };

    return (
        <Flex justifyContent="center" alignItems="center" my={6}>
            {showCreationStatus ? (
                <Box
                    px={8}
                    py={6}
                    borderWidth={{ base: 0, sm: '1px' }}
                    borderRadius="lg"
                    width="lg"
                >
                    <VStack spacing={6}>
                        <Text
                            fontSize="xl"
                            lineHeight={1.4}
                            width="100%"
                            fontWeight={600}
                        >
                            {addDNSRecord.isError || addDomainAlias.isError
                                ? 'Company domain creation failed'
                                : 'Company created successfully!'}
                        </Text>
                        <DomainUpdateStatus
                            icon={<img src={GoogleIconImage} />}
                            isRetrying={addDNSRecord.isLoading}
                            isSuccessful={addDNSRecord.isSuccess}
                            title="Google DNS"
                            errorMessage={
                                addDNSRecord.error?.errors.displayError
                            }
                            onRetryClick={() => createDNSRecord(formCompanyId)}
                        />
                        <DomainUpdateStatus
                            icon={<img src={NetlifyIconImage} />}
                            isRetrying={addDomainAlias.isLoading}
                            isSuccessful={addDomainAlias.isSuccess}
                            title="Netlify"
                            errorMessage={
                                addDomainAlias.error?.errors.displayError
                            }
                            onRetryClick={() =>
                                createDomainAlias(formCompanyId)
                            }
                        />
                    </VStack>
                </Box>
            ) : (
                <CompanyCreationForm
                    isLoading={createCompany.isLoading}
                    onSubmitClick={onSubmitClick}
                />
            )}
        </Flex>
    );
};
