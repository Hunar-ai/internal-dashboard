import { Button, Flex, Input, Tag, Text, Tooltip } from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';

import {
    MAX_CHECKLIST_OPTIONS,
    MAX_OPTION_LENGTH,
    MAX_VISIBLE_COLLAPSED_OPTIONS,
    OPTION_TOOLTIP_MIN_LENGTH
} from '../ChecklistConstants';

import { getFilledOptions } from '../helpers/ChecklistUtils';

import type { ChecklistHandlers } from '../useChecklistForm';

import type {
    ChecklistOptionProps,
    ChecklistQuestionErrorProps
} from 'interfaces';

const OptionsLabel = () => (
    <Text fontSize="sm" fontWeight={500}>
        {`Add options:`}
    </Text>
);

interface ChecklistOptionsProps {
    questionKey: string;
    options: ChecklistOptionProps[];
    errorState: ChecklistQuestionErrorProps;
    isEditable: boolean;
    handlers: ChecklistHandlers;
}

export const ChecklistOptions = ({
    questionKey,
    options,
    errorState,
    isEditable,
    handlers
}: ChecklistOptionsProps) => {
    const {
        onOptionChange,
        onOptionAdd,
        onOptionDelete,
        onOptionFocus,
        onQuestionBlur
    } = handlers;

    if (!isEditable) {
        const filledOptions = getFilledOptions(options);

        if (!filledOptions.length) {
            return null;
        }

        const visibleOptions = filledOptions.slice(
            0,
            MAX_VISIBLE_COLLAPSED_OPTIONS
        );
        const hiddenCount = filledOptions.length - visibleOptions.length;

        return (
            <Flex direction="column" gap={2}>
                <OptionsLabel />
                <Flex gap={2} flexWrap="wrap" alignItems="center">
                    {visibleOptions.map(({ id, value }) => (
                        <Tag
                            key={id}
                            size="lg"
                            backgroundColor="gray.100"
                            color="gray.800"
                            borderRadius="md"
                            fontWeight={400}
                        >
                            {value}
                        </Tag>
                    ))}
                    {hiddenCount > 0 && (
                        <Text fontSize="sm" color="gray.600">
                            {`+${hiddenCount}`}
                        </Text>
                    )}
                </Flex>
            </Flex>
        );
    }

    return (
        <Flex direction="column" gap={3}>
            <OptionsLabel />
            {options.map(({ id, value }, index) => {
                const optionError = errorState.options?.[id];

                return (
                    <Flex key={id} direction="column" gap={1}>
                        <Flex alignItems="center" gap={2}>
                            <Tooltip
                                label={value}
                                isDisabled={
                                    value.length <= OPTION_TOOLTIP_MIN_LENGTH
                                }
                                openDelay={400}
                                placement="top-start"
                            >
                                <Input
                                    id={`${questionKey}-${id}`}
                                    name={id}
                                    value={value}
                                    placeholder={`Option ${index + 1}`}
                                    maxLength={MAX_OPTION_LENGTH}
                                    isInvalid={!!optionError?.error}
                                    onFocus={() =>
                                        onOptionFocus(questionKey, id)
                                    }
                                    onBlur={() => onQuestionBlur(questionKey)}
                                    onChange={({ target }) =>
                                        onOptionChange(
                                            questionKey,
                                            id,
                                            target.value
                                        )
                                    }
                                />
                            </Tooltip>
                            <Button
                                aria-label="Delete option"
                                variant="ghost"
                                color="gray.600"
                                isDisabled={options.length <= 1}
                                onClick={() => onOptionDelete(questionKey, id)}
                            >
                                <CloseIcon boxSize={3} />
                            </Button>
                        </Flex>
                        {optionError?.error && (
                            <Text fontSize="xs" color="red.500" pl={1}>
                                {optionError.errorMsg}
                            </Text>
                        )}
                    </Flex>
                );
            })}
            <Flex alignItems="center" justifyContent="space-between" gap={2}>
                <Button
                    leftIcon={<AddIcon boxSize={3} />}
                    variant="link"
                    colorScheme="blue"
                    alignSelf="start"
                    isDisabled={options.length >= MAX_CHECKLIST_OPTIONS}
                    onClick={() => onOptionAdd(questionKey)}
                >
                    {`Add option`}
                </Button>
                {!!errorState.optionsErrorMsg && (
                    <Text fontSize="xs" color="red.500">
                        {errorState.optionsErrorMsg}
                    </Text>
                )}
            </Flex>
        </Flex>
    );
};
