import React from 'react';

import { PERSONNEL_TYPE } from 'Enum';

interface SettingsContextType {
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
}

export const settingsInitialState: SettingsContextType = {
    loggedInPersonnel: {
        personnelId: '',
        fullName: null,
        role: null,
        email: null,
        mobileNumber: null,
        personalizationDetails: null,
        type: null
    }
};

export const SettingsContext = React.createContext({} as SettingsContextType);
