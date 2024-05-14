import { CHECK_INTEREST_PROVIDER } from 'Enum';

export interface CompanyFormProps {
    companyId: string;
    name: string;
    description: string;
    rawAddress: string;
    email: string;
    mobileNumber: string;
    settings: {
        lmsSettings: {
            blockMessaging: boolean;
            checkInterestProvider: CHECK_INTEREST_PROVIDER;
        };
    };
}
