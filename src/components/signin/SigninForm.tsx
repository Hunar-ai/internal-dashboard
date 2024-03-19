/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

import { RegExUtil } from 'utils';
import { useIsMobile } from 'hooks';
import {
    Grid,
    GridItem,
    Container,
    Heading,
    Input,
    Flex,
    Box,
    VStack,
    Button,
    FormLabel,
    Text
} from '@chakra-ui/react';

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
        <Flex
            color="white"
            bg="#1E2442"
            justifyContent="center"
            height="100vh"
            p={10}
        >
            <VStack bg="#242b4d" width={'30%'} p={10} spacing={6}>
                <Flex alignItems="baseline">
                    <>
                        <Text fontWeight={500} fontSize={20} mr={2}>
                            Athena -
                        </Text>
                        <Text fontSize={11}>{`   All things internal`}</Text>
                    </>
                </Flex>
                <Box width={300}>
                    <FormLabel fontSize={12}>Email address</FormLabel>
                    <Input
                        placeholder="Enter your email address"
                        size="sm"
                        bg="#393f5c"
                        border="none"
                        name="email"
                        onChange={updateForm}
                    />
                </Box>
                <Box width={300}>
                    <FormLabel fontSize={12}>Password</FormLabel>
                    <Input
                        bg="#393f5c"
                        size="sm"
                        border="none"
                        name="password"
                        onChange={updateForm}
                        type="password"
                    />
                </Box>
                <Box width={300}>
                    <Button
                        bg="#5a99e8"
                        size="sm"
                        width={'100%'}
                        color="white"
                        onClick={() => handleSubmit(form)}
                        isLoading={isLoading}
                        loadingText="Submitting"
                        fontSize={12}
                    >
                        LOGIN
                    </Button>
                </Box>
            </VStack>
        </Flex>
        // <Container
        //     centerContent
        //     bg="teal.100"
        //     p={{ xs: 3, sm: 6 }}
        //     h={100}
        //     width={300}
        // >
        //     <GridItem mb={isMobile ? 0 : 3}>
        //         <Container justifyContent="center">
        //             <GridItem textAlign="center">
        //                 <Heading
        //                     as="h1"
        //                     size="4xl"
        //                     noOfLines={1}
        //                     fontSize="25px"
        //                 >
        //                     Sign in
        //                 </Heading>
        //             </GridItem>
        //             <GridItem textAlign="center">
        //                 to continue to Hunar LMS
        //             </GridItem>
        //         </Container>
        //     </GridItem>
        //     <GridItem>
        //         <Input placeholder="Enter your Email ID" size="sm" />
        //         <TextField
        //             required
        //             fullWidth
        //             id="email"
        //             variant="outlined"
        //             name="email"
        //             label="Email"
        //             placeholder="Enter your Email ID"
        //             value={form.email}
        //             error={errorState.email}
        //             helperText={
        //                 errorState.email ? 'Must be a valid email address' : ''
        //             }
        //             onChange={updateForm}
        //         />
        //     </GridItem>
        // </Container>
    );
};
