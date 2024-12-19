import _ from 'lodash';

export const StringUtils = {
    isEmpty(value: string | number | string[] | number[]): boolean {
        if (_.isNumber(value)) {
            return !_.isFinite(value); // if finite, return false. Covers NaN
        }

        return _.isEmpty(value);
    },
    trimFirstAndLastCharacter(string: string) {
        return string.substring(1, string.length - 1);
    },
    isEmail(email: string | null) {
        const re = /\S+@\S+\.\S+/;
        return email && re.test(email);
    },
    isUrl(url: string) {
        try {
            new URL(url);
        } catch (error) {
            return false;
        }

        return true;
    },
    isValidLength(str: string | null, range?: { min?: number; max?: number }) {
        const length = str?.trimStart().length ?? 0;
        return (range?.min || 0) <= length && length <= (range?.max || 200);
    }
};
