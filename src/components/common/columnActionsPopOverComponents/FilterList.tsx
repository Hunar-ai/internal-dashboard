import React from 'react';

import { Checkbox, FormControlLabel, Grid } from '@mui/material';
import { grey } from '@mui/material/colors';

import { type FilterOptionProps } from 'components/common';

interface Props {
    filteredOptions: FilterOptionProps[];
    onChange: (_: React.ChangeEvent<HTMLInputElement>, __: boolean) => void;
}

const FilterList = ({ filteredOptions, onChange }: Props) => {
    const [filterUi, setFilterUi] = React.useState<JSX.Element[]>();
    const [, startTransition] = React.useTransition();

    React.useEffect(() => {
        startTransition(() => {
            setFilterUi(
                filteredOptions.map((option: FilterOptionProps, index) => {
                    return (
                        <Grid
                            item
                            xs={12}
                            key={option.value}
                            borderBottom={
                                filteredOptions.length - 1 === index
                                    ? undefined
                                    : `1px solid ${grey[200]}`
                            }
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={option?.checked ?? false}
                                        id={option.value}
                                        onChange={onChange}
                                        size="small"
                                        value={option.value}
                                        sx={{ p: 0.5, mr: 1.5 }}
                                    />
                                }
                                sx={{
                                    mx: 0,
                                    width: '100%',
                                    px: 2,
                                    py: 0.75,
                                    overflowWrap: 'anywhere',
                                    '&:hover': { bgcolor: grey[100] }
                                }}
                                slotProps={{ typography: { variant: 'body2' } }}
                                label={option.label}
                            />
                        </Grid>
                    );
                })
            );
        });
    }, [filteredOptions, onChange]);

    return <>{filterUi ? filterUi : <> Loding</>}</>;
};

export default FilterList;
