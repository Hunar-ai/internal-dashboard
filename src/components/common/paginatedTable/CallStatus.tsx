import { useContext } from 'react';
import { Chip } from '@mui/material';
import { SettingsContext } from 'contexts';
import { grey, red, blue, amber, green } from '@mui/material/colors';
import { TWILIO_CALL_STATUS } from 'Enum';
import { useWorkerDataActions } from 'hooks';

const labelToColorMap = {
    [TWILIO_CALL_STATUS.NOT_STARTED]: grey[300],
    [TWILIO_CALL_STATUS.QUEUED]: blue[200],
    [TWILIO_CALL_STATUS.INITIATED]: blue[200],
    [TWILIO_CALL_STATUS.RINGING]: amber[300],
    [TWILIO_CALL_STATUS.IN_PROGRESS]: blue[300],
    [TWILIO_CALL_STATUS.COMPLETED]: green[400],
    [TWILIO_CALL_STATUS.BUSY]: amber[300],
    [TWILIO_CALL_STATUS.NO_ANSWER]: amber[400],
    [TWILIO_CALL_STATUS.CANCELLED]: red[300],
    [TWILIO_CALL_STATUS.FAILED]: red[500]
};

interface CallStatusProps {
    status: TWILIO_CALL_STATUS;
}

export const CallStatus = ({ status }: CallStatusProps) => {
    const { formFields } = useContext(SettingsContext);
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
