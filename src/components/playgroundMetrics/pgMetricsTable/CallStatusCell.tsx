import React from 'react';

import { Chip } from '@mui/material';
import { grey, red, blue, green } from '@mui/material/colors';

import { useFormFieldsHelper } from 'hooks';
import { SettingsContext } from 'contexts';

import { FORM_FIELD, TWILIO_CALL_STATUS } from 'Enum';

const labelToColorMap = {
    [TWILIO_CALL_STATUS.COMPLETED]: green[300],
    [TWILIO_CALL_STATUS.IN_PROGRESS]: blue[300],
    [TWILIO_CALL_STATUS.BUSY]: red[300],
    [TWILIO_CALL_STATUS.NO_ANSWER]: red[300],
    [TWILIO_CALL_STATUS.CANCELLED]: red[300],
    [TWILIO_CALL_STATUS.FAILED]: red[300],
    [TWILIO_CALL_STATUS.NOT_STARTED]: grey[300],
    [TWILIO_CALL_STATUS.QUEUED]: grey[300],
    [TWILIO_CALL_STATUS.INITIATED]: grey[300],
    [TWILIO_CALL_STATUS.RINGING]: grey[300]
};

interface CallStatusCellProps {
    status: TWILIO_CALL_STATUS;
}

export const CallStatusCell = ({ status }: CallStatusCellProps) => {
    const { formFields } = React.useContext(SettingsContext);
    const { formFieldMap } = useFormFieldsHelper({ formFields });
    return (
        <Chip
            size="small"
            label={formFieldMap[FORM_FIELD.twilioStatus][status] ?? status}
            sx={{
                backgroundColor: labelToColorMap[status]
            }}
        />
    );
};
