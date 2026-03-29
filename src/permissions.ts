const METRICS_USERS: string[] =
    import.meta.env.VITE_METRICS_USERS?.split(',') ?? [];
const SUPER_USERS: string[] = import.meta.env.VITE_SUPER_USERS.split(',');

export const isSuperUser = (email: string) => {
    return SUPER_USERS.includes(email);
};

export const hasMetricsPageAccess = (email: string) => {
    return Array.from(new Set([...SUPER_USERS, ...METRICS_USERS])).includes(
        email
    );
};
