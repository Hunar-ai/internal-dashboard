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
    detail?: string;
    isOpen: boolean;
    cancelText?: string;
    submitText?: string;
    isCentered?: boolean;
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
    isCentered = false,
    onCancelClick,
    onSubmitClick
}: ConfirmationDialogProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onCancelClick} isCentered={isCentered}>
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
                    <Button
                        variant="outline"
                        colorScheme="blue"
                        mr={3}
                        onClick={onCancelClick}
                    >
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
