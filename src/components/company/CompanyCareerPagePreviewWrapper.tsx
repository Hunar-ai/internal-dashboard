import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Show,
    Text
} from '@chakra-ui/react';

interface CompanyCareerPagePreviewWrapperProps {
    children: React.ReactNode;
}

export const CompanyCareerPagePreviewWrapper = ({
    children
}: CompanyCareerPagePreviewWrapperProps) => {
    return (
        <>
            <Show below="md">
                <Accordion allowToggle height="100%">
                    <AccordionItem>
                        <AccordionButton>
                            <Text as="span" flex="1" textAlign="left">
                                {`Preview`}
                            </Text>
                            <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel sx={{ px: 0 }}>
                            {children}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Show>
            <Show above="md">{children}</Show>
        </>
    );
};
