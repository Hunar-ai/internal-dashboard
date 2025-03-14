import { ModalWrapper } from '../ModalWrapper';
import {
    Divider,
    Typography,
    List,
    ListItem,
    ListItemText
} from '@mui/material';

interface CandidateProfile {
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
}

export const Candidate = ({ data: candidate }: CandidateProfile) => {
    return (
        <>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                {candidate?.candidateName ?? 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
                <strong>Role:</strong> {candidate?.role ?? 'N/A'} at{' '}
                {candidate?.companyName ?? 'N/A'}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Growth:</strong> {candidate?.growth ?? 'N/A'}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Benefits:</strong> {candidate?.benefits ?? 'N/A'}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Compensation:</strong>{' '}
                {candidate?.compensation ?? 'N/A'}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Location:</strong> {candidate?.locationCity ?? 'N/A'} (
                {candidate?.locationType ?? 'N/A'})
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
                <strong>Current Role:</strong> {candidate?.currentRole ?? 'N/A'}{' '}
                at {candidate?.currentCompany ?? 'N/A'}
            </Typography>

            <Divider sx={{ marginY: 2 }} />
            <Typography variant="body1"><strong>Key Selling Points</strong></Typography>
            <List dense>
                {candidate?.sellingPoints?.length ? (
                    candidate.sellingPoints.map((point, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText primary={point} />
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body2">N/A</Typography>
                )}
            </List>

            <Typography variant="subtitle1"><strong>Achievements</strong></Typography>
            <List dense>
                {candidate?.achievements?.length ? (
                    candidate.achievements.map((achievement, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText primary={achievement} />
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body2">N/A</Typography>
                )}
            </List>

            <Typography variant="subtitle1"><strong>Skills</strong></Typography>
            <List dense>
                {candidate?.techSkills?.length ? (
                    candidate.techSkills.map((skill, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText primary={skill} />
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body2">N/A</Typography>
                )}
            </List>

            <Divider sx={{ marginY: 2 }} />
            <Typography variant="body1" >
                <strong>Recruiter:</strong>{' '}
                {candidate?.companyRecruiter ?? 'N/A'}
            </Typography>
        </>
    );
};

export const Context = ({ cell }) => {
    return (
        <ModalWrapper title="Call Context" CTA="View Context">
            <Candidate data={cell?.value} />
        </ModalWrapper>
    );
};
