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

export interface NudgesProps {
    isEnabled: boolean;
    duration: number;
}

export interface ISCommunicationSettingsProps {
    general: {
        isSchedulingForQualifiedEnabled: boolean;
        isReschedulingByCandidateEnabled: boolean;
        isContactingByCandidateEnabled: boolean;
        isFeedbackOnRejectionEnabled: boolean;
    };
    preInterview: {
        isConfirmationEnabled: boolean;
        isReminderEnabled: boolean;
    };
    postInterview: {
        isFollowUpEnabled: boolean;
        isNoShowFollowUpEnabled: boolean;
    };
    nudges: {
        checkInterest: NudgesProps;
        qualificationMessage: NudgesProps;
        noResponse: NudgesProps;
    };
}

export interface CompanySettingsProps {
    lmsSettings: LmsSettingsProps;
    workerSettings: LeadSettingsProps;
    dashboardSettings: {
        interviewCommunication: ISCommunicationSettingsProps;
    };
}

export interface CompanyFormProps {
    companyId: string;
    name: string;
    description: string;
    rawAddress: string;
    email: string;
    mobileNumber: string;
    settings: {
        lmsSettings: LmsSettingsProps;
    };
}
