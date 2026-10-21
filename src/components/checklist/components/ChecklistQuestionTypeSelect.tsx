import {
    Button,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import NotesIcon from '@mui/icons-material/Notes';
import NumbersIcon from '@mui/icons-material/Numbers';

import {
    CHECKLIST_QUESTION_TYPES,
    CHECKLIST_QUESTION_TYPE_LABEL
} from '../ChecklistConstants';

import { CHECKLIST_QUESTION_TYPE } from 'Enum';

const QUESTION_TYPE_ICON: Record<CHECKLIST_QUESTION_TYPE, typeof NotesIcon> = {
    [CHECKLIST_QUESTION_TYPE.MULTIPLE_CHOICE]: CheckBoxIcon,
    [CHECKLIST_QUESTION_TYPE.FREE_TEXT]: NotesIcon,
    [CHECKLIST_QUESTION_TYPE.NUMERICAL]: NumbersIcon
};

interface QuestionTypeLabelProps {
    type: CHECKLIST_QUESTION_TYPE;
}

const QuestionTypeLabel = ({ type }: QuestionTypeLabelProps) => {
    const Icon = QUESTION_TYPE_ICON[type];

    return (
        <Flex alignItems="center" gap={2}>
            <Icon sx={{ fontSize: 20 }} color="primary" />
            <Text as="span" fontWeight={400}>
                {CHECKLIST_QUESTION_TYPE_LABEL[type]}
            </Text>
        </Flex>
    );
};

interface ChecklistQuestionTypeSelectProps {
    value: CHECKLIST_QUESTION_TYPE;
    questionKey: string;
    isDisabled?: boolean;
    onChange: (_: CHECKLIST_QUESTION_TYPE) => void;
}

export const ChecklistQuestionTypeSelect = ({
    value,
    questionKey,
    isDisabled = false,
    onChange
}: ChecklistQuestionTypeSelectProps) => {
    return (
        <Menu matchWidth autoSelect={false}>
            <MenuButton
                as={Button}
                aria-label="Question type"
                data-testid={`${questionKey}-type-select`}
                variant="outline"
                fontWeight={400}
                textAlign="left"
                width="100%"
                borderColor="gray.200"
                isDisabled={isDisabled}
                rightIcon={<ChevronDownIcon boxSize={5} />}
                _hover={{ borderColor: 'gray.300' }}
            >
                <QuestionTypeLabel type={value} />
            </MenuButton>
            <MenuList minWidth="unset" zIndex="dropdown">
                {CHECKLIST_QUESTION_TYPES.map(questionType => (
                    <MenuItem
                        key={questionType}
                        onClick={() => onChange(questionType)}
                        backgroundColor={
                            questionType === value ? 'blue.50' : undefined
                        }
                    >
                        <QuestionTypeLabel type={questionType} />
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
};
