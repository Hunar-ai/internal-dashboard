import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddIcon from '@mui/icons-material/Add';

import type { OptionsProps, OptionProps } from 'interfaces';

import { SxProps } from '@mui/system';
import Button from '@mui/material/Button';

interface Props {
    id?: string;
    options: OptionsProps;
    defaultValue?: unknown;
    variant?: 'standard' | 'filled' | 'outlined' | undefined;
    multiple?: boolean;
    label: string;
    name?: string;
    placeholder?: string;
    value?: OptionProps | OptionsProps | null;
    onChange?: (
        _: React.SyntheticEvent,
        __: OptionProps | OptionsProps | null
    ) => void;
    required?: boolean;
    error?: boolean;
    helperText?: string;
    autoFocus?: boolean;
    disabledOptions?: OptionsProps;
    disableClearable?: boolean;
    clearOnBlur?: boolean;
    disabled?: boolean;
    autoComplete?: string;
    size?: 'small' | 'medium';
    sx?: SxProps;
    ListboxProps?: Record<string, unknown>;
    onNewClick?: VoidFunction;
    isFilterable?: boolean;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const Select = ({
    size = 'medium',
    variant = 'outlined',
    required,
    error,
    helperText,
    name = '',
    placeholder = '',
    options,
    multiple,
    label,
    value,
    id,
    autoFocus,
    disabledOptions = [],
    disableClearable = false,
    clearOnBlur = false,
    onChange,
    disabled = false,
    sx = {},
    ListboxProps = {},
    onNewClick = () => undefined,
    isFilterable = true
}: Props) => {
    const [open, setOpen] = React.useState(false);
    const closePopper = () => setOpen(false);
    const openPopper = () => setOpen(true);

    return (
        <Autocomplete
            open={open}
            onOpen={openPopper}
            onClose={closePopper}
            sx={sx}
            disablePortal={true}
            size={size}
            autoComplete={false}
            disableCloseOnSelect={multiple}
            limitTags={1}
            id={id}
            disableClearable={disableClearable}
            multiple={multiple}
            options={options}
            onChange={onChange}
            getOptionLabel={option => (option.label ? option.label : '')}
            value={value}
            clearOnBlur={clearOnBlur}
            disabled={disabled}
            ListboxProps={ListboxProps}
            getOptionDisabled={option =>
                !!disabledOptions.find(
                    (element: OptionProps) => element.value === option.value
                )
            }
            filterOptions={!isFilterable ? options => options : undefined}
            renderOption={(props, option, { selected }) => (
                <React.Fragment key={option.value}>
                    {option.value === 'NEW' ? (
                        <Button
                            fullWidth
                            variant="text"
                            onClick={() => {
                                closePopper();
                                onNewClick();
                            }}
                            sx={{
                                px: 3,
                                py: 1.5,
                                justifyContent: 'start',
                                fontWeight: 600
                            }}
                            startIcon={<AddIcon fontSize="small" />}
                        >
                            {option.label}
                        </Button>
                    ) : (
                        <li {...props}>
                            <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ marginRight: 8 }}
                                checked={selected}
                                autoFocus={autoFocus}
                                id={id}
                            />
                            {option.label}
                        </li>
                    )}
                </React.Fragment>
            )}
            renderInput={params => {
                return (
                    <TextField
                        {...params}
                        name={name}
                        error={error}
                        helperText={helperText}
                        id={id}
                        required={required}
                        variant={variant}
                        placeholder={placeholder}
                        fullWidth
                        label={label}
                        autoFocus={autoFocus}
                        sx={sx}
                    />
                );
            }}
        />
    );
};
