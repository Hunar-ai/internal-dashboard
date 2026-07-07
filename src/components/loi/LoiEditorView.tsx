import { Box } from '@chakra-ui/react';

interface LoiEditorViewProps {
    children?: React.ReactNode;
    containerHeight?: string;
}

export const LoiEditorView = ({
    children,
    containerHeight = '100%'
}: LoiEditorViewProps) => {
    return (
        <Box width="100%" overflowY="scroll" height={containerHeight}>
            {children}
        </Box>
    );
};
