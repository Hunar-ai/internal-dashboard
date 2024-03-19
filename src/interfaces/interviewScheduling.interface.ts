export type NudgesProps = {
    isEnabled: boolean;
    duration: number;
};

export interface JQCommSettingsProps {
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
