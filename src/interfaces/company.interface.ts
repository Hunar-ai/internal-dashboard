import { CHECK_INTEREST_PROVIDER } from 'Enum';

import type { ChecklistFieldProps, PaginationInfo } from 'interfaces';

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

export interface DashboardSettingsProps {
    selectionChecklist?: ChecklistFieldProps[];
}

export interface OnboardingSettingsProps {
    enableWorkerSourceAffinity: boolean;
    workerSourceAffinityPeriod?: number;
}

export interface CareerPageSettingsProps {
    logo1: string;
    logo2?: string;
    companyName: string;
    primaryColor: string;
    bannerBgColor: string;
    bannerTextColor: string;
    learnMoreLink: string;
    description: string;
}

export interface ReferralPageSettingsProps {
    logo: string;
    companyName: string;
    primaryColor: string;
    bannerBgColor: string;
    bannerTextColor: string;
    learnMoreLink: string;
}

export interface CompanySettingsProps {
    lmsSettings: LmsSettingsProps;
    workerSettings: LeadSettingsProps;
    dashboardSettings?: DashboardSettingsProps;
    onboardingSettings?: OnboardingSettingsProps;
    careerPageSettings?: CareerPageSettingsProps;
    referralPageSettings?: ReferralPageSettingsProps;
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

export type ReferralPageFormProps = ReferralPageSettingsProps & {
    companyId: string;
};
