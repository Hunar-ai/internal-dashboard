import React from 'react';

import { DataCell } from '@components/common';

import { useFormFieldsHelper } from 'hooks';
import { SettingsContext } from 'contexts';

import { FORM_FIELD } from 'Enum';

interface CallEndedByCellProps {
    callEndedBy: string;
}

export const CallEndedByCell = ({ callEndedBy }: CallEndedByCellProps) => {
    const { formFields } = React.useContext(SettingsContext);

    const { formFieldMap } = useFormFieldsHelper({
        formFields
    });

    return (
        <DataCell
            cell={{
                value: formFieldMap[FORM_FIELD.nehaCallEndedBy][callEndedBy]
            }}
        />
    );
};
