import React from 'react';
import { useTheme } from '@mui/material/styles';

import { grey } from '@mui/material/colors';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import Box from '@mui/material/Box';
import { Grid, Typography } from '@mui/material';

interface TextAreaProps {
    minRows?: number;
    maxRows?: number;
    name?: string;
    placeholder: string;
    onChange: (_: React.ChangeEvent<HTMLTextAreaElement>) => void;
    required?: boolean;
    value?: string;
    showCharHelpText?: boolean;
    maxLength?: number;
    minLength?: number;
    error?: boolean;
    helpText?: string;
    resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline';
    color?: string;
    style?: any;
}

export const TextArea = ({
    minRows = 2,
    maxRows = 3,
    name,
    placeholder,
    onChange,
    required = false,
    value = '',
    showCharHelpText = false,
    maxLength = 200,
    minLength,
    error,
    helpText = '',
    resize = 'both',
    color,
    style
}: TextAreaProps) => {
    const theme = useTheme();

    const getHelperText = React.useCallback(() => {
        const numberOfCharacters = value ? value.length : 0;
        const remainingCharacters = maxLength - numberOfCharacters;
        if (minLength && numberOfCharacters < minLength) {
            const requiredCharacters = minLength - numberOfCharacters;
            const textPostFix = numberOfCharacters
                ? 'more character required'
                : 'characters required';
            return `${requiredCharacters} ${textPostFix}`;
        }
        const textPostFix = numberOfCharacters
            ? 'characters remaining'
            : 'characters';
        return numberOfCharacters > 1
            ? `${remainingCharacters} ${textPostFix}`
            : '';
    }, [value, maxLength, minLength]);

    return (
        <Box
            sx={{
                '> ::placeholder': {
                    color: grey['A700'],
                    opacity: 1,
                    fontFamily: 'Lato',
                    fontSize: 16
                },
                '.textarea': {},
                '.textarea:hover': {
                    outline: `1px solid ${grey[900]}`,
                    border: `1px solid white`,
                    boxShadow: 'none'
                }
            }}
        >
            <TextareaAutosize
                className="textarea"
                placeholder={`${placeholder}${required ? '*' : ''}`}
                minRows={minRows}
                maxRows={maxRows}
                style={{
                    width: '180px',
                    borderColor: color ?? grey[400],
                    borderRadius: 4,
                    padding: '12px',
                    fontFamily: 'Lato',
                    fontSize: 16,
                    resize,
                    ...style
                }}
                name={name}
                onChange={onChange}
                value={value}
            />
            <Grid container justifyContent="space-between">
                {helpText && (
                    <Typography
                        component="span"
                        align="left"
                        variant="caption"
                        color={
                            maxLength - value.length < 0 || error
                                ? theme.palette.error.main
                                : ''
                        }
                    >
                        {helpText}
                    </Typography>
                )}
                {showCharHelpText && (
                    <Typography
                        component="div"
                        align="right"
                        variant="caption"
                        color={
                            error ||
                            maxLength - value.length < 0 ||
                            (minLength &&
                                value.length > 3 &&
                                value.length < minLength)
                                ? theme.palette.error.main
                                : ''
                        }
                    >
                        {value.length > 3 && getHelperText()}
                    </Typography>
                )}
            </Grid>
        </Box>
    );
};
