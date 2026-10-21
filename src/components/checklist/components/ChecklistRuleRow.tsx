import { Flex, IconButton, Text } from '@chakra-ui/react';
import CloseIcon from '@mui/icons-material/Close';

import { ChecklistDropdown, ChecklistMultiDropdown } from './ChecklistDropdown';

import { CHECKLIST_RULE_ACTION_LABEL } from '../ChecklistConstants';
import {
    filtersOptions,
    getAvailableActions,
    getAvailableTriggerOptions,
    getFilledOptions,
    getAvailableSources,
    getQuestionLabel
} from '../helpers/ChecklistUtils';

import { CHECKLIST_RULE_ACTION } from 'Enum';
import type { ChecklistHandlers } from '../useChecklistForm';

import type {
    ChecklistFormProps,
    ChecklistOptionProps,
    ChecklistQuestionErrorProps,
    ChecklistQuestionProps,
    ChecklistRuleProps,
    OptionsProps
} from 'interfaces';

const CONNECTOR_STYLE = {
    fontSize: 'sm',
    color: 'gray.600',
    flexShrink: 0
} as const;

const toValueOptions = (options: ChecklistOptionProps[]): OptionsProps =>
    options.map(({ value }) => ({ value: value.trim(), label: value.trim() }));

interface ChecklistRuleRowProps {
    rule: ChecklistRuleProps;
    question: ChecklistQuestionProps;
    checklistForm: ChecklistFormProps;
    errorState: ChecklistQuestionErrorProps;
    handlers: ChecklistHandlers;
}

export const ChecklistRuleRow = ({
    rule,
    question,
    checklistForm,
    errorState,
    handlers
}: ChecklistRuleRowProps) => {
    const { onRuleChange, onRuleDelete } = handlers;
    const ruleError = errorState.rules?.[rule.id] ?? {};

    const sourceOptions = getAvailableSources(checklistForm, question.key).map(
        source => ({
            value: source.key,
            label: getQuestionLabel(checklistForm, source)
        })
    );
    const triggerOptions = toValueOptions(
        getAvailableTriggerOptions(checklistForm, question, rule)
    );
    const shownOptions = toValueOptions(getFilledOptions(question.options));
    const actionOptions = getAvailableActions(question.type).map(action => ({
        value: action,
        label: CHECKLIST_RULE_ACTION_LABEL[action]
    }));

    const errorMsg =
        ruleError.dependentId?.errorMsg ??
        ruleError.dependentOptions?.errorMsg ??
        ruleError.ruleAction?.errorMsg ??
        ruleError.selectedOptions?.errorMsg;

    return (
        <Flex direction="column" gap={1}>
            <Flex alignItems="center" gap={3} flexWrap="wrap">
                <Text {...CONNECTOR_STYLE}>{`When`}</Text>
                <ChecklistDropdown
                    label="Rule question"
                    value={rule.dependentId}
                    options={sourceOptions}
                    placeholder="Select question"
                    width="240px"
                    isInvalid={!!ruleError.dependentId?.error}
                    onChange={dependentId =>
                        onRuleChange(question.key, rule.id, {
                            dependentId,
                            dependentOptions: []
                        })
                    }
                />

                <Text {...CONNECTOR_STYLE}>{`is`}</Text>
                <ChecklistMultiDropdown
                    label="Rule value"
                    values={rule.dependentOptions}
                    options={triggerOptions}
                    placeholder={
                        triggerOptions.length
                            ? 'Select value'
                            : 'No options yet'
                    }
                    width="200px"
                    isInvalid={!!ruleError.dependentOptions?.error}
                    isDisabled={!rule.dependentId}
                    onChange={dependentOptions =>
                        onRuleChange(question.key, rule.id, {
                            dependentOptions
                        })
                    }
                />

                <Text {...CONNECTOR_STYLE}>{`Then`}</Text>
                <ChecklistDropdown
                    label="Rule action"
                    value={rule.ruleAction}
                    options={actionOptions}
                    placeholder="Select action"
                    width="140px"
                    isInvalid={!!ruleError.ruleAction?.error}
                    onChange={ruleAction =>
                        onRuleChange(question.key, rule.id, {
                            ruleAction: ruleAction as CHECKLIST_RULE_ACTION,
                            selectedOptions: []
                        })
                    }
                />

                {filtersOptions(rule.ruleAction) && (
                    <ChecklistMultiDropdown
                        label="Rule target options"
                        values={rule.selectedOptions}
                        options={shownOptions}
                        placeholder={
                            shownOptions.length
                                ? 'Select options'
                                : 'No options yet'
                        }
                        width="220px"
                        isInvalid={!!ruleError.selectedOptions?.error}
                        onChange={selectedOptions =>
                            onRuleChange(question.key, rule.id, {
                                selectedOptions
                            })
                        }
                    />
                )}

                <IconButton
                    aria-label="Delete rule"
                    variant="ghost"
                    color="gray.600"
                    icon={<CloseIcon fontSize="small" />}
                    onClick={() => onRuleDelete(question.key, rule.id)}
                />
            </Flex>
            {!!errorMsg && (
                <Text fontSize="xs" color="red.500" pl={1}>
                    {errorMsg}
                </Text>
            )}
        </Flex>
    );
};
