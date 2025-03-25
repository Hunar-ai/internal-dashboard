import React from 'react';

import { DataCell } from '@components/common';

import { useFormFieldsHelper } from 'hooks';
import { SettingsContext } from 'contexts';
import { FORM_FIELD } from 'Enum';

interface CallLanguageCellProps {
    callLanguage: string;
}

export const CallLanguageCell = ({ callLanguage }: CallLanguageCellProps) => {
    const { formFields } = React.useContext(SettingsContext);
    const { formFieldMap, getMultipleFormattedFields } = useFormFieldsHelper({
        formFields
    });

    return (
        <DataCell
            cell={{
                value: getMultipleFormattedFields(
                    FORM_FIELD.callLanguage,
                    [callLanguage],
                    formFieldMap
                )
            }}
        />
    );
};
