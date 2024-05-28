import { FormControl, FormLabel, Switch } from '@chakra-ui/react';
import { DEFAULT_LMS_SETTINGS } from 'Constants';

import type { CompanyFormProps, CompanySettingsProps } from 'interfaces';

interface CompanyAddSettingsFormProps {
    isDisabled: boolean;
    settings: CompanySettingsProps;
    updateForm: (modifiedForm: Partial<CompanyFormProps>) => void;
}

export const CompanyAddSettingsForm = ({
    isDisabled,
    settings,
    updateForm
}: CompanyAddSettingsFormProps) => {
    const onBlockMessagingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isMessagingBlocked = !e.target.checked;
        const modifiedLmsSettings = isMessagingBlocked
            ? {
                  blockMessaging: true
              }
            : { ...DEFAULT_LMS_SETTINGS };

        updateForm({
            settings: { ...settings, lmsSettings: modifiedLmsSettings }
        });
    };

    return (
        <>
            <FormControl
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                isDisabled={isDisabled}
            >
                <FormLabel>Allow Messaging</FormLabel>
                <Switch
                    name="blockMessaging"
                    isChecked={!settings.lmsSettings.blockMessaging}
                    onChange={onBlockMessagingChange}
                />
            </FormControl>
        </>
    );
};
