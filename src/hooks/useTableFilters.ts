import { OptionProps, DateFilterStateProps } from 'interfaces';
import { useState, useMemo } from 'react';

export interface TableFilters {
    status?: string;
    createdAt?: DateFilterStateProps;
}

export const useTableFilters = () => {
    const [filters, setFilters] = useState<TableFilters>({});

    const booleanOptions: OptionProps[] = useMemo(
        () => [
            { label: 'Yes', value: 'TRUE' },
            { label: 'No', value: 'FALSE' }
        ],
        []
    );

    // TODO: Use form-fields
    const statusOptions: OptionProps[] = useMemo(
        () => [
            { label: 'Completed', value: 'completed' },
            { label: 'No Answer', value: 'no-answer' },
            { label: 'Failed', value: 'failed' },
            { label: 'Busy', value: 'busy' },
            { label: 'Canceled', value: 'canceled' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Queued', value: 'queued' },
            { label: 'Ringing', value: 'ringing' },
            { label: 'Initiated', value: 'initiated' }
        ],
        []
    );

    return {
        filters,
        setFilters,
        booleanOptions,
        statusOptions
    };
};
