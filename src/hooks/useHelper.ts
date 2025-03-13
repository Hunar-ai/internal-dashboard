import { FilterKeyProps } from 'interfaces/filter.interface';
import { useCallback } from 'react';

export const useHelper = () => {
    const isMultiSelect = useCallback((columnId: FilterKeyProps) => {
        return columnId === 'status';
    }, []);

    const isDateRangeSelect = useCallback((columnId: FilterKeyProps) => {
        return columnId === 'createdAt';
    }, []);

    return {
        isMultiSelect,
        isDateRangeSelect
    };
};
