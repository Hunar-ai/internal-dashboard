import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from '@chakra-ui/react';

export interface ConfirmationDialogProps {
    title: string;
    description: string;
    /** A second paragraph. When given, `description` becomes the bold lead. */
    detail?: string;
    isOpen: boolean;
    cancelText?: string;
    submitText?: string;
    /** Red confirm button, for an action that throws work away. */
    isDestructive?: boolean;
    onSubmitClick: VoidFunction;
    onCancelClick: VoidFunction;
}

export const ConfirmationDialog = ({
    title,
    description,
    detail,
    isOpen,
    cancelText = 'CANCEL',
    submitText = 'SURE',
    isDestructive = false,
    onCancelClick,
    onSubmitClick
}: ConfirmationDialogProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onCancelClick} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontWeight={detail ? 500 : 400}>{description}</Text>
                    {!!detail && (
                        <Text mt={3} color="gray.600">
                            {detail}
                        </Text>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onCancelClick}>
                        {cancelText}
                    </Button>
                    <Button
                        colorScheme={isDestructive ? 'red' : 'blue'}
                        onClick={onSubmitClick}
                    >
                        {submitText}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
