import {
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Button,
    Flex,
    Text
} from '@chakra-ui/react';
import {
    CheckCircleIcon,
    ChevronDownIcon,
    WarningIcon
} from '@chakra-ui/icons';

import {
    WEBHOOK_STATUSES,
    WEBHOOK_STATUS_COLOR,
    WEBHOOK_STATUS_LABEL
} from './WebhookConstants';

import { WEBHOOK_STATUS } from 'Enum';

interface WebhookStatusSelectProps {
    webhookStatus: WEBHOOK_STATUS;
    isDisabled?: boolean;
    onChange: (webhookStatus: WEBHOOK_STATUS) => void;
}

const WebhookStatusIcon = ({
    webhookStatus
}: {
    webhookStatus: WEBHOOK_STATUS;
}) => {
    const StatusIcon =
        webhookStatus === WEBHOOK_STATUS.ENABLED
            ? CheckCircleIcon
            : WarningIcon;

    return (
        <StatusIcon color={WEBHOOK_STATUS_COLOR[webhookStatus]} boxSize={4} />
    );
};

export const WebhookStatusSelect = ({
    webhookStatus,
    isDisabled = false,
    onChange
}: WebhookStatusSelectProps) => {
    return (
        <Menu>
            <MenuButton
                as={Button}
                variant="outline"
                fontWeight={400}
                width="100%"
                minWidth={0}
                paddingX={3}
                textAlign="left"
                isDisabled={isDisabled}
                rightIcon={<ChevronDownIcon />}
            >
                <Flex align="center" gap={2} overflow="hidden">
                    <WebhookStatusIcon webhookStatus={webhookStatus} />
                    <Text isTruncated>
                        {WEBHOOK_STATUS_LABEL[webhookStatus]}
                    </Text>
                </Flex>
            </MenuButton>
            <MenuList minWidth="unset">
                {WEBHOOK_STATUSES.map(status => (
                    <MenuItem key={status} onClick={() => onChange(status)}>
                        <Flex align="center" gap={2}>
                            <WebhookStatusIcon webhookStatus={status} />
                            {WEBHOOK_STATUS_LABEL[status]}
                        </Flex>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
