import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, ThemeProvider, Typography } from '@mui/material';

import { AppLoader, Select } from '@components/common';
import { useCompanyHelper } from '@components/company/useCompanyHelper';
import { useLoiHelper } from '@components/loi/useLoiHelper';

import { useGetCompanies } from 'hooks/apiHooks/company/useGetCompanies';
import { useGetLoiForCompany } from 'hooks/apiHooks/loi/useGetLoiForCompany';
import { useDeleteLoi } from 'hooks/apiHooks/loi/useDeleteLoi';
import { useToast } from 'hooks/useToast';

import { CREATE_NEW_LOI_ID } from 'Constants';
import { OptionProps, OptionsProps } from 'interfaces';
import { theme } from 'theme';

export const LoiView = () => {
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();

    const [company, setCompany] = React.useState<OptionProps | null>(() => {
        return null;
    });
    const [loi, setLoi] = React.useState<OptionProps | null>(() => {
        return null;
    });

    const { data: companiesResponse, isFetching: isCompaniesLoading } =
        useGetCompanies();
    const { companyIdOptions } = useCompanyHelper(companiesResponse?.data);
    const {
        data: companyLoiList,
        isFetching: isLoiListLoading,
        refetch: refetchLoiForCompany
    } = useGetLoiForCompany({
        params: { companyId: company ? company?.value : '' },
        enabled: Boolean(company?.value)
    });
    const { loiIdOptions } = useLoiHelper(companyLoiList);
    const deleteLoi = useDeleteLoi();

    const hasNoLoiRecords = React.useMemo(() => {
        return (
            company?.value &&
            !isLoiListLoading &&
            (companyLoiList?.length ?? 0) === 0
        );
    }, [company, companyLoiList, isLoiListLoading]);

    const navigateToCreateLoiView = () => {
        if (!company?.value) {
            return;
        }

        navigate({
            pathname: `${location.pathname}/${company?.value}/${CREATE_NEW_LOI_ID}`
        });
    };

    const navigateToLoiEditView = () => {
        if (!company?.value || !loi?.value) {
            return;
        }

        navigate({
            pathname: `${location.pathname}/${company?.value}/${loi?.value}`
        });
    };

    const onCompanyChange = (
        _: React.SyntheticEvent,
        selectedOption: OptionProps | OptionsProps | null
    ) => {
        if (selectedOption === null) {
            setCompany(null);
        } else {
            setCompany(selectedOption as OptionProps);
        }
    };

    const onLoiChange = (
        _: React.SyntheticEvent,
        selectedOption: OptionProps | OptionsProps | null
    ) => {
        if (selectedOption === null) {
            setLoi(null);
        } else {
            setLoi(selectedOption as OptionProps);
        }
    };

    const onLoiDelete = () => {
        if (!loi?.value) {
            return;
        }

        if (confirm(`Are you sure you want to delete LOI ${loi.value}?`)) {
            deleteLoi.mutate(
                { params: { loiId: loi.value } },
                {
                    onSuccess: () => {
                        showSuccess({
                            title: `Success`,
                            description: 'LOI deleted'
                        });
                        refetchLoiForCompany();
                        setLoi({ label: '', value: '' });
                    },
                    onError: error => {
                        showError({
                            title: 'Error',
                            description: error.errors.displayError
                        });
                    }
                }
            );
        }
    };

    if (isCompaniesLoading) {
        return <AppLoader />;
    }

    return (
        <ThemeProvider theme={theme}>
            <Box p={4}>
                <Typography mb={1}>Select Company</Typography>
                <Select
                    label="Company ID"
                    name="companyId"
                    placeholder="Select Company ID"
                    options={companyIdOptions}
                    value={company}
                    disabled={isLoiListLoading}
                    required
                    onChange={onCompanyChange}
                />

                <Typography mt={2} mb={1}>
                    Select LOI
                </Typography>
                <Select
                    label="LOI ID"
                    name="loiId"
                    placeholder="Select LOI Id"
                    options={loiIdOptions}
                    value={loi}
                    disabled={!company?.value}
                    required
                    onChange={onLoiChange}
                    helperText={
                        hasNoLoiRecords
                            ? 'No LOI records for the selected company'
                            : ''
                    }
                />
                {company?.value ? (
                    <Box
                        display="flex"
                        gap={1}
                        mt={2}
                        justifyContent="flex-end"
                    >
                        <Button
                            variant="contained"
                            disabled={!loi?.value}
                            onClick={navigateToLoiEditView}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            disabled={!loi?.value}
                            color="error"
                            onClick={onLoiDelete}
                        >
                            Delete
                        </Button>

                        <Button
                            variant="outlined"
                            onClick={navigateToCreateLoiView}
                        >
                            Add New LOI
                        </Button>
                    </Box>
                ) : (
                    <></>
                )}
            </Box>
        </ThemeProvider>
    );
};
