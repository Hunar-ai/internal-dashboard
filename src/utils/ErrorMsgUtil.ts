export enum ERROR_CODE {
    REQUIRED = 'required',
    ALPHA_NUMERIC = 'alphaNumeric',
    ID = 'id',
    CHARACTER_LENGTH = 'characterLength',
    MOBILE_NUMBER = 'mobileNumber',
    EMAIL = 'email',
    NUMBER = 'number',
    NUMBER_RANGE = 'numberRange',
    SALARY = 'salary',
    INVALID = 'invalid',
    DATE = 'date',
    MIN_DATE = 'minDate',
    TIME = 'time',
    BLANK_SPACES = 'blankSpaces',
    NONE = ''
}

type ErrorMsgProps = {
    [key in ERROR_CODE]: ((args?: any) => string) | undefined;
};

export const ErrorMsg = {
    required: () => `Required`,
    alphaNumeric: ({ min = 3, max = 100 } = {}) =>
        `Must be between ${min}-${max} alphanumeric characters`,
    id: ({ min = 1, max = 25 } = {}) =>
        `Must be between ${min}-${max} alphanumeric characters with - or _`,
    characterLength: ({ min = 1, max = 200 } = {}) =>
        `Must be between ${min}-${max} characters`,
    mobileNumber: () => `Must be a valid mobile number`,
    email: () => `Must be a valid email id`,
    number: () => `Must be a number`,
    numberRange: ({
        min = 1,
        max
    }: {
        min?: number | undefined;
        max?: number | undefined;
    } = {}) => {
        return max !== undefined
            ? `Must be between ${min}-${max}`
            : `Must be more than ${min - 1}`;
    },
    salary: () => `Must be between 1-1,00,00,000`,
    invalid: (label = '') => `Invalid ${label}`,
    date: (format: string) => `Must be a valid date in format ${format}`,
    minDate: (minDate: string) => `Must be a date on or after ${minDate}`,
    time: (format: string) => `Must be a valid time in format ${format}`,
    hexColor: () => `Must be a valid hex color`,
    url: () => `Must be a valid URL`
} as const;

export const ErrorMsgUtil: ErrorMsgProps = {
    [ERROR_CODE.REQUIRED]: () => `Required`,
    [ERROR_CODE.ALPHA_NUMERIC]: ({ min = 3, max = 100 } = {}) =>
        `Must be between ${min}-${max} alphanumeric characters`,
    [ERROR_CODE.ID]: ({ min = 1, max = 25 } = {}) =>
        `Must be between ${min}-${max} alphanumeric characters with - or _`,
    [ERROR_CODE.CHARACTER_LENGTH]: ({ min = 3, max = 100 } = {}) =>
        `Must be between ${min}-${max} characters`,
    [ERROR_CODE.MOBILE_NUMBER]: () => `Must be a valid mobile number`,
    [ERROR_CODE.EMAIL]: () => `Must be a valid email id`,
    [ERROR_CODE.NUMBER]: () => `Must be a number`,
    [ERROR_CODE.NUMBER_RANGE]: ({
        min = 1,
        max
    }: {
        min?: number | undefined;
        max?: number | undefined;
    } = {}) => {
        return max !== undefined
            ? `Must be between ${min}-${max}`
            : `Must be more than ${min - 1}`;
    },
    [ERROR_CODE.SALARY]: () => `Must be between 1-1,00,00,000`,
    [ERROR_CODE.INVALID]: (label = '') => `Invalid ${label}`,
    [ERROR_CODE.DATE]: (format?: string) =>
        `Must be a valid date in format ${format}`,
    [ERROR_CODE.MIN_DATE]: (minDate?: string) =>
        `Must be a date on or after ${minDate}`,
    [ERROR_CODE.TIME]: (format?: string) =>
        `Must be a valid time in format ${format}`,
    [ERROR_CODE.BLANK_SPACES]: () => 'Must not have spaces at start or end',
    [ERROR_CODE.NONE]: undefined
} as const;
