import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from '@mui/material';
import { Box } from '@chakra-ui/react';

import { AppLoader } from '@components/common';
import { HtmlPreview, HtmlCodeEditor } from '@components/common/htmlPreview';
import {
    SplitView,
    LoiEditorView,
    LoiEditTemplateFieldsForm
} from '@components/loi';
import {
    CREATE_NEW_LOI_ID,
    HTML_CODE_EDITOR_PLACEHOLDER
} from './LoiConstants';

import { useGetLoi, useCreateOrUpdateLoi } from 'hooks/apiHooks/loi';
import { useToast } from 'hooks/useToast';

import { LoiTemplateField } from 'interfaces/loi.interface';
import { useLoiHelper } from './useLoiHelper';

const SUBMIT_CONTAINER_HEIGHT = '64px';

export const LoiDetailsView = () => {
    const navigate = useNavigate();
    const { companyId, loi } = useParams();
    const { showError, showSuccess } = useToast();

    const [htmlTemplate, setHtmlTemplate] = React.useState('');
    const [loiTemplateFields, setLoiTemplateFields] = React.useState<
        LoiTemplateField[]
    >([]);
    const [isLoiTemplatesFormVisible, setIsLoiTemplatesFormVisible] =
        React.useState(false);
    const isNewLoi = React.useMemo(() => loi === CREATE_NEW_LOI_ID, [loi]);

    const {
        buildTemplateFields,
        buildTemplateFieldDefaultMap,
        extractTemplateFieldsFromLoiTemplate
    } = useLoiHelper();

    const { data, isFetching: isLoiLoading } = useGetLoi({
        params: { loiId: loi as string },
        enabled: Boolean(loi) && !isNewLoi
    });
    const updateOrCreateLoi = useCreateOrUpdateLoi();

    React.useEffect(() => {
        if (data?.template) {
            setHtmlTemplate(data.template);
            setLoiTemplateFields(data.templateFields);
        }
    }, [data]);

    const navigateToLoi = (companyId: string, loiId: string) => {
        navigate({
            pathname: `/loi/${companyId}/${loiId}`
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHtmlTemplate(e.target.value);
    };

    const onTemplateFieldChange = (
        name: string,
        field: string,
        value: string | number
    ) => {
        setLoiTemplateFields(prev =>
            prev.map(templateField =>
                templateField.name === name
                    ? { ...templateField, [field]: value }
                    : templateField
            )
        );
    };

    const onCancelClick = () => {
        navigate({
            pathname: `/loi`
        });
    };

    const onProceedToTemplateEditorClick = () => {
        if (!loi?.trim()) {
            return;
        }

        const templateFields =
            extractTemplateFieldsFromLoiTemplate(htmlTemplate);
        const templateFieldDefaultMap =
            buildTemplateFieldDefaultMap(loiTemplateFields);
        const modifiedTeplateFields = buildTemplateFields(
            templateFields,
            templateFieldDefaultMap
        );

        setLoiTemplateFields(modifiedTeplateFields);
        setIsLoiTemplatesFormVisible(true);
    };

    const onGoToLoiEditorClick = () => {
        setIsLoiTemplatesFormVisible(false);
    };

    const onSaveClick = () => {
        if (!companyId) {
            return;
        }

        updateOrCreateLoi.mutate(
            {
                params: {
                    companyId
                },
                body: {
                    ...(loi && !isNewLoi ? { loiId: loi } : {}),
                    companyId,
                    template: htmlTemplate,
                    templateFields: loiTemplateFields
                }
            },
            {
                onSuccess: data => {
                    showSuccess({
                        title: 'Success',
                        description: `LOI ${
                            loi ? 'updated' : 'created'
                        } successfuly`
                    });
                    if (isNewLoi) {
                        navigateToLoi(data.companyId, data.loiId);
                    }
                },
                onError: error => {
                    showError({
                        description: error.errors.displayError
                    });
                }
            }
        );
    };

    if (isLoiLoading) {
        return <AppLoader />;
    }

    return (
        <Box height="100%" p={4}>
            <SplitView gap={4}>
                <SplitView.Left>
                    <LoiEditorView
                        containerHeight={`calc(100% - ${SUBMIT_CONTAINER_HEIGHT})`}
                    >
                        {isLoiTemplatesFormVisible ? (
                            <LoiEditTemplateFieldsForm
                                templateFields={loiTemplateFields}
                                onTemplateFieldChange={onTemplateFieldChange}
                            />
                        ) : (
                            <HtmlCodeEditor
                                htmlInput={htmlTemplate}
                                onChange={handleChange}
                                codeEditorPlaceholder={
                                    HTML_CODE_EDITOR_PLACEHOLDER
                                }
                            />
                        )}
                    </LoiEditorView>

                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        height={SUBMIT_CONTAINER_HEIGHT}
                    >
                        <Button
                            variant="outlined"
                            size="medium"
                            onClick={
                                isLoiTemplatesFormVisible
                                    ? onGoToLoiEditorClick
                                    : onCancelClick
                            }
                        >
                            {isLoiTemplatesFormVisible ? `BACK` : `CANCEL`}
                        </Button>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={
                                isLoiTemplatesFormVisible
                                    ? onSaveClick
                                    : onProceedToTemplateEditorClick
                            }
                        >
                            {isLoiTemplatesFormVisible
                                ? `SAVE AND PUBLISH`
                                : `NEXT`}
                        </Button>
                    </Box>
                </SplitView.Left>

                <SplitView.Right>
                    <HtmlPreview htmlInput={htmlTemplate} />
                </SplitView.Right>
            </SplitView>
        </Box>
    );
};
