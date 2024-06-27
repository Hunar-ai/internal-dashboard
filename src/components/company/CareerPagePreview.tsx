import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Flex,
    Select,
    Text
} from '@chakra-ui/react';

import { CareerPageJQCardPreview } from './CareerPageJQCardPreview';

import type { CareerPageFormProps } from 'interfaces';

type CareerPagePreviewProps = Omit<CareerPageFormProps, 'companyId'>;

export const CareerPagePreview = ({
    primaryLogo,
    secondaryLogo,
    bannerImg,
    primaryColor,
    bannerTextColor,
    description,
    companyName,
    learnMoreLink
}: CareerPagePreviewProps) => {
    return (
        <Accordion allowToggle height="100%" defaultIndex={0}>
            <AccordionItem>
                <AccordionButton>
                    <Text as="span" flex="1" textAlign="left">
                        PREVIEW
                    </Text>
                    <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                    <Box borderWidth="1px" overflow="auto" maxHeight="100%">
                        <Flex
                            justifyContent="space-between"
                            alignItems="center"
                            height="72px"
                            px={2}
                        >
                            <Box
                                as="img"
                                src={primaryLogo}
                                height="32px"
                                alt="Logo 1"
                            />
                            <Box
                                as="img"
                                src={secondaryLogo}
                                height="32px"
                                alt="Logo 2"
                            />
                        </Flex>
                        <Flex
                            position="relative"
                            height="100px"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Text
                                fontWeight={700}
                                color={bannerTextColor || 'gray'}
                            >
                                Apply for job at {companyName}
                            </Text>
                            <Box
                                position="absolute"
                                as="img"
                                src={bannerImg}
                                alt="Banner Image"
                                width="100%"
                                height={100}
                                zIndex={-1}
                            />
                        </Flex>
                        <Box p={4}>
                            <Text
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: '2',
                                    WebkitBoxOrient: 'vertical'
                                }}
                            >
                                {description}
                            </Text>
                            {learnMoreLink && (
                                <Text
                                    color={primaryColor}
                                    fontSize={16}
                                    fontWeight={700}
                                    width="100%"
                                    textAlign="end"
                                >
                                    <a
                                        href={learnMoreLink}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Learn More
                                    </a>
                                </Text>
                            )}
                            <Box py={2}>
                                <Text py={2}>Showing 2 job vacancies</Text>
                                <Flex gap={2}>
                                    <Select placeholder="SELECT CITY"></Select>
                                    <Select placeholder="SELECT LOCALITY"></Select>
                                </Flex>
                                <Flex py={5} rowGap={4} flexDirection="column">
                                    <CareerPageJQCardPreview
                                        primaryColor={primaryColor}
                                    />
                                    <CareerPageJQCardPreview
                                        primaryColor={primaryColor}
                                    />
                                </Flex>
                            </Box>
                        </Box>
                    </Box>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
};
