import React from 'react';

import { OptionProps, DateFilterStateProps, FormFields } from 'interfaces';

export interface TableFilters {
    status?: string;
    createdAt?: DateFilterStateProps;
}

export const useTableFilters = (formFields?: FormFields) => {
    const [filters, setFilters] = React.useState<TableFilters>({});

    const booleanOptions: OptionProps[] = React.useMemo(
        () => [
            { label: 'Yes', value: 'TRUE' },
            { label: 'No', value: 'FALSE' }
        ],
        []
    );

    const statusOptions = React.useMemo(() => {
        if (formFields) return formFields?.twilioStatus;
        return [];
    }, [formFields]);

    const willingnessToProceedOptions = React.useMemo(() => {
        if (formFields) return formFields?.nehaSelectWillingnessToProceed;
        return [];
    }, [formFields]);

    const callLanguageOptions = React.useMemo(() => {
        if (formFields) return formFields?.callLanguage;
        return [];
    }, [formFields]);

    const callLaterOptions = React.useMemo(() => {
        if (formFields) return formFields?.nehaSelectCallLater;
        return [];
    }, [formFields]);

    return {
        filters,
        setFilters,
        booleanOptions,
        statusOptions,
        willingnessToProceedOptions,
        callLanguageOptions,
        callLaterOptions
    };
};
