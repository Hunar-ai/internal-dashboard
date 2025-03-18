import React, { useState } from 'react';

import _ from 'lodash';

import {
    Button,
    Grid,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Search as SearchIcon } from '@mui/icons-material';

import { FilterListSkeleton, type FilterOptionsProps } from 'components/common';

import {
    type TableFiltersProps,
    type OptionProps,
    type MultiSelectFilterKeyProps
} from 'interfaces';

interface MultiSelectSectionProps {
    id: MultiSelectFilterKeyProps;
    columnId?: string;
    optionsState: FilterOptionsProps;
    setOptionsState: (_: FilterOptionsProps) => void;
    tableFiltersState?: TableFiltersProps;
    setTableFiltersState: (_: TableFiltersProps) => void;
}

interface toggleSelectAllOptions {
    modifiedTableFilters: TableFiltersProps;
}

const FilterList = React.lazy(() => import('./FilterList'));
export const MultiSelectSection = ({
    id,
    // columnId,
    optionsState,
    setOptionsState,
    tableFiltersState,
    setTableFiltersState
}: MultiSelectSectionProps) => {
    const [filteredOptions, setFilteredOptions] =
        useState<FilterOptionsProps>(optionsState);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState('');

    const isSelectAllDisabled = React.useMemo(() => {
        return optionsState.find(option => !option.checked) === undefined;
    }, [optionsState]);

    const toggleSelectAllOptions = ({
        modifiedTableFilters
    }: toggleSelectAllOptions) => {
        const modifiedOptionsState = optionsState?.map(
            (option: OptionProps) => {
                return { ...option, checked: !selectAll };
            }
        );
        const modifiedFilterOptions = filteredOptions?.map(
            (option: OptionProps) => {
                return { ...option, checked: !selectAll };
            }
        );
        setSelectAll(!selectAll);
        setTableFiltersState(modifiedTableFilters);
        setOptionsState(modifiedOptionsState);
        setFilteredOptions(modifiedFilterOptions);
    };

    const onClearClick = () => {
        const modifiedOptionsState = optionsState?.map(
            (option: OptionProps) => {
                return { ...option, checked: false };
            }
        );

        setSearchInput('');
        setSelectAll(false);
        const modifiedTableFilters: Partial<TableFiltersProps> = {
            ...tableFiltersState,
            [id]: []
        };
        setTableFiltersState({ ...modifiedTableFilters } as TableFiltersProps);
        // setOptionsState(modifiedOptionsState);
        setFilteredOptions([...modifiedOptionsState]);
    };

    const onSelectAllClick = () => {
        const modifiedTableFilters: Partial<TableFiltersProps> = {
            ...tableFiltersState,
            [id]: optionsState?.map((option: OptionProps) => {
                return option.value;
            })
        };

        toggleSelectAllOptions({
            modifiedTableFilters: modifiedTableFilters as TableFiltersProps
        });
    };

    const getModifiedOptions = (
        options: FilterOptionsProps,
        modifiedTableFilters: Partial<TableFiltersProps>,
        checked: boolean
    ) => {
        return options?.map((option: OptionProps) => {
            const index = modifiedTableFilters[id]?.indexOf(option.value);

            if (index !== undefined && index > -1) {
                return { ...option, checked };
            }
            return { ...option, checked: !checked };
        });
    };

    const onChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => {
        const modifiedTableFilters: Partial<TableFiltersProps> =
            tableFiltersState?.[id]
                ? { ...tableFiltersState }
                : { ...tableFiltersState, [id]: [] };

        if (checked) {
            modifiedTableFilters[id] = modifiedTableFilters[id]?.concat([
                event.target.value
            ]);
        } else {
            if (modifiedTableFilters[id]?.length) {
                const index = modifiedTableFilters[id]?.indexOf(
                    event.target.value
                );
                if (index !== undefined && index > -1)
                    modifiedTableFilters[id]?.splice(index, 1);
            }
            setSelectAll(false);
        }

        const modifiedOptionsState = getModifiedOptions(
            optionsState,
            modifiedTableFilters,
            true
        );

        const modifiedFilterOptions = getModifiedOptions(
            filteredOptions,
            modifiedTableFilters,
            true
        );
        setTableFiltersState(modifiedTableFilters as TableFiltersProps);
        setOptionsState(modifiedOptionsState);
        setFilteredOptions(modifiedFilterOptions);
    };

    const onSearchChange = (event: React.BaseSyntheticEvent) => {
        const modifiedSearchInput = event.target.value;
        let modifiedOptionsState = [...optionsState];
        modifiedOptionsState = _.filter(modifiedOptionsState, o => {
            return _.lowerCase(o.label).includes(
                _.lowerCase(modifiedSearchInput)
            );
        });

        setSearchInput(modifiedSearchInput);
        setFilteredOptions(modifiedOptionsState);
    };

    return (
        <>
            <Grid item xs={12}>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    columnSpacing={1}
                    py={0.5}
                    pl={2}
                    pr={1.5}
                >
                    <Grid item xs>
                        <Typography variant="overline" color={grey[700]}>
                            FILTERS
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            size="small"
                            disabled={isSelectAllDisabled}
                            onClick={onSelectAllClick}
                        >
                            SELECT ALL
                        </Button>
                    </Grid>

                    <Grid item>
                        <Button size="small" onClick={onClearClick}>
                            CLEAR ALL
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} py={0.5} px={2}>
                <TextField
                    size="small"
                    fullWidth
                    placeholder="Search here..."
                    value={searchInput}
                    onChange={onSearchChange}
                    autoComplete="nope"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                            </InputAdornment>
                        )
                    }}
                ></TextField>
            </Grid>
            <Grid item xs={12} maxHeight={152} overflow="auto">
                <React.Suspense fallback={<FilterListSkeleton count={6} />}>
                    <FilterList
                        filteredOptions={filteredOptions}
                        onChange={onChange}
                    />
                </React.Suspense>
            </Grid>
        </>
    );
};
