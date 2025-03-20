import { Grid, Link } from '@mui/material';

import { Close } from '@mui/icons-material';

import { TextOverFlow } from '@components/common';

interface DropzoneDisplayAreaProps {
    value: string;
    isDisabled?: boolean;
    onRemoveClick?: (_: React.BaseSyntheticEvent) => void;
    onClick?: (_: React.BaseSyntheticEvent) => void;
}

export const DropzoneDisplayArea = ({
    value,
    isDisabled = false,
    onRemoveClick,
    onClick
}: DropzoneDisplayAreaProps) => {
    return (
        <Grid
            container
            justifyContent="center"
            alignContent="center"
            height="-webkit-fill-available"
        >
            <Close
                style={{
                    position: 'absolute',
                    top: 12,
                    right: 12
                }}
                onClick={isDisabled ? undefined : onRemoveClick}
            />
            <Link
                href={value}
                underline="hover"
                target="_blank"
                onClick={onClick}
            >
                <TextOverFlow value={value} maxWidth="80%" />
            </Link>
        </Grid>
    );
};
