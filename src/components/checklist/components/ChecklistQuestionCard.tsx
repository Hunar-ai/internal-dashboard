import React from 'react';

import {
    Box,
    Button,
    Divider,
    Flex,
    IconButton,
    Input,
    Switch,
    Text,
    type FlexProps
} from '@chakra-ui/react';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import InfoIcon from '@mui/icons-material/Info';

import { ChecklistOptions } from './ChecklistOptions';
import { ChecklistQuestionTypeSelect } from './ChecklistQuestionTypeSelect';
import { ChecklistRuleRow } from './ChecklistRuleRow';

import {
    canHaveOptions,
    getConflictingRuleCount
} from '../helpers/ChecklistUtils';

import { CHECKLIST_RULE_CONFLICT } from '../ChecklistConstants';

import type { ChecklistHandlers } from '../useChecklistForm';

import type {
    ChecklistFormProps,
    ChecklistQuestionErrorProps,
    ChecklistQuestionProps
} from 'interfaces';

const PANEL_EDGE_GAP = '16px';
const PANEL_TOP = '80px';

const PANEL_WIDTH = 'calc(12.5vw + 2px)';

interface ConflictPanelProps extends FlexProps {
    ruleCount: number;
}

const ConflictPanel = ({ ruleCount, ...positionProps }: ConflictPanelProps) => (
    <Flex
        direction="column"
        gap={1}
        padding={5}
        borderRadius="lg"
        backgroundColor="orange.100"
        color="orange.900"
        {...positionProps}
    >
        <Box color="orange.500" lineHeight={0}>
            <InfoIcon sx={{ fontSize: 20 }} />
        </Box>
        <Text fontSize="md" fontWeight={600}>
            {CHECKLIST_RULE_CONFLICT.title}
        </Text>
        <Text fontSize="sm" lineHeight={1.6}>
            {CHECKLIST_RULE_CONFLICT.getDescription(ruleCount)}
        </Text>
    </Flex>
);

interface ChecklistQuestionCardProps {
    index: number;
    question: ChecklistQuestionProps;
    checklistForm: ChecklistFormProps;
    canAddRule: boolean;
    errorState: ChecklistQuestionErrorProps;
    isExpanded: boolean;
    handlers: ChecklistHandlers;
}

export const ChecklistQuestionCard = React.memo(
    ({
        index,
        question,
        checklistForm,
        canAddRule,
        errorState,
        isExpanded,
        handlers
    }: ChecklistQuestionCardProps) => {
        const { key, type, options, isRequired, rules } = question;
        const {
            onExpand,
            onQuestionChange,
            onTypeChange,
            onRequiredChange,
            onQuestionDelete,
            onQuestionBlur,
            onRuleAdd
        } = handlers;

        const hasQuestionError = !!errorState.question?.error;
        const conflictingRuleCount = getConflictingRuleCount(question);

        return (
            <Box
                id={`${key}-card`}
                borderWidth="1px"
                borderColor={hasQuestionError ? 'red.300' : 'gray.200'}
                borderLeftWidth={isExpanded ? '4px' : '1px'}
                borderLeftColor={isExpanded ? 'blue.500' : 'gray.200'}
                borderRadius="md"
                backgroundColor="white"
                padding={4}
                onClick={() => onExpand(key)}
            >
                {isExpanded && conflictingRuleCount > 0 && (
                    <ConflictPanel
                        ruleCount={conflictingRuleCount}
                        position="fixed"
                        top={PANEL_TOP}
                        right={PANEL_EDGE_GAP}
                        width={PANEL_WIDTH}
                        display={{ base: 'none', lg: 'flex' }}
                    />
                )}
                <Flex direction="column" gap={4}>
                    <Text fontWeight={600}>{`Question ${index + 1}`}</Text>

                    <Flex
                        gap={4}
                        alignItems="start"
                        direction={{ base: 'column', md: 'row' }}
                    >
                        <Flex direction="column" gap={1} flex={1} width="100%">
                            <Input
                                id={key}
                                name={key}
                                value={question.question}
                                placeholder="Question"
                                isInvalid={hasQuestionError}
                                onBlur={() => onQuestionBlur(key)}
                                onChange={({ target }) =>
                                    onQuestionChange(key, target.value)
                                }
                            />
                            {hasQuestionError && (
                                <Text fontSize="xs" color="red.500" pl={1}>
                                    {errorState.question?.errorMsg}
                                </Text>
                            )}
                        </Flex>
                        <Box width={{ base: '100%', md: '220px' }}>
                            <ChecklistQuestionTypeSelect
                                value={type}
                                questionKey={key}
                                onChange={questionType =>
                                    onTypeChange(key, questionType)
                                }
                            />
                        </Box>
                    </Flex>

                    {canHaveOptions(type) && (
                        <ChecklistOptions
                            questionKey={key}
                            options={options}
                            errorState={errorState}
                            isEditable={isExpanded}
                            handlers={handlers}
                        />
                    )}

                    {isExpanded && (
                        <>
                            {rules.map(rule => (
                                <ChecklistRuleRow
                                    key={rule.id}
                                    rule={rule}
                                    question={question}
                                    checklistForm={checklistForm}
                                    errorState={errorState}
                                    handlers={handlers}
                                />
                            ))}
                            <Divider />
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                                gap={4}
                            >
                                <Button
                                    leftIcon={
                                        <AccountTreeIcon
                                            sx={{ fontSize: 18 }}
                                        />
                                    }
                                    colorScheme="blue"
                                    isDisabled={!canAddRule}
                                    onClick={() => onRuleAdd(key)}
                                >
                                    {rules.length
                                        ? 'Add Another Rule'
                                        : 'Add Rule'}
                                </Button>
                                <Flex alignItems="center" gap={3}>
                                    <Text fontSize="sm">{`Required`}</Text>
                                    <Switch
                                        id={`${key}-required`}
                                        aria-label="Required"
                                        colorScheme="blue"
                                        isChecked={isRequired}
                                        onChange={({ target }) =>
                                            onRequiredChange(
                                                key,
                                                target.checked
                                            )
                                        }
                                    />
                                    <Divider
                                        orientation="vertical"
                                        height={6}
                                    />
                                    <IconButton
                                        aria-label="Delete question"
                                        variant="ghost"
                                        color="gray.600"
                                        icon={<DeleteOutlineIcon />}
                                        onClick={() => onQuestionDelete(key)}
                                    />
                                </Flex>
                            </Flex>
                        </>
                    )}
                </Flex>
            </Box>
        );
    }
);

ChecklistQuestionCard.displayName = 'ChecklistQuestionCard';
