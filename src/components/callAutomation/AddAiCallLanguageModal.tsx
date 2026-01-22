import React from 'react';

import {
    Button,
    FormControl,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    Box
} from '@chakra-ui/react';
import { SelectField, HelperText } from '@components/common';

import { SettingsContext } from 'contexts';
import { useValidationHelper } from 'hooks';
import { useToast } from 'hooks/useToast';

import type { OptionsProps } from 'interfaces';
import { ErrorMsg } from 'utils';
import { CallAutomationEditForm } from './CallAutomationEditForm';

interface AddAiCallLanguageModalProps {
    isOpen: boolean;
    defaultLanguage: string;
    jobQueriesCount?: number;
    setDefaultLanguage: React.Dispatch<
        React.SetStateAction<CallAutomationEditForm>
    >;
    handleCloseClick: VoidFunction;
}

export const AddAiCallLanguageModal = ({
    isOpen,
    defaultLanguage,
    jobQueriesCount = 0,
    handleCloseClick,
    setDefaultLanguage
}: AddAiCallLanguageModalProps) => {
    const {
        formFields: { callLanguage }
    } = React.useContext(SettingsContext);

    const { hasFormFieldError } = useValidationHelper();
    const { showError } = useToast();

    const callLanguageOptions: OptionsProps = React.useMemo(() => {
        return callLanguage ?? [];
    }, [callLanguage]);

    const [languageError, setLanguageError] = React.useState<boolean>(false);

    const onLanguageChange = React.useCallback(
        ({ target: { name, value } }: React.ChangeEvent<HTMLSelectElement>) => {
            setDefaultLanguage(prevForm => ({
                ...prevForm,
                defaultLanguage: value
            }));
            setLanguageError(
                hasFormFieldError({ fieldName: name, fieldValue: value })
            );
        },
        [hasFormFieldError, setDefaultLanguage]
    );

    const onSubmit = React.useCallback(() => {
        if (!defaultLanguage) {
            setLanguageError(true);
            showError({
                title: 'Error',
                description: 'Please select a language'
            });
            return;
        }

        handleCloseClick();
    }, [defaultLanguage, handleCloseClick, showError]);

    return (
        <Modal
            size="lg"
            isOpen={isOpen}
            onClose={handleCloseClick}
            closeOnEsc={false}
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{`Choose Default Language`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody paddingY={6}>
                    <Box mb={6}>
                        <Text
                            display="flex"
                            marginBottom={0.5}
                            fontSize="md"
                            fontWeight={600}
                        >
                            {`This company has ${jobQueriesCount} without AI calling language!`}
                        </Text>
                        <Text fontSize="sm">
                            To enable automated calling, please select a default
                            language for all JQs with missing language.
                        </Text>
                    </Box>
                    <FormControl>
                        <SelectField
                            label=""
                            name="defaultLanguage"
                            placeholder="Choose Language"
                            options={callLanguageOptions}
                            value={defaultLanguage}
                            onChange={onLanguageChange}
                            isInvalid={languageError}
                            helperText={
                                <HelperText
                                    hasError={languageError}
                                    errorMsg={ErrorMsg.required()}
                                />
                            }
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button mr={3} onClick={handleCloseClick}>
                        {`CANCEL`}
                    </Button>
                    <Button colorScheme="blue" onClick={onSubmit}>
                        {`SAVE LANGUAGE`}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
