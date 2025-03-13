import { TableFilters } from 'hooks/useTableFilters';
import { DateRangeFilterKeyProps } from 'interfaces';
import { FilterKeyProps } from 'interfaces/filter.interface';
import { useCallback } from 'react';
import { TimeUtils } from 'utils';
import { get } from 'lodash';

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

    const getFormattedRangeFilters = (filters: TableFilters) => {
        let modifiedFilters = { ...filters };
        if (modifiedFilters.age) {
            if (modifiedFilters.minAge) delete modifiedFilters.minAge;
            if (modifiedFilters.maxAge) delete modifiedFilters.maxAge;
        } else {
            if (modifiedFilters.minAge) {
                modifiedFilters = {
                    ...modifiedFilters,
                    age: {
                        ...(modifiedFilters.age || {}),
                        min: modifiedFilters.minAge
                    }
                };
            }
            if (modifiedFilters.maxAge) {
                modifiedFilters = {
                    ...modifiedFilters,
                    age: {
                        ...(modifiedFilters.age || {}),
                        max: modifiedFilters.maxAge
                    }
                };
            }
            delete modifiedFilters.minAge;
            delete modifiedFilters.maxAge;
        }
        if (modifiedFilters.currentSalary) {
            if (modifiedFilters.minCurrentSalary)
                delete modifiedFilters.minCurrentSalary;
            if (modifiedFilters.maxCurrentSalary)
                delete modifiedFilters.maxCurrentSalary;
        } else {
            if (modifiedFilters.minCurrentSalary) {
                modifiedFilters = {
                    ...modifiedFilters,
                    currentSalary: {
                        ...(modifiedFilters.currentSalary || {}),
                        min: modifiedFilters.minCurrentSalary
                    }
                };
            }
            if (modifiedFilters.maxCurrentSalary) {
                modifiedFilters = {
                    ...modifiedFilters,
                    currentSalary: {
                        ...(modifiedFilters.currentSalary || {}),
                        max: modifiedFilters.maxCurrentSalary
                    }
                };
            }
            delete modifiedFilters.minCurrentSalary;
            delete modifiedFilters.maxCurrentSalary;
        }
        if (modifiedFilters.expectedSalary) {
            if (modifiedFilters.minExpectedSalary)
                delete modifiedFilters.minExpectedSalary;
            if (modifiedFilters.maxExpectedSalary)
                delete modifiedFilters.maxExpectedSalary;
        } else {
            if (modifiedFilters.minExpectedSalary) {
                modifiedFilters = {
                    ...modifiedFilters,
                    expectedSalary: {
                        ...(modifiedFilters.expectedSalary || {}),
                        min: modifiedFilters.minExpectedSalary
                    }
                };
            }
            if (modifiedFilters.maxExpectedSalary) {
                modifiedFilters = {
                    ...modifiedFilters,
                    expectedSalary: {
                        ...(modifiedFilters.expectedSalary || {}),
                        max: modifiedFilters.maxExpectedSalary
                    }
                };
            }
            delete modifiedFilters.minExpectedSalary;
            delete modifiedFilters.maxExpectedSalary;
        }
        if (modifiedFilters.age) {
            if (modifiedFilters.minAge) delete modifiedFilters.minAge;
            if (modifiedFilters.maxAge) delete modifiedFilters.maxAge;
        } else {
            if (modifiedFilters.minAge) {
                modifiedFilters = {
                    ...modifiedFilters,
                    age: {
                        ...(modifiedFilters.age || {}),
                        min: modifiedFilters.minAge
                    }
                };
            }
            if (modifiedFilters.maxAge) {
                modifiedFilters = {
                    ...modifiedFilters,
                    age: {
                        ...(modifiedFilters.age || {}),
                        max: modifiedFilters.maxAge
                    }
                };
            }
            delete modifiedFilters.minAge;
            delete modifiedFilters.maxAge;
        }

        return modifiedFilters;
    };

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
        let modifiedFilters = getFormattedRangeFilters(filters);
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
                    filterKey === 'age' ||
                    filterKey === 'yearsOfExperience' ||
                    filterKey === 'currentSalary' ||
                    filterKey === 'expectedSalary'
                ) {
                    const min = get(modifiedFilters, `${filterKey}.min`);
                    const max = get(modifiedFilters, `${filterKey}.max`);
                    if (
                        (typeof min === 'number' && isNaN(min)) ||
                        min === null ||
                        `${min}` === ''
                    )
                        delete modifiedFilters[filterKey]?.min;
                    if (
                        (typeof max === 'number' && isNaN(max)) ||
                        max === null ||
                        `${max}` === ''
                    )
                        delete modifiedFilters[filterKey]?.max;
                }
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
