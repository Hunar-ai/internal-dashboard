import { Text } from '@chakra-ui/react';

export const FieldRequiredIndicator = () => {
    return (
        <Text as="span" color="red.500">
            {` *`}
        </Text>
    );
};
