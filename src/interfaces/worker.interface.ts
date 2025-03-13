import { type AuditMetadata } from './form.interface';

export interface BankAccountDetailsProps {
    accountHolderName: string | null;
    accountNumber: string | null;
    ifscCode: string | null;
}

export interface OtherDetailsProps {
    email: string | null;
    willingToMove: string | null;
    currentSalary: string | null;
    expectedSalary: string | null;
    isDifferentlyAbled: boolean | null;
}

export interface CreateWorkerFormBody {
    fullName: string | null;
    mobileNumber: string | null;
    educationalQualificationType: string[];
    aadhaarNumber: string | null;
    gender: string | null;
    yearOfBirth: string | null;
    currentAddress: string | null;
    currentState: string | null;
    currentDistrict: string | null;
    permanentAddress: string | null;
    permanentState: string | null;
    permanentDistrict: string | null;
    maritalStatus: string | null;
    preferredLanguages: string[];
    englishProficiency: string | null;
    hasSkillCertification: boolean | null;
    epfoUanNumber: string | null;
    ownedVehicle: string | null;
    yearsOfExperience: number | null;
    jobRoles: string[];
    isDoubleVaccinated: boolean | null;
    otherDetails: OtherDetailsProps;
    bankAccountDetails: BankAccountDetailsProps;
}

export interface AadhaarDetails {
    aadhaarLiteVerified?: boolean;
    isAadhaarVerified?: boolean;
}
export interface GetWorkerBody extends CreateWorkerFormBody {
    workerId: string;
    profileImage: string | null;
    aadhaarDetails: AadhaarDetails | null;
}

// export interface TableFiltersProps {
//     gender?: string[];
//     maritalStatus?: string[];
//     currentDistrict?: string[];
//     currentState?: string[];
//     permanentDistrict?: string[];
//     permanentState?: string[];
//     jobRoles?: string[];
//     preferredLanguages?: string[];
//     educationalQualificationType?: string[];
//     isAadhaarVerified?: string[];
//     isDifferentlyAbled?: string[];
//     hasOwnVehicle?: string[];
//     bankDetailsAvailable?: string[];
//     isDoubleVaccinated?: string[];
//     hasSkillCertification?: string[];
//     englishProficiency?: string[];
//     willingToMove?: string[];
//     workerStatus?: string[];
//     ownedVehicle?: string[];
//     jobQueryWorkerStatus?: string[];
//     isBankAccountVerified?: string[];
//     age?: {
//         min?: number;
//         max?: number;
//         none?: boolean;
//     };
//     yearsOfExperience?: {
//         min?: number;
//         max?: number;
//         none?: boolean;
//     };
//     currentSalary: {
//         min?: number;
//         max?: number;
//         none?: boolean;
//     };
//     expectedSalary: {
//         min?: number;
//         max?: number;
//         none?: boolean;
//     };
//     referrerType?: string[];
//     isCredentialsShared?: string[];
// }

export type RangeFilterKey =
    | 'age'
    | 'yearsOfExperience'
    | 'currentSalary'
    | 'expectedSalary';

export interface Worker {
    fullName: string;
    mobileNumber: string;
    state: string;
    district: string;
    educationalQualificationType: string[];
    workerId: string;
    gender: string;
    englishProficiency: string;
    workerStatus: string;
    currentState: string;
    currentDistrict: string;
    hasSkillCertification: boolean;
    preferredLanguages: string[];
    permanentAddress: string;
    permanentDistrict: string;
    permanentState: string;
    currentAddress: string;
    maritalStatus: string;
    ownedVehicle: string;
    otherDetails: {
        isDifferentlyAbled: boolean;
        willingToMove: string;
    };
    jobQueryData: {
        status: string;
    };
    matchPercentage: number;
    jobRoles: string[] | null;
    yearsOfExperience: number;
    isDoubleVaccinated: boolean | null;
    jobQueryWorkerStatus: string | null;
    hasOwnVehicle: boolean | null;
    age: number;
    referrer: {
        fullName: string;
    } | null;
    auditMetadata: AuditMetadata;
    shortcode?: string;
}

export interface ShortlistWorkerProps {
    fullName: string;
    mobileNumber: string;
}
