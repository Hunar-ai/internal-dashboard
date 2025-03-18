import React, { type ReactNode } from 'react';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalWrapperProps {
    title: string;
    CTA?: string;
    children: ReactNode;
}

export const ModalWrapper = ({
    title,
    CTA = 'View',
    children
}: ModalWrapperProps) => {
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

    const toggleModal = () => {
        setIsModalOpen(prev => !prev);
    };

    return (
        <>
            <Button variant="text" size="small" onClick={toggleModal}>
                {CTA}
            </Button>
            <Dialog open={isModalOpen} onClose={toggleModal} fullWidth>
                <DialogTitle>
                    {title}
                    <IconButton
                        aria-label="close"
                        onClick={toggleModal}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent>{children}</DialogContent>
            </Dialog>
        </>
    );
};
