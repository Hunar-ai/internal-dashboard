import { useQuery } from '@tanstack/react-query';

import type { ApiError, PersonnelFiltersProps, Sort } from 'interfaces';
import { DataUtils, ErrorTracker } from 'utils';
import { useToast } from 'hooks/useToast';

type SuccessData = any;

interface PostReactQueryProps {
    queryKey: (
        | string
        | number
        | Sort
        | PersonnelFiltersProps
        | undefined
        | null
    )[];
    requestUrl: any;
    params?: { [key: string]: string | null | undefined };
    body: any;
    onSettled?: (data: SuccessData) => void;
    onSuccess?: (data: SuccessData) => void;
    onError?: (error: ApiError) => void;
    enabled?: boolean;
    exclude?: string;
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
    retry?: number;
    retryDelay?: 3000;
}

const getSort = (sort: Sort) => {
    if (sort && !!Object.keys(sort).length) {
        return {
            ...sort,
            key: DataUtils.toSnakeWrapper(sort?.key || '')
        };
    }
    return sort;
};
export const usePostReactQuery = ({
    queryKey,
    requestUrl,
    params,
    body,
    onError,
    onSuccess,
    onSettled,
    enabled = true,
    exclude
}: PostReactQueryProps) => {
    const { showError } = useToast();
    return useQuery<SuccessData, ApiError>({
        queryKey,
        queryFn: () => {
            return requestUrl.post({
                params,
                body: {
                    ...body,
                    sort: getSort(body?.sort)
                },
                exclude
            });
        },
        onSuccess,
        onError: (response: ApiError) => {
            showError({
                message:
                    response.errors?.displayError ??
                    'Something Went Wrong ( Unhandled Error )'
            });
            onError?.(response);
            ErrorTracker.captureException(response);
        },
        onSettled,
        enabled,
        refetchOnWindowFocus: false
    });
};
