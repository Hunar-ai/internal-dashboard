export const useSessionStorage = () => {
    const getItem = (key: string) => {
        const sessionStorageval = window.sessionStorage.getItem(key);
        if (sessionStorageval) return JSON.parse(sessionStorageval);
        return null;
    };

    const setItem = <T>(key: string, object: T): void => {
        window.sessionStorage.setItem(key, JSON.stringify(object));
    };

    const deleteItem = (key: string): void => {
        window.sessionStorage.removeItem(key);
    };

    return {
        getItem,
        setItem,
        deleteItem
    };
};
