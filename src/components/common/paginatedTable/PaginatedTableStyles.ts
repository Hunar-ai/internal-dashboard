import { SxProps } from '@mui/material';

import { xsTextFieldSx } from 'components/common/AppStyles';

export const getDisabledRowMaskSx = (isRowSelected: boolean): SxProps => {
    return {
        opacity: isRowSelected ? 0 : 0.5,
        pointerEvents: 'none'
    };
};

export const dynamicInputCellSx: SxProps = {
    ...xsTextFieldSx,
    '& .MuiAutocomplete-endAdornment>.MuiButtonBase-root': {
        padding: 0.25
    }
};
