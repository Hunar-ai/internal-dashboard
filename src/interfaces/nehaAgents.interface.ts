export interface NehaAgentCallProps {
    id: string;
    external_call_id: string;
    lead_id: string;
    language: string;
    status: string;
    willingness_to_proceed: boolean | null;
    explanation: string | null;
    call_later: boolean;
    next_steps: string[];
    concerns: string[];
    recording_url: string | null;
    duration: number;
    created_at: string;
    updated_at: string;
}

export interface NehaAgentPendingCallsProps {
    callsCount: number;
}
