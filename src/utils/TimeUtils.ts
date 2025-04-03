import moment, { Moment } from 'moment';

type AddSubtract = {
    date: Date | string;
    period: string | number;
    unit: 'days' | 'months' | 'years';
};
export const TimeUtils = {
    format: (date: Moment | string | Date, format: string): string => {
        return moment(date).format(format);
    },
    formatSeconds: (seconds: number) => {
        if (seconds === null) return '';

        const duration = moment.duration(seconds, 'seconds');
        return [
            duration.hours() ? `${duration.hours()}h` : '',
            duration.minutes() ? `${duration.minutes()}m` : '',
            duration.seconds() || seconds === 0 ? `${duration.seconds()}s` : ''
        ]
            .filter(Boolean)
            .join(' ');
    },
    add: ({ date, period, unit = 'days' }: AddSubtract): Moment => {
        return moment(date).add(period, unit);
    },
    subtract: ({ date, period, unit = 'days' }: AddSubtract): Moment => {
        return moment(date).subtract(period, unit);
    },
    getMoment: (dateString: string) => {
        if (!dateString) {
            return '';
        }
        return moment(dateString);
    },
    getDate: (dateString: string) => {
        if (!dateString) {
            return '';
        }
        return moment(dateString, 'YYYY-MM-DD').toDate();
    },
    getDateByFormat: (dateString: string, format: string) => {
        if (!dateString) {
            return '';
        }
        return moment(dateString, format).toDate();
    },
    timeSince: (date: string) => {
        const utcMoment = moment.utc(date);
        return moment(utcMoment).local().fromNow();
    },
    getUtcISOString: (date: Moment | string | Date) => {
        const utc = moment(date).utc().toISOString();
        return utc;
    },
    getISOString: (date: Moment) => {
        return date.toISOString();
    },
    getISTStartOfTheDay: (date?: Date | null) => {
        const selectedDate = date ?? new Date();
        return moment(selectedDate).startOf('day').toDate();
    },
    getISTEndOfTheDay: (date?: Date | null) => {
        const selectedDate = date ?? new Date();
        return moment(selectedDate).endOf('day').toDate();
    }
};

export const DateTimeFormat = {
    HUMAN_DATE_FORMAT: 'DD-MM-YYYY',
    SHORT_MONTH_FORMAT: 'MMM',
    DATE_FORMAT: 'DD',
    SHEET_DATE_FORMAT: 'DD/MM/YY',
    SHEET_DATE_FORMAT_WITH_TIME: 'hh:mm A DD/MM/YY',
    SHORT_DATE_FORMAT: 'DD/MM',
    FANCY_DATE_FORMAT: 'DD MMM',
    LONG_DATE_FORMAT: 'YYYY-MM-DD',
    FULL_FANCY_DATE_FORMAT: 'DD MMM YYYY',
    FULL_FANCY_DATE_FORMAT_WITH_TIME: 'hh:mm A DD MMM YY',
    HUMAN_COMPACT_DATE_FORMAT: "Do MMM [']YY",
    HUMAN_TIME_FORMAT: 'hh:mm a',
    FANCY_TIME_FORMAT: 'h:mm A',
    FANCY_COMPACT_TIME_FORMAT: 'h:mmA',
    MILITARY_TIME_FORMAT: 'HH:mm:ss',
    SHORT_ISO_FORMAT: 'YYYY-MM-DDTHH:mm:ss',
    HTML5_FMT_TIME: 'HH:mm',
    HUMAN_DATE_TIME_FORMAT: 'DD-MM-YYYY, hh:mm A',
    UTC_FORMAT: 'YYYY-MM-DDTHH:mm:ssZZ',
    UTC_FORMAT_WITH_MILLIS: 'YYYY-MM-DDTHH:mm:ss.SSSZZ',
    UTC_FORMAT_WITH_Z: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
    HUMAN_DATE_FORMAT_MONTH_FIRST: 'MM-DD-YYYY',
    SHEET_DATE_FORMAT_MONTH_FIRST: 'MM/DD/YY',
    HUMAN_COMPACT_DATE_FORMAT_MONTH_FIRST: "MMM Do [']YY",
    FULL_FANCY_DATE_FORMAT_MONTH_FIRST: 'MMM DD YYYY',
    HUMAN_DATE_TIME_FORMAT_MONTH_FIRST: "MMM D 'YY hh:mm A",
    HUMAN_DATE_TIME_FORMAT_WITH_COMMA: 'D MMM, YYYY h:mm A',
    HUMAN_DATE_TIME_FORMAT_WITH_COMMA_MONTH_FIRST: 'MMM D, YYYY h:mm A',
    SHEET_DATE_FORMAT_YYYY: 'DD/MM/YYYY',
    SHEET_DATE_FORMAT_YYYY_MONTH_FIRST: 'MM/DD/YYYY',
    FORMAT_DO_MMMM_YYYY: 'Do MMMM YYYY',
    FORMAT_DO_MMMM_YYYY_MONTH_FIRST: 'MMMM Do YYYY',
    FORMAT_DO_MMM_YYYY: 'Do MMM YYYY',
    FORMAT_DO_MMM_YYYY_MONTH_FIRST: 'MMM Do YYYY',
    FORMAT_DO_MMM: 'Do MMM',
    FORMAT_DO_MMM_MONTH_FIRST: 'MMM Do',
    DATE_PICKER_FORMAT: 'yyyy-MM-dd',
    DATE_PICKER_YEAR_FORMAT: 'yyyy',
    DATE_PICKER_MIN_DATE_FORMAT: 'MM DD, YYYY'
} as const;

export type DateTimeFormatType = typeof DateTimeFormat;
export type DateTimeInputFormat =
    | DateTimeFormatType['DATE_PICKER_FORMAT']
    | DateTimeFormatType['DATE_PICKER_YEAR_FORMAT'];
