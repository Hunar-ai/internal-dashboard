import { CHECK_INTEREST_PROVIDER } from 'Enum';

import type { PaginationInfo } from 'interfaces';

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

export interface OnboardingSettingsProps {
    enableWorkerSourceAffinity: boolean;
    workerSourceAffinityPeriod?: number;
}

export interface CareerPageSettingsProps {
    logo1: string;
    logo2?: string;
    bannerImg: string;
    companyName: string;
    primaryColor: string;
    bannerTextColor: string;
    learnMoreLink: string;
    description: string;
}

export interface CompanySettingsProps {
    lmsSettings: LmsSettingsProps;
    workerSettings: LeadSettingsProps;
    onboardingSettings: OnboardingSettingsProps;
    careerPageSettings: CareerPageSettingsProps;
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

export type CompanyDetailsFormProps = Omit<
    CompanyFormProps,
    'settings' | 'governmentIdentifiers'
>;

export interface GetCompaniesResponse {
    data: CompanyFormProps[];
    paginationInfo: PaginationInfo;
}

export type CareerPageFormProps = Omit<
    CareerPageSettingsProps,
    'logo1' | 'logo2'
> & {
    primaryLogo: string;
    secondaryLogo: string;
    companyId: string;
};
