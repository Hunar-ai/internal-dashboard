import React from 'react';

import { type FormFields, type Company, type PersonnelProps } from 'interfaces';
import { PERSONNEL_TYPE } from 'Enum';

interface SettingsContextType {
    showSidebar: boolean;
    menuDrawerOpen: boolean;
    handleCloseMenu: VoidFunction;
    handleOpenMenu: VoidFunction;
    formFields: FormFields;
    company: Company;
    loggedInPersonnel?: {
        fullName?: string | null;
        role?: string | null;
        email?: string | null;
        personnelId: string;
        mobileNumber?: string | null;
        personalizationDetails?: {
            searchHistoryKeywords?: [
                {
                    label: string;
                    timestamp: number;
                }
            ];
        } | null;
        type?: PERSONNEL_TYPE | null;
    };
    personnelData: PersonnelProps[];
}

export const settingsInitialState: SettingsContextType = {
    showSidebar: true,
    menuDrawerOpen: true,
    handleCloseMenu: () => undefined,
    handleOpenMenu: () => undefined,
    formFields: {
        gender: [],
        educationalQualificationType: [],
        educationalQualificationDetail: [],
        district: [],
        preferredLanguages: [],
        willingToMove: [],
        englishProficiency: [],
        vehicleOptions: [],
        maritalStatus: [],
        jobRoles: [],
        state: [],
        perkOptions: [],
        workerStatus: [],
        jobQueryWorkerStatus: [],
        employerJobQueryWorkerStatus: [],
        referrerType: [],
        logoPlacement: [],
        documentType: [],
        jobQueryWorkerCommentStatus: [],
        jobQueryWorkerCommunicationStatus: [],
        verificationStatus: [],
        channelType: [],
        channel: [],
        matchLabel: [],
        candidateStatus: [],
        interviewScheduleStatus: [],
        interviewTurnUpStatus: [],
        interviewSelectionStatus: [],
        interviewMode: []
    },
    company: {
        name: '',
        settings: {
            workerSettings: {
                bulkRequiredFields: [],
                onboardingRequiredFields: [],
                singleWorkerRequiredFields: []
            },
            dashboardSettings: {
                onboarding: {
                    disableAadhaarOtpVerification: false,
                    disableFormTemplateCreation: false,
                    disableWorkspaceCreation: false,
                    editableFields: []
                },
                vendor: {
                    disableVerification: false
                }
            }
        }
    },
    loggedInPersonnel: {
        personnelId: '',
        fullName: null,
        role: null,
        email: null,
        mobileNumber: null,
        type: null
    },
    personnelData: []
};

export const SettingsContext = React.createContext({} as SettingsContextType);
