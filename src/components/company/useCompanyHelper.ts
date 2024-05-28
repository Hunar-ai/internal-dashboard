export const useCompanyHelper = () => {
    const generateRandomGSTIN = () => {
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        return `09AAACH${randomDigits}R4ZZ`;
    };

    return { generateRandomGSTIN };
};
