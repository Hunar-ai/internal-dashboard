import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';

interface ConfirmationDialogProps {
    title: string;
    description: string;
    isOpen: boolean;
    cancelText?: string;
    submitText?: string;
    onSubmitClick: VoidFunction;
    onCancelClick: VoidFunction;
}

export const ConfirmationDialog = ({
    title,
    description,
    isOpen,
    cancelText = 'CANCEL',
    submitText = 'SURE',
    onCancelClick,
    onSubmitClick
}: ConfirmationDialogProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onCancelClick}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{description}</ModalBody>
                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onCancelClick}>
                        {cancelText}
                    </Button>
                    <Button colorScheme="blue" onClick={onSubmitClick}>
                        {submitText}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
