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
    Text,
    FormControl
} from '@chakra-ui/react';

import { AppLoader } from '@components/common';

import AthenaLogo from 'assets/athena-logo.svg?react';

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
    handleSubmit: (_: SigninFormProps) => void;
    isLoading: boolean;
}

const validationMap: ValidationMapProps = {
    email: email => RegExUtil.isEmail(email)
};

export const SigninForm = ({ handleSubmit, isLoading }: Props) => {
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
            color="grey.700"
            bg="blue.900"
            justifyContent="center"
            height="100vh"
            pt={{ base: 0, sm: 14 }}
        >
            <VStack
                bg="white"
                width={{ base: '100%', sm: '424px' }}
                height={{ base: '100%', sm: '535px' }}
                pt={8}
                px={9}
                borderRadius={{ base: 0, sm: 16 }}
                spacing="14px"
                position="relative"
            >
                {isLoading && <AppLoader isFullScreen={false} />}
                <Flex flexDirection="column" alignItems="center" gap={1}>
                    <AthenaLogo />
                    <Text fontWeight={600} fontSize="xl">
                        Athena
                    </Text>
                    <Text fontSize="xs">{`All things internal`}</Text>
                </Flex>
                <VStack width="100%" spacing={6}>
                    <FormControl isRequired width="100%">
                        <FormLabel color="gray.700" fontWeight={400}>
                            Email address
                        </FormLabel>
                        <Input
                            placeholder="Enter Email ID"
                            name="email"
                            onChange={updateForm}
                        />
                    </FormControl>
                    <FormControl isRequired width="100%">
                        <FormLabel color="gray.700" fontWeight={400}>
                            Password
                        </FormLabel>
                        <Input
                            placeholder="Enter Password"
                            name="password"
                            onChange={updateForm}
                            type="password"
                        />
                    </FormControl>
                    <Button
                        width={'100%'}
                        colorScheme="blue"
                        onClick={() => handleSubmit(form)}
                        isDisabled={hasFormError}
                        isLoading={isLoading}
                        loadingText="Submitting"
                    >
                        LOGIN
                    </Button>
                </VStack>
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
