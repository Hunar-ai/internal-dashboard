import React from 'react';

import { DataCell } from '@components/common';

import { SettingsContext } from 'contexts';
import { useFormFieldsHelper } from 'hooks';

import { CALL_LATER, FORM_FIELD } from 'Enum';

interface CallLaterCellProps {
    callLater: CALL_LATER;
}

export const CallLaterCell = ({ callLater }: CallLaterCellProps) => {
    const { formFields } = React.useContext(SettingsContext);
    const { formFieldMap } = useFormFieldsHelper({ formFields });
    return (
        <DataCell
            cell={{
                value: formFieldMap[FORM_FIELD.nehaSelectCallLater][callLater]
            }}
        />
    );
};
