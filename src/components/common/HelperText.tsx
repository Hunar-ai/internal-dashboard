import {
    FormErrorIcon,
    FormErrorMessage,
    FormHelperText
} from '@chakra-ui/react';

type HelperTextMsgProps =
    | { msg: string; errorMsg?: string }
    | { msg?: string; errorMsg: string };

type HelperTextProps = HelperTextMsgProps & {
    hasError?: boolean;
};

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
