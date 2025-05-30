import React from 'react';
import { useSearchParams } from 'react-router-dom';

import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Grid, Typography } from '@mui/material';

import { SearchBar } from '@hunar.ai/hunar-design-system';
import { Select } from '@components/common';

import { useGetNehaAgentPendingCalls } from 'hooks/apiHooks/nehaAgents/useGetNehaAgentPendingCalls';
import { useExportNehaAgentCalls } from 'hooks/apiHooks/nehaAgents/useExportNehaAgentCalls';
import { useErrorHelper } from 'hooks/useErrorHelper';
import { useToast } from 'hooks/useToast';
import { useGetFormFields } from 'hooks';

import type { OptionProps, TableFiltersProps } from 'interfaces';
import { FALL_BACK_VALUE, MIME_TYPE } from 'Enum';

interface AgentTableHeaderProps {
    company: OptionProps | null;
    onCompanyChange: (company: OptionProps | null) => void;
    setSearchKey: (_: string) => void;
    filters: TableFiltersProps;
}

export const NehaAgentsTableHeader = ({
    company,
    filters,
    onCompanyChange,
    setSearchKey
}: AgentTableHeaderProps) => {
    const { showError, showSuccess } = useToast();
    const [searchParams, setSearchParams] = useSearchParams();
    const { getApiErrorMsg } = useErrorHelper();
    const exportNehaSelectCalls = useExportNehaAgentCalls();
    const { data } = useGetFormFields();

    const { data: pendingCallsData, isFetching } = useGetNehaAgentPendingCalls({
        enabled: !!company?.value,
        params: { companyId: company?.value ?? '' }
    });

    const onUploadClick = () => {
        searchParams.set('upload', 'true');
        setSearchParams(searchParams);
    };

    const saveFile = (data: string) => {
        const file = new File([data], 'leads.csv', {
            type: MIME_TYPE.TEXT_CSV
        });
        const url = URL.createObjectURL(file);
        window.open(url, '_blank');
        URL.revokeObjectURL(url);
    };

    const exportLeads = async (companyId: string) => {
        try {
            const data = await exportNehaSelectCalls.mutateAsync({
                params: { companyId },
                requestBody: { filters }
            });
            return data;
        } catch (error) {
            const errorMsg = getApiErrorMsg(error);
            showError({ title: 'Error', description: errorMsg });
        }
    };

    const onExportClick = () => {
        if (!company?.value) return;

        exportLeads(company?.value).then(data => {
            if (!data) return;

            saveFile(data);
            showSuccess({
                title: 'Success',
                description: 'Leads exported successfully!'
            });
        });
    };

    return (
        <>
            <Grid
                item
                xs={12}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap={1.5}
            >
                <Grid display="flex" alignItems="center" gap={1.5}>
                    <Select
                        label="Select Company Id"
                        name="companyId"
                        placeholder="Select Company Id"
                        options={data?.nehaAgentsAllowedCompanies ?? []}
                        value={company}
                        size={'small'}
                        sx={{ width: '280px' }}
                        onChange={(_, selectedOption) => {
                            if (selectedOption) {
                                onCompanyChange(selectedOption as OptionProps);
                            } else {
                                onCompanyChange(null);
                            }
                        }}
                    />
                    <Typography variant="body2">
                        {`Pending Calls: ${
                            isFetching
                                ? 'Loading...'
                                : pendingCallsData?.callsCount ??
                                  FALL_BACK_VALUE.NOT_AVAILABLE
                        }`}
                    </Typography>
                </Grid>
                <Grid display="flex" alignItems="center" gap={1.5}>
                    <SearchBar
                        setSearchValue={setSearchKey}
                        placeholder="Search"
                    />
                    <LoadingButton
                        loading={exportNehaSelectCalls.isLoading}
                        variant="outlined"
                        color="primary"
                        size="medium"
                        disabled={!company}
                        onClick={onExportClick}
                    >
                        {`EXPORT`}
                    </LoadingButton>
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        disabled={!company}
                        onClick={onUploadClick}
                    >
                        {`UPLOAD`}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};
