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

import type { CompanyProviderProps } from 'interfaces';
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
                        {providersList.map(provider => {
                            const { referenceName, mobileNumber } =
                                provider.provider.config.meta;
                            return (
                                <Stack key={provider.id} direction="row">
                                    <Radio
                                        value={provider.provider.id}
                                        name={mobileNumber}
                                        mb={2}
                                    >
                                        {`${referenceName} : ${mobileNumber}`}
                                    </Radio>
                                </Stack>
                            );
                        })}
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
