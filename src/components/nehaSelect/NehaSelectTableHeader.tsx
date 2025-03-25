import React from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Grid } from '@mui/material';

import { SearchBar } from '@hunar.ai/hunar-design-system';

import { useUpdateSearchParams } from 'hooks/useUpdateSearchParams';
import { useExportNehaSelectCalls } from 'hooks/apiHooks/nehaSelect/useExportNehaSelectCalls';

import type { TableFiltersProps } from 'interfaces';
import { useToast } from 'hooks/useToast';

interface NehaSelectTableHeaderProps {
    setSearchValue: (_: string) => void;
    filters: TableFiltersProps;
}

export const NehaSelectTableHeader = ({
    setSearchValue,
    filters
}: NehaSelectTableHeaderProps) => {
    const { showError, showSuccess } = useToast();
    const { append } = useUpdateSearchParams();
    const exportNehaSelectCalls = useExportNehaSelectCalls();

    const onUploadClick = () => {
        append('upload', 'true');
    };

    const onExportClick = () => {
        exportNehaSelectCalls.mutate(
            {
                params: { companyId: 'select' },
                requestBody: { filters }
            },
            {
                onSuccess: data => {
                    const file = new File([data], 'leads.csv', {
                        type: 'text/csv'
                    });
                    const url = URL.createObjectURL(file);
                    window.open(url, '_blank');
                    URL.revokeObjectURL(url);
                    showSuccess({
                        title: 'Success!',
                        description: 'Leads exported successfully'
                    });
                },
                onError: error => {
                    showError({
                        title: 'Error!',
                        description: error.errors.displayError
                    });
                }
            }
        );
    };
    return (
        <>
            <Grid
                item
                xs={12}
                display="flex"
                justifyContent="end"
                alignItems="center"
                gap={1.5}
            >
                <SearchBar
                    setSearchValue={setSearchValue}
                    placeholder="Search"
                />
                <LoadingButton
                    loading={exportNehaSelectCalls.isLoading}
                    variant="outlined"
                    color="primary"
                    size="medium"
                    onClick={onExportClick}
                >
                    EXPORT
                </LoadingButton>
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    onClick={onUploadClick}
                >
                    UPLOAD
                </Button>
            </Grid>
        </>
    );
};
