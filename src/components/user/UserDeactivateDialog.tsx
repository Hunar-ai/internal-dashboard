import React from 'react';

import {
    Box,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from '@chakra-ui/react';

interface UserDeactivateDialogProps {
    isOpen: boolean;
    personnelId: string;
    personnelName: string;
    personnelEmail: string;
    personnelMobileNumber: string;
    onSubmitClick: VoidFunction;
    onCancelClick: VoidFunction;
}

export const UserDeactivateDialog = ({
    isOpen,
    personnelId,
    personnelName,
    personnelEmail,
    personnelMobileNumber,
    onCancelClick,
    onSubmitClick
}: UserDeactivateDialogProps) => {
    const [dialogPersonnelId, setDialogPersonnelId] = React.useState('');

    const handleCancelClick = () => {
        setDialogPersonnelId('');
        onCancelClick();
    };

    return (
        <Modal
            size="lg"
            isOpen={isOpen}
            onClose={handleCancelClick}
            closeOnEsc={false}
            closeOnOverlayClick={false}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{`Deactivate User`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        {`Are you sure you want to deactivate the personnel with
                        the following details:`}
                    </Text>
                    <Box pt={2}>
                        <Text fontWeight={600} as="span">{`Name: `}</Text>
                        <Text as="span">{personnelName}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={600} as="span">{`Email: `}</Text>
                        <Text as="span">{personnelEmail}</Text>
                    </Box>
                    <Box>
                        <Text fontWeight={600} as="span">{`Mobile: `}</Text>
                        <Text as="span">{personnelMobileNumber}</Text>
                    </Box>
                    <Box pt={3}>
                        <Text pb={2}>Enter Personnel Id to confirm</Text>
                        <Input
                            placeholder="Personnel Id"
                            name="personnelId"
                            value={dialogPersonnelId || ''}
                            onChange={e => setDialogPersonnelId(e.target.value)}
                            autoComplete="off"
                            onPaste={e => e.preventDefault()}
                        />
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={handleCancelClick}>
                        {`CANCEL`}
                    </Button>
                    <Button
                        colorScheme="blue"
                        onClick={onSubmitClick}
                        isDisabled={personnelId !== dialogPersonnelId}
                    >
                        {`DEACTIVATE`}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
