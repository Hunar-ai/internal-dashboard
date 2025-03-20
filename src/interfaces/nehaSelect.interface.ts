export interface NehaSelectLeadProps {
    id: string;
    name: string;
    mobileNumber: string;
    jobRole: string;
    companyName: string;
    companyId: string;
    resumeText: string;
    resumeAnalysis: ResumeAnalysisProps;
    jobDescriptionText: string;
    jobDescriptionAnalysis: JobDescriptionAnalysisProps;
    matchAnalysis: MatchAnalysisProps;
    createdAt: string;
    updatedAt: string;
    callsCount: number;
    callsList: CallInfoProps[];
}

interface ResumeAnalysisProps {
    skills: {
        soft: string[];
        technical: string[];
        certifications: string[] | null;
    };
    education: {
        highestDegree: string;
        relevantCourses: string[] | null;
    };
    experience: {
        totalYears: string;
        currentRole: {
            title: string;
            company: string;
            duration: string;
            achievements: string[] | null;
            responsibilities: string[] | null;
        };
        previousRoles: {
            title: string;
            company: string;
            duration: string;
            achievements: string[] | null;
        }[];
    };
    personalInfo: {
        name: string;
        location: string;
        noticePeriod: string | null;
        expectedSalary: string | null;
        willingToRelocate: boolean | null;
    };
    careerHighlights: string[] | null;
    jobChangeMotivators: string[] | null;
}

interface JobDescriptionAnalysisProps {
    role: string;
    company: string;
    location: {
        city: string;
        type: string;
    };
    department: string;
    compensation: {
        base: string;
        bonuses: string[];
        benefits: string[];
        stockOptions: string[] | null;
    };
    skillsRequired: {
        soft: string[];
        technical: string[] | null;
        experience: string;
    };
    responsibilities: string[];
    companyHighlights: {
        culture: string[];
        stability: string[] | null;
        achievements: string[];
    };
    growthOpportunities: string[];
    uniqueSellingPoints: string[];
}

interface MatchAnalysisProps {
    name: string;
    score: string;
    reason: string;
    riskFactors: string[];
    matchAnalysis: {
        cultureFit: {
            score: string;
            analysis: string;
        };
        skillMatch: {
            extra: string[];
            score: string;
            missing: string[];
            matching: string[];
        };
        roleAlignment: {
            score: string;
            analysis: string;
        };
        experienceMatch: {
            score: string;
            analysis: string;
        };
    };
    sellingPoints: string[];
    talkingPoints: string[];
}

interface CallInfoProps {
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
    context: {
        role: string;
        growth: string;
        benefits: string;
        call_sid: string;
        tech_skills: string[];
        total_years: string;
        achievements: string[];
        company_name: string;
        compensation: string;
        current_role: string;
        location_city: string;
        location_type: string;
        candidate_name: string;
        selling_points: string[];
        current_company: string;
        company_recruiter: string;
    };
    created_at: string;
    updated_at: string;
}
