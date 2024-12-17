import type { ErrorStateProps, ValidationMapProps } from 'interfaces';
import { ErrorMsgUtil, ValidationUtil } from 'utils';

interface HasFormFieldErrorProps {
    fieldName: string;
    fieldValue: string | number | null;
    isRequired?: boolean;
}

interface GetFormErrorStateProps {
    form: Record<string, any>;
    requiredFields?: string[];
}

export interface ValidatorReturnProps {
    hasError: boolean;
    errorMsg: string | undefined;
}

export const useValidationHelper = (validationMap: ValidationMapProps = {}) => {
    const hasFormFieldError = ({
        fieldName,
        fieldValue,
        isRequired
    }: HasFormFieldErrorProps) => {
        let error = false;
        const trimmedFieldValue =
            typeof fieldValue === 'number'
                ? `${fieldValue}`
                : fieldValue?.trimStart();

        if (isRequired) {
            error =
                !trimmedFieldValue ||
                (fieldName in validationMap &&
                    !validationMap[fieldName](trimmedFieldValue));
        } else {
            error =
                !!trimmedFieldValue &&
                fieldName in validationMap &&
                !validationMap[fieldName](trimmedFieldValue);
        }

        return error;
    };

    const getFormErrorState = ({
        form,
        requiredFields = []
    }: GetFormErrorStateProps) => {
        const errorState = Object.keys(form).reduce((acc, fieldName) => {
            const isRequired = requiredFields.includes(fieldName);

            if (fieldName in validationMap || isRequired) {
                return {
                    ...acc,
                    [fieldName]: hasFormFieldError({
                        fieldName,
                        fieldValue: form[fieldName],
                        isRequired: isRequired
                    })
                };
            } else {
                return acc;
            }
        }, {});
        return errorState;
    };

    const hasError = (errorState: ErrorStateProps) =>
        Object.values(errorState).indexOf(true) > -1;

    const getFormErrorData = (props: GetFormErrorStateProps) => {
        const errorState = getFormErrorState(props);
        return {
            errorState,
            hasFormError: hasError(errorState)
        };
    };

    const getStandardFieldValidity = (
        str: string | null,
        required?: boolean,
        meta?: { min?: number; max?: number }
    ): ValidatorReturnProps => {
        const errorCode = ValidationUtil.isStandardInputField(
            str,
            required,
            meta
        );
        return {
            hasError: !!errorCode,
            errorMsg: ErrorMsgUtil[errorCode]?.(meta)
        };
    };

    return {
        hasFormFieldError,
        getFormErrorState,
        getFormErrorData,
        hasError,
        getStandardFieldValidity
    };
};
