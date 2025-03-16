import { TableFilters } from 'hooks/useTableFilters';
import { FilterKeyProps } from 'interfaces/filter.interface';
import { useCallback } from 'react';
import { TimeUtils } from 'utils';

export const useHelper = () => {
    const getRelativeDateField = (fieldValue: string | null) => {
        return fieldValue ? TimeUtils.timeSince(fieldValue) : '';
    };

    const isMultiSelect = useCallback((columnId: FilterKeyProps) => {
        return columnId === 'status';
    }, []);

    const isDateRangeSelect = useCallback((columnId: FilterKeyProps) => {
        return columnId === 'createdAt';
    }, []);

    const getFormattedBooleanFilters = (filters: Record<string, unknown>) => {
        const modifiedFilters = { ...filters };
        if (
            'hasOwnVehicle' in modifiedFilters &&
            typeof modifiedFilters.hasOwnVehicle === 'boolean'
        ) {
            modifiedFilters['hasOwnVehicle'] =
                modifiedFilters.hasOwnVehicle === false
                    ? ['FALSE']
                    : modifiedFilters.hasOwnVehicle === true
                    ? ['TRUE']
                    : [];
        }
        if (
            'hasSkillCertification' in modifiedFilters &&
            typeof modifiedFilters.hasSkillCertification === 'boolean'
        ) {
            modifiedFilters['hasSkillCertification'] =
                modifiedFilters.hasSkillCertification === false
                    ? ['FALSE']
                    : modifiedFilters.hasSkillCertification === true
                    ? ['TRUE']
                    : [];
        }
        if (
            'isDifferentlyAbled' in modifiedFilters &&
            typeof modifiedFilters.isDifferentlyAbled === 'boolean'
        ) {
            modifiedFilters['isDifferentlyAbled'] =
                modifiedFilters.isDifferentlyAbled === false
                    ? ['FALSE']
                    : modifiedFilters.isDifferentlyAbled === true
                    ? ['TRUE']
                    : [];
        }
        if (
            'bankDetailsAvailable' in modifiedFilters &&
            typeof modifiedFilters.bankDetailsAvailable === 'boolean'
        ) {
            modifiedFilters['bankDetailsAvailable'] =
                modifiedFilters.bankDetailsAvailable === false
                    ? ['FALSE']
                    : modifiedFilters.bankDetailsAvailable === true
                    ? ['TRUE']
                    : [];
        }
        if (
            'isAadhaarVerified' in modifiedFilters &&
            typeof modifiedFilters.isAadhaarVerified === 'boolean'
        ) {
            modifiedFilters['isAadhaarVerified'] =
                modifiedFilters.isAadhaarVerified === false
                    ? ['FALSE']
                    : modifiedFilters.isAadhaarVerified === true
                    ? ['TRUE']
                    : [];
        }
        if (
            'isBankAccountVerified' in modifiedFilters &&
            typeof modifiedFilters.isBankAccountVerified === 'boolean'
        ) {
            modifiedFilters['isBankAccountVerified'] =
                modifiedFilters.isBankAccountVerified === false
                    ? ['FALSE']
                    : modifiedFilters.isBankAccountVerified === true
                    ? ['TRUE']
                    : [];
        }
        if (
            'isDoubleVaccinated' in modifiedFilters &&
            typeof modifiedFilters.isDoubleVaccinated === 'boolean'
        ) {
            modifiedFilters['isDoubleVaccinated'] =
                modifiedFilters.isDoubleVaccinated === false
                    ? ['FALSE']
                    : modifiedFilters.isDoubleVaccinated === true
                    ? ['TRUE']
                    : [];
        }
        return modifiedFilters;
    };

    const getFormattedfilters = (filters: TableFilters) => {
        let modifiedFilters = { ...filters };
        modifiedFilters = getFormattedBooleanFilters(
            modifiedFilters as Record<string, unknown>
        );

        for (const modifiedFilterKey of Object.keys(modifiedFilters)) {
            const filterKey = modifiedFilterKey as keyof typeof modifiedFilters;
            if (Array.isArray(modifiedFilters[filterKey])) {
                const filter = (
                    modifiedFilters[filterKey] ? modifiedFilters[filterKey] : []
                ) as string[];
                if (filter?.length === 0) {
                    delete modifiedFilters[filterKey];
                }
            } else {
                if (
                    Object.keys(modifiedFilters[filterKey] || {}).length === 0
                ) {
                    delete modifiedFilters[filterKey];
                }
            }
        }

        return modifiedFilters;
    };

    return {
        getFormattedfilters,
        getRelativeDateField,
        isMultiSelect,
        isDateRangeSelect
    };
};
