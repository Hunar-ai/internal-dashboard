import { ASSESSMENT_TYPE } from 'Enum';
import { PaginationInfo } from './table.interface';

export interface AssessmentSettingsProps {
    emails?: string[];
    isAssessmentEnabled: boolean;
    assessmentType: ASSESSMENT_TYPE;
    prompt: string;
    evaluationPrompt: string;
    callPrompt: string;
}

export interface JobRoleSettingsProps {
    assessmentSettings?: AssessmentSettingsProps;
}

export interface JobRoleProps {
    companyId: string;
    id: string;
    email: string;
    mobileNumber: string;
    descriptionDocumentAccessUrl: string;
    descriptionDocument: string;
    descriptionText: string;
    name: string;
    numberOfJobQueries: number;
    settings: JobRoleSettingsProps;
}

export interface JobResponse {
    data: JobRoleProps[];
    paginationInfo: PaginationInfo;
}
