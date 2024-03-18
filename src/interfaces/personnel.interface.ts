import { PERSONNEL_ROLE, PERSONNEL_TYPE } from 'Enum';
import type { AuditMetadata } from './form.interface';

export interface PersonnelProps {
    fullName: string;
    personnelId: string;
    email: string;
    mobileNumber: string;
    role: PERSONNEL_ROLE;
    type: PERSONNEL_TYPE;
    workspaceIds: string[];
    auditMetadata: AuditMetadata;
    personalizationDetails: {
        searchHistoryKeywords?: [{ label: string; timestamp: number }];
    } | null;
}

export interface PersonnelFiltersProps {
    role: PERSONNEL_ROLE[];
}
