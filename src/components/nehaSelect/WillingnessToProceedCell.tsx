import React from 'react';

import { Chip } from '@mui/material';
import { amber, green, red } from '@mui/material/colors';

import { SettingsContext } from 'contexts';
import { useFormFieldsHelper } from 'hooks';

import { FORM_FIELD, WILLINGNESS_TO_PROCEED } from 'Enum';

const labelToColorMap = {
    [WILLINGNESS_TO_PROCEED.MEDIUM]: amber[300],
    [WILLINGNESS_TO_PROCEED.LOW]: red[300],
    [WILLINGNESS_TO_PROCEED.HIGH]: green[300]
};

interface WillingnessToProceedCellProps {
    willingnessToProceed: WILLINGNESS_TO_PROCEED;
}

export const WillingnessToProceedCell = ({
    willingnessToProceed
}: WillingnessToProceedCellProps) => {
    const { formFields } = React.useContext(SettingsContext);
    const { formFieldMap } = useFormFieldsHelper({ formFields });
    return willingnessToProceed ? (
        <Chip
            size="small"
            label={
                formFieldMap[FORM_FIELD.nehaSelectWillingnessToProceed][
                    willingnessToProceed
                ] ?? willingnessToProceed
            }
            sx={{
                backgroundColor: labelToColorMap[willingnessToProceed]
            }}
        />
    ) : (
        <></>
    );
};
