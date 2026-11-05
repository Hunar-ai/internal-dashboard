import React from 'react';

import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text
} from '@chakra-ui/react';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';

import { downloadChecklistCsvTemplate } from '../helpers/ChecklistCsv';

import { MAX_UPLOAD_SIZE_MB } from '../ChecklistConstants';

export interface ChecklistUploadModalProps {
    isOpen: boolean;
    onClose: VoidFunction;
    onFileSelect: (_: File) => void;
}

export const ChecklistUploadModal = ({
    isOpen,
    onClose,
    onFileSelect
}: ChecklistUploadModalProps) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isHovering, setIsHovering] = React.useState(false);

    const handleClose = () => {
        setIsHovering(false);
        onClose();
    };

    const handleFile = (file?: File) => {
        if (!file) {
            return;
        }

        onFileSelect(file);
        handleClose();
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleFile(event.target.files?.[0]);
        event.target.value = '';
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsHovering(false);
        handleFile(event.dataTransfer.files?.[0]);
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsHovering(true);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered size="lg">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="md">{`Upload Questions`}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Flex
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        gap={2}
                        py={10}
                        px={4}
                        borderWidth="1px"
                        borderStyle="dashed"
                        borderColor={isHovering ? 'blue.400' : 'gray.200'}
                        borderRadius="md"
                        backgroundColor={isHovering ? 'blue.50' : 'gray.50'}
                        transition="background-color 0.15s, border-color 0.15s"
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onDragLeave={() => setIsHovering(false)}
                    >
                        <InsertDriveFileOutlinedIcon color="primary" />
                        <Text fontWeight={600}>
                            {isHovering
                                ? `Drop file here to upload`
                                : `Upload CSV file`}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            {`Max size: ${MAX_UPLOAD_SIZE_MB}MB`}
                        </Text>
                        {!isHovering && (
                            <>
                                <Button
                                    colorScheme="blue"
                                    mt={2}
                                    onClick={() => inputRef.current?.click()}
                                >
                                    {`Browse files`}
                                </Button>
                                <Text fontSize="sm" color="gray.500">
                                    {`Or drag & drop your file here`}
                                </Text>
                            </>
                        )}
                        <input
                            ref={inputRef}
                            type="file"
                            hidden
                            // NOTE: Design wants the user to be able to select any file for now, may change in future
                            // accept={ALLOWED_EXTENSION.CSV}
                            onChange={onInputChange}
                        />
                    </Flex>
                    <Flex justifyContent="center" pt={4}>
                        <Button
                            leftIcon={
                                <FileDownloadOutlinedIcon
                                    sx={{ fontSize: 18 }}
                                />
                            }
                            variant="link"
                            colorScheme="blue"
                            fontSize="sm"
                            onClick={downloadChecklistCsvTemplate}
                        >
                            {`Download CSV template`}
                        </Button>
                    </Flex>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
