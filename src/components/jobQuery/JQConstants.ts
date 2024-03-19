import type { JQCommSettingsProps } from 'interfaces';

export const InterviewSchedulingSettingsInitState: JQCommSettingsProps = {
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
