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

interface CareerPageSetupDialogProps {
    isOpen: boolean;
    onCloseClick: VoidFunction;
    onProceedClick: VoidFunction;
}

export const CareerPageSetupDialog = ({
    isOpen,
    onCloseClick,
    onProceedClick
}: CareerPageSetupDialogProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onCloseClick}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Career Page</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Company created successfully. Would you like to add career
                    page settings as well?
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onCloseClick}>
                        NOT NOW
                    </Button>
                    <Button colorScheme="blue" onClick={onProceedClick}>
                        ADD CAREER PAGE
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
