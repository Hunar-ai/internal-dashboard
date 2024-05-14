import { CHECK_INTEREST_PROVIDER } from 'Enum';
import type {
    CompanySettingsProps,
    ISCommunicationSettingsProps,
    LeadSettingsProps,
    LmsSettingsProps
} from 'interfaces';

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

export const DEFAULT_IS_COMMUNICATION_SETTINGS: ISCommunicationSettingsProps = {
    general: {
        isSchedulingForQualifiedEnabled: true,
        isReschedulingByCandidateEnabled: true,
        isContactingByCandidateEnabled: true,
        isFeedbackOnRejectionEnabled: false
    },
    preInterview: {
        isConfirmationEnabled: false,
        isReminderEnabled: true
    },
    postInterview: {
        isFollowUpEnabled: true,
        isNoShowFollowUpEnabled: true
    },
    nudges: {
        checkInterest: {
            isEnabled: true,
            duration: 5
        },
        qualificationMessage: {
            isEnabled: true,
            duration: 5
        },
        noResponse: {
            isEnabled: true,
            duration: 5
        }
    }
};

export const DEFAULT_COMPANY_SETTINGS: CompanySettingsProps = {
    lmsSettings: DEFAULT_LMS_SETTINGS,
    workerSettings: DEFAULT_LEAD_SETTINGS,
    dashboardSettings: {
        interviewCommunication: DEFAULT_IS_COMMUNICATION_SETTINGS
    }
};
