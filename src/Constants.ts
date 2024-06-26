import { CHECK_INTEREST_PROVIDER } from 'Enum';
import type {
    CompanySettingsProps,
    LeadSettingsProps,
    LmsSettingsProps
} from 'interfaces';

export const NAVBAR_HEIGHT = '56px';

export const DEFAULT_LMS_SETTINGS: LmsSettingsProps = {
    blockMessaging: false,
    checkInterestProvider: CHECK_INTEREST_PROVIDER.WATI
};

export const DEFAULT_LEAD_SETTINGS: LeadSettingsProps = {
    bulkRequiredFields: ['full_name', 'mobile_number'],
    useJobQueryFields: false,
    onboardingRequiredFields: [
        'full_name',
        'mobile_number',
        'current_district',
        'current_state',
        'current_address',
        'job_roles'
    ],
    singleWorkerRequiredFields: [
        'full_name',
        'mobile_number',
        'current_district',
        'current_state',
        'current_address',
        'job_roles'
    ]
};

export const DEFAULT_COMPANY_SETTINGS: CompanySettingsProps = {
    lmsSettings: DEFAULT_LMS_SETTINGS,
    workerSettings: DEFAULT_LEAD_SETTINGS
};

export const DEFAULT_COMPANY_ADDRESS = 'Plot in Gurgaon, Haryana';
