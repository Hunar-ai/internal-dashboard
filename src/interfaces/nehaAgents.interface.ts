export interface NehaAgentCallProps {
    id: string;
    external_call_id: string;
    lead_id: string;
    language: string;
    status: string;
    callEndedBy: string;
    recording_url: string | null;
    duration: number;
    created_at: string;
    updated_at: string;
}

export interface NehaAgentPendingCallsProps {
    callsCount: number;
}
