import React from 'react';

import { VStack, Grid, GridItem } from '@chakra-ui/react';

import { CompanyAddForm, CompanyDomainStatus } from '@components/company';

import { useAddDNSRecord } from 'hooks/apiHooks/company/useAddDNSRecord';
import { useAddDomainAlias } from 'hooks/apiHooks/company/useAddDomainAlias';

import { NAVBAR_HEIGHT } from 'Constants';

const RETRY_LIMIT = 3;

export const CompanyAddView = () => {
    const addDNSRecord = useAddDNSRecord();
    const addDomainAlias = useAddDomainAlias();

    const [formCompanyId, setFormCompanyId] = React.useState('');
    const [showDNSStatus, setShowDNSStatus] = React.useState(false);
    const [showDomainAliasStatus, setShowDomainAliasStatus] =
        React.useState(false);
    const [dnsRetryCount, setDnsRetryCount] = React.useState(0);
    const [domainAliasRetryCount, setDomainAliasRetryCount] = React.useState(0);

    const isDomainStatusVisible = React.useMemo(() => {
        return formCompanyId && showDNSStatus && showDomainAliasStatus;
    }, [formCompanyId, showDNSStatus, showDomainAliasStatus]);

    const isAddingDomain = React.useMemo(() => {
        return (
            !isDomainStatusVisible &&
            (addDNSRecord.isLoading || addDomainAlias.isLoading)
        );
    }, [
        addDNSRecord.isLoading,
        addDomainAlias.isLoading,
        isDomainStatusVisible
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

    const onCompanyCreate = (companyId: string) => {
        setFormCompanyId(companyId);
        createDNSRecord(companyId);
        createDomainAlias(companyId);
    };

    return (
        <Grid
            templateColumns={{ base: 'auto', sm: '7fr 5fr' }}
            height={`calc(100vh - ${NAVBAR_HEIGHT})`}
        >
            <GridItem rowStart={{ base: 2, sm: 1 }}>
                <CompanyAddForm
                    isCreateBtnLoading={isAddingDomain}
                    onCreate={onCompanyCreate}
                />
            </GridItem>
            <GridItem borderLeftWidth={{ base: 0, sm: 1 }}>
                {isDomainStatusVisible && (
                    <VStack spacing={6} px={8} pt={6}>
                        <CompanyDomainStatus
                            title="Google DNS"
                            isRetrying={addDNSRecord.isLoading}
                            isSuccessful={addDNSRecord.isSuccess}
                            isRetryVisible={dnsRetryCount <= RETRY_LIMIT}
                            onRetryClick={() => createDNSRecord(formCompanyId)}
                        />
                        <CompanyDomainStatus
                            title="Netlify"
                            isRetrying={addDomainAlias.isLoading}
                            isSuccessful={addDomainAlias.isSuccess}
                            isRetryVisible={
                                domainAliasRetryCount <= RETRY_LIMIT
                            }
                            onRetryClick={() =>
                                createDomainAlias(formCompanyId)
                            }
                        />
                    </VStack>
                )}
            </GridItem>
        </Grid>
    );
};
