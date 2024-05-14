import {
    FormErrorIcon,
    FormErrorMessage,
    FormHelperText
} from '@chakra-ui/react';

interface HelperTextProps {
    hasError?: boolean;
    errorMsg?: string;
    msg?: string;
}

export const HelperText = ({
    hasError = false,
    errorMsg = '',
    msg = ''
}: HelperTextProps) => {
    if (!hasError) {
        return <FormHelperText>{msg}</FormHelperText>;
    }

    return (
        <FormErrorMessage>
            <FormErrorIcon /> {errorMsg}
        </FormErrorMessage>
    );
};
