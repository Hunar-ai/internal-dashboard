import { Button, Flex, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

import { ChecklistQuestionCard } from './ChecklistQuestionCard';

import {
    MAX_CHECKLIST_QUESTIONS,
    MAX_RULES_PER_QUESTION
} from '../ChecklistConstants';
import { getAvailableSources } from '../helpers/ChecklistUtils';

import type { ChecklistHandlers } from '../useChecklistForm';

import type {
    ChecklistFormErrorStateProps,
    ChecklistFormProps
} from 'interfaces';

//shared fallbacks, so a card without errors or without rules to draw keeps the
//same props between renders and React.memo can skip it
const NO_ERRORS = {};
const NO_FORM: ChecklistFormProps = [];

interface ChecklistQuestionListProps {
    checklistForm: ChecklistFormProps;
    checklistFormErrorState: ChecklistFormErrorStateProps;
    expandedQuestionKey: string;
    onQuestionAdd: VoidFunction;
    openUploadModal: VoidFunction;
    handlers: ChecklistHandlers;
}

export const ChecklistQuestionList = ({
    checklistForm,
    checklistFormErrorState,
    expandedQuestionKey,
    onQuestionAdd,
    openUploadModal,
    handlers
}: ChecklistQuestionListProps) => {
    if (!checklistForm.length) {
        return (
            <Flex alignItems="center" gap={4} id="checklist-empty-state">
                <Button
                    leftIcon={<FileUploadOutlinedIcon sx={{ fontSize: 20 }} />}
                    variant="outline"
                    colorScheme="blue"
                    onClick={openUploadModal}
                >
                    {`Upload Questions`}
                </Button>
                <Text as="span" fontSize="sm" color="gray.600">
                    {`or`}
                </Text>
                <Button
                    leftIcon={<EditOutlinedIcon sx={{ fontSize: 20 }} />}
                    variant="outline"
                    colorScheme="blue"
                    onClick={onQuestionAdd}
                >
                    {`Add Manually`}
                </Button>
            </Flex>
        );
    }

    return (
        <Flex direction="column" gap={4} id="checklist-question-list">
            {checklistForm.map((question, index) => {
                const isExpanded = question.key === expandedQuestionKey;

                return (
                    <ChecklistQuestionCard
                        key={question.key}
                        index={index}
                        question={question}
                        checklistForm={isExpanded ? checklistForm : NO_FORM}
                        canAddRule={
                            !!getAvailableSources(checklistForm, question.key)
                                .length &&
                            question.rules.length < MAX_RULES_PER_QUESTION
                        }
                        errorState={
                            checklistFormErrorState[question.key] ?? NO_ERRORS
                        }
                        isExpanded={isExpanded}
                        handlers={handlers}
                    />
                );
            })}
            <Button
                leftIcon={<AddIcon boxSize={3} />}
                variant="link"
                colorScheme="blue"
                alignSelf="start"
                isDisabled={checklistForm.length >= MAX_CHECKLIST_QUESTIONS}
                onClick={onQuestionAdd}
            >
                {`Add Question`}
            </Button>
        </Flex>
    );
};
