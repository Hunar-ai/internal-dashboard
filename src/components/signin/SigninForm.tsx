import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';

import { RegExUtil } from 'utils';
import { useIsMobile } from 'hooks';

export interface ValidationMapProps {
    [key: string]: (_: string) => boolean;
}

export interface SigninFormProps {
    email: string;
    password: string;
}

export type SignInFormErrorProps = {
    [key in keyof SigninFormProps]: boolean;
};

interface Props {
    apiError: string;
    handleSubmit: (_: SigninFormProps) => void;
    isLoading: boolean;
}

const validationMap: ValidationMapProps = {
    email: email => RegExUtil.isEmail(email)
};

export const SigninForm = ({ apiError, handleSubmit, isLoading }: Props) => {
    const isMobile = useIsMobile();

    const [form, setForm] = React.useState<SigninFormProps>({
        email: '',
        password: ''
    });
    const [errorState, setErrorState] = React.useState<SignInFormErrorProps>({
        email: false,
        password: false
    });
    const isValid = (fieldName: string, fieldValue: string): boolean => {
        return (
            !fieldValue ||
            (fieldName in validationMap &&
                !validationMap[fieldName](fieldValue))
        );
    };

    const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setForm(oldForm => ({
            ...oldForm,
            [fieldName]: fieldValue
        }));
        setErrorState(oldError => ({
            ...oldError,
            [fieldName]: isValid(fieldName, fieldValue)
        }));
    };

    const hasFormError =
        Object.values(form).indexOf('') > -1 ||
        Object.values(errorState).indexOf(true) > -1;

    return (
        <Grid container p={{ xs: 3, sm: 6 }} spacing={2}>
            <Grid item xs={12} mb={isMobile ? 0 : 3}>
                <Grid container spacing={0.5} justifyContent="center">
                    <Grid item xs={12} textAlign="center">
                        <Typography variant="h5" component="h5">
                            Sign in
                        </Typography>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                        <Typography variant="subtitle1">
                            to continue to Hunar LMS
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            {apiError && (
                <Grid item xs={12}>
                    <Alert severity="error">{apiError}</Alert>
                </Grid>
            )}
            <Grid item xs={12} container spacing={isMobile ? 2 : 3}>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        variant="outlined"
                        name="email"
                        label="Email"
                        placeholder="Enter your Email ID"
                        value={form.email}
                        error={errorState.email}
                        helperText={
                            errorState.email
                                ? 'Must be a valid email address'
                                : ''
                        }
                        onChange={updateForm}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="password"
                        variant="outlined"
                        name="password"
                        label="Password"
                        placeholder="Enter your Password"
                        type="password"
                        value={form.password}
                        error={errorState.password}
                        helperText={errorState.password ? 'Required' : ''}
                        onChange={updateForm}
                    />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="end">
                    <LoadingButton
                        variant="contained"
                        size="large"
                        onClick={() => handleSubmit(form)}
                        loading={isLoading}
                        disabled={hasFormError}
                        sx={{
                            bgcolor: '#3545A3',
                            '&:hover': {
                                bgcolor: '#404ea1'
                            }
                        }}
                    >
                        Sign in
                    </LoadingButton>
                </Grid>
            </Grid>
        </Grid>
    );
};
