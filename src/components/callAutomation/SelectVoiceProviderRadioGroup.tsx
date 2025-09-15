import {
    Button,
    Text,
    RadioGroup,
    Radio,
    Stack,
    FormControl
} from '@chakra-ui/react';
import AddIcon from '@mui/icons-material/Add';

import { FieldRequiredIndicator, HelperText } from '@components/common';

import { CompanyProviderProps } from 'interfaces/voiceConfig.interface';
import { ErrorMsg } from 'utils';

interface SelectVoiceProviderRadioGroupProps {
    providersList: CompanyProviderProps[];
    isDisabled: boolean;
    hasError: boolean;
    selectedProviderId?: string;
    onSelectedProviderIdChange: (providerId: string) => void;
    onOpenAddProviderModal: VoidFunction;
}

export const SelectVoiceProviderRadioGroup = ({
    providersList,
    isDisabled,
    selectedProviderId,
    hasError,
    onSelectedProviderIdChange,
    onOpenAddProviderModal
}: SelectVoiceProviderRadioGroupProps) => {
    return (
        <>
            <Text variant="xl" fontWeight={500}>
                {`Phone number`}
                <FieldRequiredIndicator />
            </Text>
            <FormControl isInvalid={hasError}>
                <RadioGroup
                    isDisabled={isDisabled}
                    value={selectedProviderId}
                    onChange={onSelectedProviderIdChange}
                    mt={2}
                >
                    <Stack direction="column" gap={0}>
                        {providersList.map(provider => (
                            <Stack key={provider.id} direction="row">
                                <Radio
                                    value={provider.provider.id}
                                    name={
                                        provider.provider.config.meta
                                            .mobileNumber
                                    }
                                    mb={2}
                                >
                                    {
                                        provider.provider.config.meta
                                            .referenceName
                                    }
                                    {` : `}
                                    {provider.provider.config.meta.mobileNumber}
                                </Radio>
                            </Stack>
                        ))}
                    </Stack>
                    {hasError && (
                        <HelperText
                            hasError={true}
                            errorMsg={ErrorMsg.required()}
                        />
                    )}
                </RadioGroup>
            </FormControl>
            <Button
                colorScheme="blue"
                variant={providersList.length ? 'ghost' : 'outline'}
                leftIcon={providersList.length ? <AddIcon /> : <></>}
                mt={2}
                pl={providersList.length ? 0 : 2}
                onClick={onOpenAddProviderModal}
                isDisabled={isDisabled}
            >
                {providersList.length ? 'ADD ANOTHER NUMBER' : `ADD NUMBER`}
            </Button>
        </>
    );
};
