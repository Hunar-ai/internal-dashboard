import {
    Button,
    Menu,
    MenuButton,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    Text,
    Tooltip,
    type ResponsiveValue
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { DROPDOWN_TOOLTIP_MIN_LENGTH } from '../ChecklistConstants';

import type { OptionsProps } from 'interfaces';

const TRIGGER_STYLE = {
    height: '40px',
    fontWeight: 400,
    textAlign: 'left',
    backgroundColor: 'white',
    borderRadius: 'md',
    paddingInline: 4
} as const;

interface TriggerProps {
    label: string;
    display: string;
    isPlaceholder: boolean;
    isInvalid: boolean;
    isDisabled: boolean;
    width: ResponsiveValue<string>;
}

const DropdownTrigger = ({
    label,
    display,
    isPlaceholder,
    isInvalid,
    isDisabled,
    width
}: TriggerProps) => (
    <Tooltip
        label={display}
        isDisabled={
            isPlaceholder || display.length <= DROPDOWN_TOOLTIP_MIN_LENGTH
        }
        openDelay={400}
        placement="top-start"
    >
        <MenuButton
            as={Button}
            aria-label={label}
            variant="outline"
            width={width}
            borderColor={isInvalid ? 'red.300' : 'gray.200'}
            isDisabled={isDisabled}
            rightIcon={<ChevronDownIcon boxSize={5} color="gray.500" />}
            _hover={{ borderColor: isInvalid ? 'red.400' : 'gray.300' }}
            {...TRIGGER_STYLE}
        >
            <Text
                noOfLines={1}
                fontSize="md"
                color={isPlaceholder ? 'gray.400' : 'gray.800'}
            >
                {display}
            </Text>
        </MenuButton>
    </Tooltip>
);

interface ChecklistDropdownProps {
    label: string;
    value: string;
    options: OptionsProps;
    placeholder: string;
    width?: ResponsiveValue<string>;
    isInvalid?: boolean;
    isDisabled?: boolean;
    onChange: (value: string) => void;
}

export const ChecklistDropdown = ({
    label,
    value,
    options,
    placeholder,
    width = '220px',
    isInvalid = false,
    isDisabled = false,
    onChange
}: ChecklistDropdownProps) => {
    const selected = options.find(option => option.value === value);

    return (
        <Menu matchWidth>
            <DropdownTrigger
                label={label}
                display={selected?.label ?? placeholder}
                isPlaceholder={!selected}
                isInvalid={isInvalid}
                isDisabled={isDisabled || !options.length}
                width={width}
            />
            <MenuList maxHeight="260px" overflowY="auto" zIndex="dropdown">
                <MenuOptionGroup
                    type="radio"
                    value={value}
                    onChange={next => onChange(next as string)}
                >
                    {options.map(option => (
                        <MenuItemOption key={option.value} value={option.value}>
                            {option.label}
                        </MenuItemOption>
                    ))}
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    );
};

interface ChecklistMultiDropdownProps
    extends Omit<ChecklistDropdownProps, 'value' | 'onChange'> {
    values: string[];
    onChange: (values: string[]) => void;
}

export const ChecklistMultiDropdown = ({
    label,
    values,
    options,
    placeholder,
    width = '220px',
    isInvalid = false,
    isDisabled = false,
    onChange
}: ChecklistMultiDropdownProps) => (
    <Menu matchWidth closeOnSelect={false}>
        <DropdownTrigger
            label={label}
            display={values.length ? values.join(', ') : placeholder}
            isPlaceholder={!values.length}
            isInvalid={isInvalid}
            isDisabled={isDisabled || !options.length}
            width={width}
        />
        <MenuList maxHeight="260px" overflowY="auto" zIndex="dropdown">
            <MenuOptionGroup
                type="checkbox"
                value={values}
                onChange={next => onChange(next as string[])}
            >
                {options.map(option => (
                    <MenuItemOption key={option.value} value={option.value}>
                        {option.label}
                    </MenuItemOption>
                ))}
            </MenuOptionGroup>
        </MenuList>
    </Menu>
);
