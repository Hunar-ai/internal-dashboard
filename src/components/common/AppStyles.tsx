import { type SxProps } from '@mui/material';
import { grey } from '@mui/material/colors';

export const xsTextFieldSx: SxProps = {
    '& .MuiInputBase-sizeSmall': {
        fontSize: '0.85rem',
        minHeight: '2.2rem'
    },
    '& .MuiInputBase-inputSizeSmall': {
        fontSize: '0.85rem',
        height: '0.9rem'
    },
    '& .MuiInputLabel-sizeSmall': {
        fontSize: '0.85rem'
    }
};

export const getSelectMenuSx = (value: string) => {
    return {
        '.MuiSelect-select.MuiSelect-outlined': {
            color: value ? undefined : grey[600]
        }
    };
};
