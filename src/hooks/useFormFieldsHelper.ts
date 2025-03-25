import React from 'react';

import type {
    OptionsProps,
    FormFields,
    FormattedFieldMap,
    MappedField
} from 'interfaces';

interface FormFieldsHelperProps {
    formFields: FormFields;
}

export const useFormFieldsHelper = ({ formFields }: FormFieldsHelperProps) => {
    const formFieldMap = React.useMemo(() => {
        const formFieldKeys = Object.keys(formFields) as Array<
            keyof FormFields
        >;
        return formFieldKeys.reduce((formFieldMap, field: keyof FormFields) => {
            const fieldArray: OptionsProps = formFields[field];
            const fieldMapObj = fieldArray.reduce((fieldMap, datum) => {
                fieldMap[datum.value] = datum.label;
                return fieldMap;
            }, {} as MappedField);
            formFieldMap[field] = fieldMapObj;
            return formFieldMap;
        }, {} as FormattedFieldMap);
    }, [formFields]);

    const getMultipleFormattedFields = (
        fieldName: keyof FormattedFieldMap,
        fieldValue: string[],
        formFieldMapObj: FormattedFieldMap
    ): string => {
        if (formFieldMapObj[fieldName])
            return (fieldValue || [])
                .map(datum => formFieldMapObj[fieldName][datum])
                .join(', ');
        return '';
    };

    const getFormattedBooleanField = (fieldValue: boolean | null) => {
        return fieldValue === false ? 'No' : fieldValue === true ? 'Yes' : '';
    };

    return {
        formFieldMap,
        getMultipleFormattedFields,
        getFormattedBooleanField
    };
};
