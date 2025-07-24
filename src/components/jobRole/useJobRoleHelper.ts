import React from 'react';
import { jobRoleProps } from 'interfaces/jobRole.interface';
import { OptionsProps } from 'interfaces/option.interface';

export const useJobRoleHelper = (jobRoleData?: jobRoleProps[]) => {
    const jobRoleOptions: OptionsProps = React.useMemo(() => {
        return (jobRoleData ?? [])?.map(jobRole => ({
            value: jobRole.id,
            label: jobRole.name
        }));
    }, [jobRoleData]);

    const jobRoleMap = React.useMemo(() => {
        return (jobRoleData ?? [])?.reduce((map, jobRole) => {
            return { ...map, [jobRole.id]: jobRole };
        }, {} as Record<string, jobRoleProps>);
    }, [jobRoleData]);

    return { jobRoleOptions, jobRoleMap };
};
