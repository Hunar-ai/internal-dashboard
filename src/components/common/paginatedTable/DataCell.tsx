import { IconButton, Box } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { useToast } from 'hooks/useToast';
import { TextOverFlow } from './TextOverflow';

interface DataCellProps {
    cell: any;
}

export const DataCell = ({ cell }: DataCellProps) => {
    const { showSuccess } = useToast();
    const onCopyHandler = async () => {
        if (!cell?.value?.trim()) return;

        try {
            await navigator.clipboard.writeText(cell?.value);
            showSuccess({ title: 'Copied to clipboard!', description: '' });
        } catch (err) {
            console.error('Error occured while copying data', err);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {cell?.column?.allowCopy && (
                <IconButton size="large" onClick={onCopyHandler}>
                    <ContentCopy fontSize="small" />
                </IconButton>
            )}
            <TextOverFlow
                value={cell?.value ?? ''}
                maxWidth={
                    (cell?.column?.minWidth ?? 200) -
                    32 - // default padding
                    (cell?.column?.allowCopy ? 20 : 0) // space of copy icon
                }
            />
        </Box>
    );
};
