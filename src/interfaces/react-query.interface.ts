import { type UseQueryResult } from '@tanstack/react-query';

export type QueryResult<TData = unknown, TError = unknown> = UseQueryResult<
    TData,
    TError
>;
