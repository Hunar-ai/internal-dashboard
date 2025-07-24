import { PaginationInfo } from './table.interface';

export interface AssessmentSettingsProps {
    emails: string[];
    isAssessmentEnabled: boolean;
    jobDescription: string;
    prompt: string | null;
}

export interface JobRoleSettingsProps {
    assessmentSettings?: AssessmentSettingsProps;
}

export interface jobRoleProps {
    companyId: string;
    id: string;
    email: string;
    mobileNumber: string;
    description_document_access_url: string;
    description_document: string;
    description_text: string;
    name: string;
    number_of_job_queries: number;
    settings: JobRoleSettingsProps;
}

export interface JobResponse {
    data: jobRoleProps[];
    paginationInfo: PaginationInfo;
}
