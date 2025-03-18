import { useCallback } from 'react';

import { FilterKeyProps } from 'interfaces';

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
