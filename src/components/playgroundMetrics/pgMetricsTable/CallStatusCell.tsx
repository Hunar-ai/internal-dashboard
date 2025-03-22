import React from 'react';

import { Chip } from '@mui/material';
import { grey, red, blue, green } from '@mui/material/colors';

import { useWorkerDataActions } from 'hooks';
import { SettingsContext } from 'contexts';

import { TWILIO_CALL_STATUS } from 'Enum';

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
    const { mapObj } = useWorkerDataActions({ formFields });
    return (
        <Chip
            size="small"
            label={mapObj?.twilioStatus[status] ?? status}
            sx={{
                backgroundColor: labelToColorMap[status]
            }}
        />
    );
};
