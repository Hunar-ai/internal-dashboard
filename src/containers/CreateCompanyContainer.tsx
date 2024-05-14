import { Flex, useToast } from '@chakra-ui/react';

import { CompanyCreationForm } from '@components/company';

import { useAddDNSRecord } from 'hooks/apiHooks/company/useAddDNSRecord';
import { useAddDomainAlias } from 'hooks/apiHooks/company/useAddDomainAlias';
import { useCreateCompany } from 'hooks/apiHooks/company/useCreateCompany';

import type { CompanyFormProps } from 'interfaces';

export const CreateCompanyContainer = () => {
    const toast = useToast();
    const createCompany = useCreateCompany();
    const addDNSRecord = useAddDNSRecord();
    const addDomainAlias = useAddDomainAlias();

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
            <CompanyCreationForm
                isLoading={createCompany.isLoading}
                onSubmitClick={onSubmitClick}
            />
        </Flex>
    );
};
