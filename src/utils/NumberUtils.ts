export const NumberUtils = {
    toNumber(value: number | string): number {
        const number = parseFloat(`${value}`);
        if (!isNaN(number) && isFinite(number)) {
            return number;
        } else {
            throw new Error(
                `Connot convert ${value} to a number. use a valid number for conversion.`
            );
        }
    },
    isNumeric(value: number): boolean {
        return !isNaN(parseFloat(`${value}`)) && isFinite(value);
    },
    isNumericRange(value: number, range: { min?: number; max?: number }) {
        return (range.min ?? 0) <= value && value <= (range.max ?? Infinity);
    },
    isPositiveNumber(value: number): boolean {
        return NumberUtils.isNumeric(value) && NumberUtils.toNumber(value) > 0;
    },
    format(value: number): string {
        return new Intl.NumberFormat('en-IN').format(value);
    },
    abbreviateNumber(value: number): string {
        if (value >= 10000000) {
            // 1 Crore and above
            return (value / 10000000).toFixed(2).replace(/\.00$/, '') + 'Cr';
        } else if (value >= 100000) {
            // 1 Lakh and above
            return (value / 100000).toFixed(2).replace(/\.00$/, '') + 'L';
        } else if (value >= 10000) {
            // 10K and above
            return (value / 1000).toFixed(2).replace(/\.00$/, '') + 'K';
        } else {
            return this.format(value);
        }
    }
};
