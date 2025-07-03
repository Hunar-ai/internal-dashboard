import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import { AppLoader } from '@components/common';
import { HtmlPreview, HtmlCodeEditor } from '@components/common/htmlPreview';
import { SplitView, getLoiTemplatePlaceholders } from '@components/loi';

import { useGetLoi, useCreateOrUpdateLoi } from 'hooks/apiHooks/loi';
import { useToast } from 'hooks/useToast';

import { CREATE_NEW_LOI_ID } from 'Constants';

const SUBMIT_CONTAINER_HEIGHT = '64px';
const PLACEHOLDER_REGEX = /{{\s*(.*?)\s*}}/g;

export const LoiDetailsView = () => {
    const { companyId, loi } = useParams();
    const navigate = useNavigate();
    const { showError, showSuccess } = useToast();

    const [htmlTemplate, setHtmlTemplate] = React.useState('');
    const isNewLoi = React.useMemo(() => loi === CREATE_NEW_LOI_ID, [loi]);

    const { data, isFetching: isLoiLoading } = useGetLoi({
        params: { loiId: loi as string },
        enabled: Boolean(loi) && !isNewLoi
    });
    const updateOrCreateLoi = useCreateOrUpdateLoi();

    React.useEffect(() => {
        if (data?.template) {
            setHtmlTemplate(data.template);
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

    const onCancel = () => {
        navigate({
            pathname: `/loi`
        });
    };

    const onSave = () => {
        if (!companyId) return;
        const templateFields = [
            ...htmlTemplate.matchAll(PLACEHOLDER_REGEX)
        ]?.map(placeholder => placeholder[1]);

        updateOrCreateLoi.mutate(
            {
                params: {
                    companyId
                },
                body: {
                    ...(loi && !isNewLoi ? { loiId: loi } : {}),
                    companyId,
                    template: htmlTemplate,
                    templateFields: getLoiTemplatePlaceholders(templateFields)
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
        <Box height="100%">
            <SplitView>
                <SplitView.Left flex={2}>
                    <HtmlCodeEditor
                        htmlInput={htmlTemplate}
                        onChange={handleChange}
                        containerHeight={`calc(100% - ${SUBMIT_CONTAINER_HEIGHT})`}
                        codeEditorPlaceholder={`Write your code here. The result will appear in the adjacent panel.`}
                    />
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        height={SUBMIT_CONTAINER_HEIGHT}
                    >
                        <Button
                            variant="outlined"
                            size="medium"
                            onClick={onCancel}
                        >
                            {`CANCEL`}
                        </Button>
                        <Button
                            variant="contained"
                            size="medium"
                            onClick={onSave}
                        >
                            {`SAVE AND PUBLISH`}
                        </Button>
                    </Box>
                </SplitView.Left>

                <SplitView.Right flex={3}>
                    <HtmlPreview htmlInput={htmlTemplate} />
                </SplitView.Right>
            </SplitView>
        </Box>
    );
};
