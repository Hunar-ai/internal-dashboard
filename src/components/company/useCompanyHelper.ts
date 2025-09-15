import React from 'react';

import type { CompanyFormProps, OptionsProps } from 'interfaces';

export const useCompanyHelper = (companyData?: CompanyFormProps[]) => {
    const generateRandomGSTIN = () => {
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        return `09AAACH${randomDigits}R4ZZ`;
    };

    const companyNameOptions: OptionsProps = React.useMemo(() => {
        return (companyData ?? [])
            ?.map(company => ({
                value: company.companyId,
                label: company.name
            }))
            .filter(company =>
                ['20augtestingco', 'bluejay-work-11', 'test-company'].includes(
                    company.value
                )
            );
    }, [companyData]);

    const companyIdOptions: OptionsProps = React.useMemo(() => {
        return (companyData ?? [])?.map(company => ({
            value: company.companyId,
            label: company.companyId
        }));
    }, [companyData]);

    const companyMap = React.useMemo(() => {
        return (companyData ?? [])?.reduce((map, company) => {
            return { ...map, [company.companyId]: company };
        }, {} as Record<string, CompanyFormProps>);
    }, [companyData]);

    return {
        generateRandomGSTIN,
        companyIdOptions,
        companyNameOptions,
        companyMap
    };
};
