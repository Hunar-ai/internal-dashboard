import { Divider } from '@mui/material';

import { PGMetricsModalField } from './PGMetricsModalField';
import { PGMetricsModalDataList } from './PGMetricsModalDataList';

interface ContextViewProps {
    data: {
        role?: string;
        growth?: string;
        benefits?: string;
        techSkills?: string[];
        totalYears?: string;
        achievements?: string[];
        companyName?: string;
        compensation?: string;
        currentRole?: string;
        locationCity?: string;
        locationType?: string;
        candidateName?: string;
        sellingPoints?: string[];
        currentCompany?: string;
        companyRecruiter?: string;
    };
}

export const ContextView = ({ data: candidate }: ContextViewProps) => {
    return (
        <>
            <PGMetricsModalField
                variant="h5"
                value={candidate?.candidateName ?? 'N/A'}
                sx={{ fontWeight: 'bold' }}
                gutterBottom
            />
            <PGMetricsModalField
                label="Role:"
                value={`${candidate?.role ?? 'N/A'} at ${
                    candidate?.companyName ?? 'N/A'
                }`}
                gutterBottom
            />
            <PGMetricsModalField
                label="Growth:"
                color="text.secondary"
                value={candidate?.growth ?? 'N/A'}
                gutterBottom
            />
            <PGMetricsModalField
                label="Benefits:"
                color="text.secondary"
                value={candidate?.benefits ?? 'N/A'}
                gutterBottom
            />
            <PGMetricsModalField
                label="Compensation:"
                color="text.secondary"
                value={candidate?.compensation ?? 'N/A'}
                gutterBottom
            />
            <PGMetricsModalField
                label="Location:"
                color="text.secondary"
                value={`${candidate?.locationCity ?? 'N/A'} ${
                    candidate?.locationType ?? 'N/A'
                }`}
                gutterBottom
            />
            <PGMetricsModalField
                label="Current Role:"
                color="text.secondary"
                value={`${candidate?.currentRole ?? 'N/A'} at ${
                    candidate?.currentCompany ?? 'N/A'
                }`}
                gutterBottom
            />

            <Divider sx={{ marginY: 2 }} />
            <PGMetricsModalDataList
                header="Key Selling Points"
                data={candidate?.sellingPoints ?? []}
            />
            <PGMetricsModalDataList
                header="Achievements"
                data={candidate?.achievements ?? []}
            />
            <PGMetricsModalDataList
                header="Skills"
                data={candidate?.techSkills ?? []}
            />
            <Divider sx={{ marginY: 2 }} />

            <PGMetricsModalField
                label="Recruiter:"
                value={candidate?.companyRecruiter ?? 'N/A'}
            />
        </>
    );
};
