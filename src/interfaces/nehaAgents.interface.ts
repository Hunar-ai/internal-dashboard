export interface NehaAgentCallProps {
    id: string;
    externalCallId: string;
    lead: {
        id: string;
        companyId: string;
        name: string;
        mobileNumber: string;
        metaData: object;
        createdAt: string;
        updatedAt: string;
    };
    language: string;
    status: string;
    callEndedBy: string;
    recordingUrl: string | null;
    duration: number;
    createdAt: string;
    updatedAt: string;
}

export interface NehaAgentPendingCallsProps {
    callsCount: number;
}
