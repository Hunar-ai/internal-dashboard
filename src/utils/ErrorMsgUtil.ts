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
    time: (format: string) => `Must be a valid time in format ${format}`
} as const;
