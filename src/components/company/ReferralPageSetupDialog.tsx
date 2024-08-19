import { ConfirmationDialog } from '@components/common';

interface ReferralPageSetupDialogProps {
    isOpen: boolean;
    onCloseClick: VoidFunction;
    onProceedClick: VoidFunction;
}

export const ReferralPageSetupDialog = ({
    isOpen,
    onCloseClick,
    onProceedClick
}: ReferralPageSetupDialogProps) => {
    return (
        <ConfirmationDialog
            title={`Add Referral Page`}
            // eslint-disable-next-line max-len
            description={`Career Page Settings added successfully. Would you like to add referral page settings as well?`}
            cancelText={`NOT NOW`}
            submitText={`ADD REFERRAL PAGE`}
            isOpen={isOpen}
            onSubmitClick={onProceedClick}
            onCancelClick={onCloseClick}
        />
    );
};
