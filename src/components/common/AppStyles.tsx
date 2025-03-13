import { grey } from '@mui/material/colors';

export const getSelectMenuSx = (value: string) => {
    return {
        '.MuiSelect-select.MuiSelect-outlined': {
            color: value ? undefined : grey[600]
        }
    };
};
