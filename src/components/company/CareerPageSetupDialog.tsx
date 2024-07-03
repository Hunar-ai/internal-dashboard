import { ConfirmationDialog } from '@components/common';

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
        <ConfirmationDialog
            title={`Add Career Page`}
            description={`Company created successfully. Would you like to add career page settings as well?`}
            cancelText={`NOT NOW`}
            submitText={`ADD CAREER PAGE`}
            isOpen={isOpen}
            onSubmitClick={onProceedClick}
            onCancelClick={onCloseClick}
        />
    );
};
