import { TimeUtils } from 'utils';

export const useHelper = () => {
    const getRelativeDateField = (fieldValue: string | null) => {
        return fieldValue ? TimeUtils.timeSince(fieldValue) : '';
    };

    return {
        getRelativeDateField
    };
};
