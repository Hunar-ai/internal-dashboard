import React from 'react';

import type { ApiError } from 'interfaces';

export const useErrorHelper = () => {
    const isApiError = React.useCallback(
        (error: unknown): error is ApiError => {
            return (
                typeof error === 'object' &&
                error !== null &&
                'errors' in error &&
                typeof error.errors === 'object' &&
                error.errors !== null &&
                'displayError' in error.errors &&
                typeof error.errors.displayError === 'string'
            );
        },
        []
    );

    const getApiErrorMsg = React.useCallback(
        (error: unknown, fallbackErrorMsg?: string) => {
            return isApiError(error)
                ? error.errors.displayError
                : fallbackErrorMsg ?? 'An unexpected error happened!';
        },
        [isApiError]
    );

    return { isApiError, getApiErrorMsg };
};
