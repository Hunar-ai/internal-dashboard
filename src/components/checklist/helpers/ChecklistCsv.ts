import Papa from 'papaparse';

import {
    CHECKLIST_QUESTION_TYPES,
    CSV_OPTION_COLUMN_PREFIX,
    CSV_TEMPLATE_COLUMNS,
    CSV_TEMPLATE_FILE_NAME,
    MAX_CHECKLIST_OPTIONS,
    MAX_CHECKLIST_QUESTIONS,
    MAX_UPLOAD_SIZE_BYTES
} from '../ChecklistConstants';
import {
    canHaveOptions,
    createQuestion,
    getDuplicateOptionIds,
    getDuplicateQuestionKeys,
    toOptions
} from './ChecklistUtils';

import {
    ALLOWED_EXTENSION,
    CHECKLIST_QUESTION_TYPE,
    CSV_UPLOAD_ERROR
} from 'Enum';

import type { ChecklistFormProps } from 'interfaces';

type ChecklistCsvRow = Record<string, string | undefined>;

const OPTION_HEADER = /^option\s*(\d+)$/;

const REQUIRED_HEADERS = CSV_TEMPLATE_COLUMNS.map(column =>
    column.toLowerCase()
);

type ParseChecklistCsvResult =
    | { error: CSV_UPLOAD_ERROR }
    | { error: null; checklistForm: ChecklistFormProps };

const invalid = (error: CSV_UPLOAD_ERROR): ParseChecklistCsvResult => ({
    error
});

const getChecklistCsvTemplateHeaders = () => [
    ...CSV_TEMPLATE_COLUMNS,
    ...Array.from(
        { length: MAX_CHECKLIST_OPTIONS },
        (_, index) => `${CSV_OPTION_COLUMN_PREFIX} ${index + 1}`
    )
];

export const downloadChecklistCsvTemplate = () => {
    const csv = Papa.unparse({
        fields: getChecklistCsvTemplateHeaders(),
        data: []
    });

    const file = new File([csv], CSV_TEMPLATE_FILE_NAME, { type: 'text/csv' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');

    link.href = url;
    link.download = CSV_TEMPLATE_FILE_NAME;
    link.click();

    URL.revokeObjectURL(url);
};

const parseType = (value = '') => {
    const type = value.trim().toUpperCase().replace(/\s+/g, '_');

    return CHECKLIST_QUESTION_TYPES.includes(type as CHECKLIST_QUESTION_TYPE)
        ? (type as CHECKLIST_QUESTION_TYPE)
        : null;
};

const parseIsRequired = (value = '') =>
    !['FALSE', 'NO', '0'].includes(value.trim().toUpperCase());

const parseOptions = (row: ChecklistCsvRow, type: CHECKLIST_QUESTION_TYPE) => {
    if (!canHaveOptions(type)) {
        return [];
    }

    return Object.keys(row)
        .reduce((columns: { index: number; value: string }[], header) => {
            const match = header.match(OPTION_HEADER);
            const value = row[header]?.trim();

            return match && value
                ? [...columns, { index: Number(match[1]), value }]
                : columns;
        }, [])
        .sort((a, b) => a.index - b.index)
        .map(({ value }) => value)
        .slice(0, MAX_CHECKLIST_OPTIONS);
};

const toQuestions = (rows: ChecklistCsvRow[]): ChecklistFormProps | null =>
    rows.reduce((form: ChecklistFormProps | null, row) => {
        const type = parseType(row.type);

        if (!form || !type) {
            return null;
        }

        const question = (row.question ?? '').trim();
        const options = toOptions(parseOptions(row, type));

        if (!question || getDuplicateOptionIds(options).length) {
            return null;
        }

        return [
            ...form,
            createQuestion(form, {
                question,
                type,
                options,
                isRequired: parseIsRequired(row.required)
            })
        ];
    }, []);

const toResult = ({
    data,
    meta
}: Papa.ParseResult<ChecklistCsvRow>): ParseChecklistCsvResult => {
    const headers = meta.fields ?? [];

    if (REQUIRED_HEADERS.some(header => !headers.includes(header))) {
        return invalid(CSV_UPLOAD_ERROR.INVALID_CONTENT);
    }

    if (!data.length || data.length > MAX_CHECKLIST_QUESTIONS) {
        return invalid(CSV_UPLOAD_ERROR.INVALID_CONTENT);
    }

    const checklistForm = toQuestions(data);

    if (!checklistForm || getDuplicateQuestionKeys(checklistForm).length) {
        return invalid(CSV_UPLOAD_ERROR.INVALID_CONTENT);
    }

    return { error: null, checklistForm };
};

export const parseChecklistCsv = (
    file: File
): Promise<ParseChecklistCsvResult> => {
    if (!file.name.toLowerCase().endsWith(ALLOWED_EXTENSION.CSV)) {
        return Promise.resolve(invalid(CSV_UPLOAD_ERROR.NOT_CSV));
    }

    if (file.size > MAX_UPLOAD_SIZE_BYTES) {
        return Promise.resolve(invalid(CSV_UPLOAD_ERROR.TOO_LARGE));
    }

    return new Promise(resolve => {
        Papa.parse<ChecklistCsvRow>(file, {
            header: true,
            skipEmptyLines: true,
            transformHeader: header => header.trim().toLowerCase(),
            complete: result => resolve(toResult(result)),
            error: () => resolve(invalid(CSV_UPLOAD_ERROR.INVALID_CONTENT))
        });
    });
};
