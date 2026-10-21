import {
    CHECKLIST_QUESTION_TYPE,
    CHECKLIST_RULE_ACTION,
    CSV_UPLOAD_ERROR
} from 'Enum';

export const MAX_CHECKLIST_QUESTIONS = 50;

export const MIN_QUESTION_LENGTH = 3;
export const MIN_OPTION_LENGTH = 1;

export const MAX_QUESTION_LENGTH = 200;
export const MAX_OPTION_LENGTH = 200;
export const MIN_CHECKLIST_OPTIONS = 1;
export const MAX_CHECKLIST_OPTIONS = 500;
export const INITIAL_OPTION_ROWS = 2;
export const MAX_RULES_PER_QUESTION = 20;

export const MAX_VISIBLE_COLLAPSED_OPTIONS = 6;

export const OPTION_TOOLTIP_MIN_LENGTH = 45;
export const DROPDOWN_TOOLTIP_MIN_LENGTH = 20;

export const MAX_UPLOAD_SIZE_MB = 2;
export const MAX_UPLOAD_SIZE_BYTES = MAX_UPLOAD_SIZE_MB * 1024 * 1024;

export const CHECKLIST_QUESTION_TYPE_LABEL: Record<
    CHECKLIST_QUESTION_TYPE,
    string
> = {
    [CHECKLIST_QUESTION_TYPE.MULTIPLE_CHOICE]: 'Multiple choice',
    [CHECKLIST_QUESTION_TYPE.FREE_TEXT]: 'Free text',
    [CHECKLIST_QUESTION_TYPE.NUMERICAL]: 'Numerical'
};

export const CHECKLIST_QUESTION_TYPES = Object.values(
    CHECKLIST_QUESTION_TYPE
) as CHECKLIST_QUESTION_TYPE[];

export const DEFAULT_QUESTION_TYPE = CHECKLIST_QUESTION_TYPE.MULTIPLE_CHOICE;

export const LEGACY_QUESTION_TYPE = CHECKLIST_QUESTION_TYPE.FREE_TEXT;

export const CHECKLIST_RULE_ACTION_LABEL: Record<
    CHECKLIST_RULE_ACTION,
    string
> = {
    [CHECKLIST_RULE_ACTION.ONLY_SHOW]: 'Only show',
    [CHECKLIST_RULE_ACTION.ONLY_HIDE]: 'Only hide',
    [CHECKLIST_RULE_ACTION.SKIP]: 'Skip question'
};

export const CHECKLIST_RULE_ACTIONS_BY_TYPE: Record<
    CHECKLIST_QUESTION_TYPE,
    CHECKLIST_RULE_ACTION[]
> = {
    [CHECKLIST_QUESTION_TYPE.MULTIPLE_CHOICE]: [
        CHECKLIST_RULE_ACTION.ONLY_SHOW,
        CHECKLIST_RULE_ACTION.ONLY_HIDE,
        CHECKLIST_RULE_ACTION.SKIP
    ],
    [CHECKLIST_QUESTION_TYPE.FREE_TEXT]: [CHECKLIST_RULE_ACTION.SKIP],
    [CHECKLIST_QUESTION_TYPE.NUMERICAL]: [CHECKLIST_RULE_ACTION.SKIP]
};

export const CSV_TEMPLATE_COLUMNS = ['Question', 'Type', 'Required'];
export const CSV_OPTION_COLUMN_PREFIX = 'Option';
export const CSV_TEMPLATE_FILE_NAME = 'selection-checklist-template.csv';

export const CSV_UPLOAD_ERROR_MSG: Record<CSV_UPLOAD_ERROR, string> = {
    [CSV_UPLOAD_ERROR.NOT_CSV]: 'The file you uploaded is not a CSV',
    [CSV_UPLOAD_ERROR.TOO_LARGE]: `Please upload a CSV that is under ${MAX_UPLOAD_SIZE_MB}MB`,
    [CSV_UPLOAD_ERROR.INVALID_CONTENT]:
        'Your CSV file contains errors. Check that every row has a valid Type and its own question text, ' +
        `with no repeated options, and that there are no more than ${MAX_CHECKLIST_QUESTIONS} questions.`
};

export interface ChecklistConfirmationProps {
    description: string;
    detail: string;
    submitText: string;
}

export const CHECKLIST_CONFIRMATION = {
    DELETE_OPTION: {
        description:
            'Deleting this option will also affect rules that reference it.',
        detail:
            'Some rules reference this option. Deleting it may remove those rules or change their conditions. ' +
            'Are you sure?',
        submitText: 'Yes, delete'
    },
    DELETE_QUESTION: {
        description:
            'Deleting this question will also delete all rules that are dependent on it.',
        detail:
            'You have added rules that are dependent on this question. ' +
            'If you delete this question, those rules will also be deleted. ' +
            'Are you sure?',
        submitText: 'Yes, delete'
    },
    EDIT_OPTION: {
        description:
            'Editing this option will delete all rules that are dependent on it.',
        detail:
            'You have added rules that are dependent on this option. ' +
            'If you edit this option, those rules will be deleted. ' +
            'Are you sure?',
        submitText: 'Yes, delete and edit'
    },
    CHANGE_QUESTION_TYPE: {
        description:
            'Changing this question will delete all rules that are dependent on it.',
        detail:
            'You have added rules that are dependent on this option. ' +
            'If you change this question, those rules will be deleted. ' +
            'Are you sure?',
        submitText: 'Yes, delete and change'
    }
} satisfies Record<string, ChecklistConfirmationProps>;
