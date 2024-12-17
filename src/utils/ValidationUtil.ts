import { RegExUtil } from './RegExUtil';
import { DataUtils } from './DataUtils';
import { StringUtils } from './StringUtils';
import { NumberUtils } from './NumberUtils';
import { ERROR_CODE } from './ErrorMsgUtil';

interface FormType<T> {
    [key: string]: T;
}

interface ValidationMapType {
    [key: string]: string[];
}

interface FieldTranslationMap {
    [key: string]: string;
}

const fieldTranslationMap: FieldTranslationMap = {
    email: 'Email',
    password: 'Password',
    name: 'Name',
    teamId: 'Team Id',
    fullName: 'Full name',
    personnelId: 'Personnel Id',
    mobileNumber: 'Mobile number',
    role: 'Role',
    legalEntityName: 'Legal Entity name',
    alias: 'Alias',
    customerId: 'Customer Id',
    gstin: 'GSTIN',
    pocName: 'POC name',
    pocEmail: 'POC email',
    pocMobileNumber: 'POC mobile number',
    aadhaarNumber: 'Aadhar number',
    profileImage: 'Profile Image',
    aadhaarFile: 'Aadhaar File',
    minSalary: 'Minimum salary',
    maxSalary: 'Maximum salary',
    district: 'District',
    state: 'State',
    educationalQualificationType: 'Education',
    description: 'Description',
    yearOfBirth: 'Year of birth',
    currentState: 'Current state',
    currentDistrict: 'Current district',
    gender: 'Gender',
    currentAddress: 'Current address',
    yearsOfExperience: 'Years of experience',
    title: 'Title',
    jobRoles: 'Job Roles',
    maritalStatus: 'Marital status',
    permanentAddress: 'Permanent address',
    willingToMove: 'Willing to move',
    preferredLanguages: 'Preferred languages',
    permanentDistrict: 'Permanent District',
    englishProficiency: 'English proficiency',
    ownedVehicle: 'Owned vehicle',
    epfoUanNumber: 'EPFO UAN number',
    isDifferentlyAbled: 'Is differently abled',
    hasSkillCertification: 'Has skill Certification',
    isDoubleVaccinated: 'Is double vaccinated',
    otherDetailsEducationalQualificationDetail: 'Education qualification',
    otherDetailsDateOfBirth: 'Date of birth',
    otherDetailsDifferentlyAbledDetail: 'Differently abled',
    otherDetailsEmail: 'Email',
    otherDetailsWillingToMove: 'Willing to move',
    otherDetailsCurrentSalary: 'Current salary',
    otherDetailsExpectedSalary: 'Expected salary',
    otherDetailsIsDifferentlyAbled: 'Is differently abled',
    bankAccountDetailsAccountHolderName: 'Account holder name',
    bankAccountDetailsAccountNumber: 'Account number',
    bankAccountDetailsIfscCode: 'IFSC code',
    header: 'Header'
};

