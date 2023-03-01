import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { ALLOWED_EXTENSION, FIELD_TYPE } from 'Enum';
import { Options, QuestionOptionProps } from 'interfaces';
import { DatePicker, Select, UploadButton, TextArea } from 'components/common';
import { QuestionOptions } from './QuestionOptions';
import { TimeUtils } from 'utils';
import { useTheme } from '@mui/material';

const getSelectedOption = (options: Options, value: string | undefined) => {
    return value ? options.find(option => option.value === value) : null;
};

const DROPDOWN_LIMIT = 2;

interface AnswerInputFieldProps {
    options: QuestionOptionProps[];
    questionType: FIELD_TYPE;
    parentKey: string;
    onAnswerClick: (_: { key: string; value: string }) => void;
    onFileUpload: (_: File) => void;
    isFileUploading: boolean;
    answerValue?: string;
}

export const AnswerInputField = ({
    questionType,
    options = [],
    onAnswerClick,
    onFileUpload,
    parentKey,
    isFileUploading,
    answerValue
}: AnswerInputFieldProps) => {
    const [value, setValue] = React.useState(answerValue);
    const theme = useTheme();

    switch (questionType.toUpperCase()) {
        case FIELD_TYPE.YES_NO:
        case FIELD_TYPE.SINGLE_SELECT:
            return options.length <= DROPDOWN_LIMIT ? (
                <QuestionOptions
                    options={options}
                    parentKey={parentKey}
                    onAnswerClick={onAnswerClick}
                    answerValue={answerValue}
                />
            ) : (
                <Select
                    size="small"
                    options={options}
                    sx={{ minWidth: '50%' }}
                    label=""
                    value={getSelectedOption(options, answerValue)}
                    onChange={(_, selectedOptions) => {
                        if (selectedOptions == null) return;
                        const value = Array.isArray(selectedOptions)
                            ? selectedOptions[0].value
                            : selectedOptions.value;
                        onAnswerClick({
                            key: parentKey,
                            value
                        });
                    }}
                />
            );
        case FIELD_TYPE.FREE_TEXT:
            return (
                <Box sx={{ position: 'relative' }}>
                    <TextArea
                        onChange={e => setValue(e.target.value)}
                        value={value}
                        placeholder=""
                        color={theme.palette.chatBot.color.questionInput}
                    />
                    <IconButton
                        sx={{
                            position: 'absolute',
                            bottom: -6,
                            right: -32,
                            color: theme.palette.chatBot.color.questionInput
                        }}
                        onClick={() => {
                            if (!value) return;
                            onAnswerClick({ key: parentKey, value });
                        }}
                    >
                        <CheckBoxIcon />
                    </IconButton>
                </Box>
            );
        case FIELD_TYPE.FILE_UPLOAD_LINK:
            return (
                <UploadButton
                    color={theme.palette.chatBot.color.questionInput}
                    name="file_upload"
                    isLoading={isFileUploading}
                    title={answerValue ? 'REUPLOAD' : 'UPLOAD'}
                    onChange={e => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        onFileUpload(file);
                        onAnswerClick({ key: parentKey, value: file.name });
                    }}
                    acceptFileType={[
                        ALLOWED_EXTENSION.PDF,
                        ALLOWED_EXTENSION.DOC,
                        ALLOWED_EXTENSION.DOCX
                    ]}
                />
            );
        case FIELD_TYPE.DATE:
            return (
                <Box sx={{ maxWidth: '120px' }}>
                    <DatePicker
                        label=""
                        size="small"
                        inputFormat="yyyy-MM-dd"
                        onChange={selectedDate => {
                            if (!selectedDate) return;
                            setValue(
                                TimeUtils.format(selectedDate, 'YYYY-MM-DD')
                            );
                        }}
                        onAccept={selectedDate => {
                            if (!selectedDate) return;
                            onAnswerClick({
                                key: parentKey,
                                value: TimeUtils.format(
                                    selectedDate,
                                    'YYYY-MM-DD'
                                )
                            });
                        }}
                        value={value}
                    />
                </Box>
            );
        default:
            return <></>;
    }
};
