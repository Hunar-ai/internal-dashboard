import { OptionProps, DateFilterStateProps, FormFields } from 'interfaces';
import { useState, useMemo } from 'react';

export interface TableFilters {
    status?: string;
    createdAt?: DateFilterStateProps;
}

export const useTableFilters = (formFields?: FormFields) => {
    const [filters, setFilters] = useState<TableFilters>({});

    const booleanOptions: OptionProps[] = useMemo(
        () => [
            { label: 'Yes', value: 'TRUE' },
            { label: 'No', value: 'FALSE' }
        ],
        []
    );

    const statusOptions = useMemo(() => {
        if (formFields) return formFields?.twilioStatus;
        return [];
    }, [formFields]);

    return {
        filters,
        setFilters,
        booleanOptions,
        statusOptions
    };
};