export const ValidationUtil = {
    isValidId: (id: string): boolean => {
        let isValid = true;
        const allowedRegEx = new RegExp(
            RegExUtil.alphaNumericWithUnderscoreAndDash
        );
        if (!id || !id.trim()) {
            isValid = false;
        } else {
            const numberOfCharacters = id.trim().length;
            if (!allowedRegEx.test(id)) {
                isValid = false;
            } else if (numberOfCharacters < 2) {
                isValid = false;
            } else if (numberOfCharacters > 32) {
                isValid = false;
            }
        }
        return isValid;
    },
    validateForm: <T>(
        form: FormType<T | any>,
        validationMap: ValidationMapType
    ) => {
        let isValid = true;
        let message = '';
        const validate = (key: string) => {
            const types = validationMap[key];
            for (const type of types) {
                if (type === 'mandatory') {
                    if (
                        DataUtils.isEmpty(form[key]) &&
                        ![
                            'permanentState',
                            'currentState',
                            'isDoubleVaccinated',
                            'otherDetailsIsDifferentlyAbled',
                            'hasSkillCertification'
                        ].includes(key)
                    ) {
                        isValid = false;
                        message = `${fieldTranslationMap[key]} is ${type}`;
                        return { isValid, message };
                    }
                } else if (type === 'email') {
                    if (!StringUtils.isEmail(form[key])) {
                        isValid = false;
                        message = `Incorrect input value for ${fieldTranslationMap[
                            key
                        ].toLowerCase()}`;
                        return { isValid, message };
                    }
                } else if (type === 'mobileNumber') {
                    if (!RegExUtil.isMobileNumber(form[key])) {
                        isValid = false;
                        message = `Incorrect input value for ${fieldTranslationMap[key]}`;
                        return { isValid, message };
                    }
                } else if (type === 'gstin') {
                    if (
                        !DataUtils.isEmpty(form[key]) &&
                        !RegExUtil.isGSTIN(form[key])
                    ) {
                        isValid = false;
                        message = `Incorrect input value for ${fieldTranslationMap[key]}`;
                        return { isValid, message };
                    }
                } else if (type === 'aadhaar') {
                    if (
                        !DataUtils.isEmpty(form[key]) &&
                        !RegExUtil.isAadhaar(form[key])
                    ) {
                        isValid = false;
                        message = `Incorrect input value for ${fieldTranslationMap[key]}`;
                        return { isValid, message };
                    }
                } else if (type === 'positiveNumber') {
                    if (
                        !DataUtils.isEmpty(form[key]) &&
                        !NumberUtils.isPositiveNumber(form[key])
                    ) {
                        isValid = false;
                        message = `Incorrect input value for ${fieldTranslationMap[key]}`;
                        return { isValid, message };
                    }
                } else if (type === 'yearsOfExperience') {
                    if (
                        !DataUtils.isEmpty(form[key]) &&
                        form[key] !== 0 &&
                        !RegExUtil.isYearsOfExperience(form[key])
                    ) {
                        isValid = false;
                        message = `Incorrect input value for ${fieldTranslationMap[key]}`;
                        return { isValid, message };
                    }
                } else if (type.includes('length')) {
                    if (!DataUtils.isEmpty(form[key])) {
                        const requiredLength = type.split('-');
                        if (form[key].length > requiredLength[1]) {
                            isValid = false;
                            message = `Incorrect input value for ${fieldTranslationMap[key]}`;
                            return { isValid, message };
                        }
                    }
                }
            }
            return { isValid, message };
        };

        for (const key in form) {
            if (validationMap[key]) {
                const checkValidity = validate(key);
                if (!checkValidity.isValid) {
                    return checkValidity;
                }
            }
        }
        return { isValid, message };
    },
    isStandardInputField(
        value: string | null,
        isRequired = true,
        meta?: { min?: number; max?: number }
    ): ERROR_CODE {
        if (isRequired && !value) return ERROR_CODE.REQUIRED;

        if (value) {
            if (!RegExUtil.isWithoutExtraSpaces(value))
                return ERROR_CODE.BLANK_SPACES;

            const isValidLength = StringUtils.isValidLength(value, {
                min: meta?.min ?? 3,
                max: meta?.max ?? 100
            });
            if (!isValidLength) return ERROR_CODE.CHARACTER_LENGTH;
        }

        return ERROR_CODE.NONE;
    },
    isMobileInputField(value: string | null, isRequired = true): ERROR_CODE {
        if (isRequired && !value) return ERROR_CODE.REQUIRED;

        if (value) {
            if (!RegExUtil.isWithoutExtraSpaces(value))
                return ERROR_CODE.BLANK_SPACES;
            if (!RegExUtil.isMobileNumber(value))
                return ERROR_CODE.MOBILE_NUMBER;
        }

        return ERROR_CODE.NONE;
    }
};
