import React from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import { Box, Flex, VStack, Text } from '@chakra-ui/react';

import { CompanyAddForm, DomainStatus } from '@components/company';

import GoogleIconImage from 'assets/google.png';
import NetlifyIconImage from 'assets/netlify.png';

import { useAddDNSRecord } from 'hooks/apiHooks/company/useAddDNSRecord';
import { useAddDomainAlias } from 'hooks/apiHooks/company/useAddDomainAlias';
import { useCreateCompany } from 'hooks/apiHooks/company/useCreateCompany';
import { useToast } from 'hooks/useToast';

import type { CompanyFormProps } from 'interfaces';

const RETRY_LIMIT = 3;

export const CompanyContainer = () => {
    const createCompany = useCreateCompany();
    const addDNSRecord = useAddDNSRecord();
    const addDomainAlias = useAddDomainAlias();
    const [searchParams] = useSearchParams();

    const { showError } = useToast();

    const [formCompanyId, setFormCompanyId] = React.useState('');
    const [showDNSStatus, setShowDNSStatus] = React.useState(false);
    const [showDomainAliasStatus, setShowDomainAliasStatus] =
        React.useState(false);
    const [dnsRetryCount, setDnsRetryCount] = React.useState(0);
    const [domainAliasRetryCount, setDomainAliasRetryCount] = React.useState(0);

    const isCreationStatusVisible = React.useMemo(() => {
        return (
            createCompany.isSuccess && showDNSStatus && showDomainAliasStatus
        );
    }, [createCompany.isSuccess, showDNSStatus, showDomainAliasStatus]);

    const isCreatingCompany = React.useMemo(() => {
        return (
            createCompany.isLoading ||
            addDNSRecord.isLoading ||
            addDomainAlias.isLoading
        );
    }, [
        addDNSRecord.isLoading,
        addDomainAlias.isLoading,
        createCompany.isLoading
    ]);

    const createDNSRecord = (companyId: string) => {
        addDNSRecord.mutate(
            {
                params: { companyId },
                requestBody: { name: `${companyId}.hunar.ai` }
            },
            {
                onSettled: () => {
                    setShowDNSStatus(true);
                    setDnsRetryCount(count => count + 1);
                }
            }
        );
    };

    const createDomainAlias = (companyId: string) => {
        addDomainAlias.mutate(
            {
                params: { companyId },
                requestBody: { domainAlias: `${companyId}.hunar.ai` }
            },
            {
                onSettled: () => {
                    setShowDomainAliasStatus(true);
                    setDomainAliasRetryCount(count => count + 1);
                }
            }
        );
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
                    showError({
                        title: 'Failed to create company',
                        description: error.errors.displayError
                    });
                }
            }
        );
    };

    if (!searchParams.has('add')) {
        return <Navigate to="/not-found" replace />;
    }

    return (
        <Flex justifyContent="center" alignItems="center" my={6}>
            {isCreationStatusVisible ? (
                <Box
                    px={8}
                    py={6}
                    borderWidth={{ base: 0, sm: 1 }}
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
                        <DomainStatus
                            iconSrc={GoogleIconImage}
                            title="Google DNS"
                            isRetrying={addDNSRecord.isLoading}
                            isSuccessful={addDNSRecord.isSuccess}
                            isRetryVisible={dnsRetryCount <= RETRY_LIMIT}
                            errorMessage={
                                addDNSRecord.error?.errors.displayError
                            }
                            onRetryClick={() => createDNSRecord(formCompanyId)}
                        />
                        <DomainStatus
                            iconSrc={NetlifyIconImage}
                            title="Netlify"
                            isRetrying={addDomainAlias.isLoading}
                            isSuccessful={addDomainAlias.isSuccess}
                            isRetryVisible={
                                domainAliasRetryCount <= RETRY_LIMIT
                            }
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
                <CompanyAddForm
                    isCreateBtnLoading={isCreatingCompany}
                    handleCompanyCreation={onSubmitClick}
                />
            )}
        </Flex>
    );
};
