import { grey, red } from '@mui/material/colors';

interface DropzoneSxProps {
    isLoading: boolean;
    hasRequiredError: boolean;
    value?: string;
    isDisabled?: boolean;
}

export const getDropzoneSx = ({
    isLoading,
    hasRequiredError,
    value = undefined,
    isDisabled = false
}: DropzoneSxProps) => {
    return {
        '.dropzone': {
            cursor: isLoading ? 'wait' : 'pointer',
            border: `1px dashed ${hasRequiredError ? red[600] : grey[600]}`,
            p: 8,
            borderRadius: 2,
            height: 'inherit !important',
            bgcolor: value ? grey[50] : 'inherit',
            opacity: isDisabled ? 0.75 : 1,
            position: 'relative'
        }
    };
};
