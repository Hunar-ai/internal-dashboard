export interface NehaSelectLeadProps {
    id: string;
    name: string;
    mobileNumber: string;
    jobRole: string;
    companyName: string;
    companyId: string;
    resumeText: string;
    jobDescriptionText: string;
    createdAt: string;
    updatedAt: string;
    callsCount: number;
    callsList: NehaSelectCallProps[];
}

interface NehaSelectCallProps {
    id: string;
    external_call_id: string;
    lead_id: string;
    language: string;
    status: string;
    result: Record<string, any>;
    willingness_to_proceed: boolean | null;
    explanation: string | null;
    call_later: boolean;
    next_steps: string[];
    concerns: string[];
    transcript: any[];
    recording_url: string | null;
    duration: number;
    created_at: string;
    updated_at: string;
}
