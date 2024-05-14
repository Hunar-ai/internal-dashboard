import { CHECK_INTEREST_PROVIDER } from 'Enum';

export interface LmsSettingsProps {
    blockMessaging: boolean;
    checkInterestProvider?: CHECK_INTEREST_PROVIDER;
}

export interface LeadSettingsProps {
    bulkRequiredFields: string[];
    useJobQueryFields: boolean;
    onboardingRequiredFields: string[];
    singleWorkerRequiredFields: string[];
}

export interface CompanySettingsProps {
    lmsSettings: LmsSettingsProps;
    workerSettings: LeadSettingsProps;
}

export interface CompanyFormProps {
    companyId: string;
    name: string;
    description: string;
    rawAddress: string;
    email: string;
    mobileNumber: string;
    governmentIdentifiers: {
        gstin: string;
    };
    settings: CompanySettingsProps;
}
