import {
    Checkbox,
    FormControlLabel,
    Grid,
    Skeleton,
    Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';

import { DataUtils } from 'utils';

interface FilterListSkeletonProps {
    count: number;
}

export const FilterListSkeleton = ({ count }: FilterListSkeletonProps) => {
    return (
        <>
            {DataUtils.arrayRange(count).map((_, index) => (
                <Grid
                    item
                    xs={12}
                    key={index}
                    borderBottom={
                        count - 1 === index
                            ? undefined
                            : `1px solid ${grey[200]}`
                    }
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={false}
                                id={`${index}`}
                                size="small"
                                disabled
                                sx={{ p: 0.5, mr: 1.5 }}
                            />
                        }
                        sx={{ mx: 0, width: '100%', px: 2, py: 0.75 }}
                        label={
                            <Typography width="100%">
                                <Skeleton />
                            </Typography>
                        }
                    />
                </Grid>
            ))}
        </>
    );
};
