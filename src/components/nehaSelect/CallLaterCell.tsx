import React from 'react';

import { SettingsContext } from 'contexts';
import { useFormFieldsHelper } from 'hooks';

import { CALL_LATER, FORM_FIELD } from 'Enum';

import { DataCell } from '@components/common';

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
