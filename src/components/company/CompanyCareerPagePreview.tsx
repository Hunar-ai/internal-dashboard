import { Box, Flex, Select, Text } from '@chakra-ui/react';

import { CompanyCareerJQCardPreview } from './CompanyCareerJQCardPreview';
import { CompanyCareerPagePreviewWrapper } from './CompanyCareerPagePreviewWrapper';

import type { CareerPageFormProps } from 'interfaces';

type CompanyCareerPagePreviewProps = Omit<CareerPageFormProps, 'companyId'>;

export const CompanyCareerPagePreview = ({
    primaryLogo,
    secondaryLogo,
    bannerBgColor,
    primaryColor,
    bannerTextColor,
    description,
    companyName,
    learnMoreLink
}: CompanyCareerPagePreviewProps) => {
    return (
        <CompanyCareerPagePreviewWrapper>
            <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="auto"
                maxHeight="100%"
            >
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
                    {secondaryLogo && (
                        <Box
                            as="img"
                            src={secondaryLogo}
                            height="32px"
                            alt="Logo 2"
                        />
                    )}
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
                        textAlign="center"
                    >
                        {`Apply for Job at ${companyName}`}
                    </Text>
                    <Box
                        position="absolute"
                        bgColor={bannerBgColor}
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
                                {`Learn More`}
                            </a>
                        </Text>
                    )}
                    <Box py={2}>
                        <Text py={2}>{`Showing 3 job vacancies`}</Text>
                        <Flex gap={2}>
                            <Select placeholder="SELECT CITY"></Select>
                            <Select placeholder="SELECT LOCALITY"></Select>
                        </Flex>
                        <Flex py={5} rowGap={4} flexDirection="column">
                            <CompanyCareerJQCardPreview
                                primaryColor={primaryColor}
                            />
                            <CompanyCareerJQCardPreview
                                primaryColor={primaryColor}
                            />
                            <CompanyCareerJQCardPreview
                                primaryColor={primaryColor}
                            />
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </CompanyCareerPagePreviewWrapper>
    );
};
