import React from 'react';

import { Box } from '@mui/material';

import { getDisabledRowMaskSx } from './PaginatedTableStyles';

interface DisabledRowMaskProps {
    columnCount: number;
    isRowSelected: boolean;
}

export const DisabledRowMask = ({
    isRowSelected,
    columnCount
}: DisabledRowMaskProps) => {
    const disabledRowMaskSx = React.useMemo(
        () => getDisabledRowMaskSx(isRowSelected),
        [isRowSelected]
    );

    return (
        <Box
            component="td"
            sx={disabledRowMaskSx}
            bgcolor="white"
            position="absolute"
            top={0}
            bottom={0}
            left={0}
            right={0}
            zIndex={columnCount - 1}
        />
    );
};
