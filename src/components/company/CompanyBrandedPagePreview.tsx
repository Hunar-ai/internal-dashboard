import { Box, Flex, Input, Select, SimpleGrid, Text } from '@chakra-ui/react';

import { CompanyBrandedJQCardPreview } from './CompanyBrandedJQCardPreview';
import { CompanyCareerPagePreviewWrapper } from './CompanyCareerPagePreviewWrapper';

interface CompanyBrandedPagePreviewProps {
    primaryLogo: string;
    companyName: string;
    primaryColor: string;
    bannerBgColor: string;
    bannerTextColor: string;
    secondaryLogo?: string;
    description?: string;
    learnMoreLink?: string;
}

export const CompanyBrandedPagePreview = ({
    primaryLogo,
    bannerBgColor,
    primaryColor,
    bannerTextColor,
    companyName,
    secondaryLogo = '',
    description = '',
    learnMoreLink = ''
}: CompanyBrandedPagePreviewProps) => {
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
                    px={4}
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
                    height="72px"
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
                        height="100%"
                        zIndex={-1}
                    />
                </Flex>
                <Box p={4}>
                    {description && (
                        <Text
                            fontSize="sm"
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
                    )}
                    {learnMoreLink && (
                        <Text
                            color={primaryColor}
                            fontSize="sm"
                            fontWeight={700}
                            width="100%"
                            textAlign="end"
                            mb={6}
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
                    <Box>
                        <Input placeholder="Search here..." sx={{ mb: 4 }} />
                        <SimpleGrid gap={2} columns={2}>
                            <Select placeholder="CITY"></Select>
                            <Select placeholder="LOCALITY"></Select>
                            <Select placeholder="LOCALITY"></Select>
                        </SimpleGrid>
                        <Text
                            fontSize="sm"
                            py={2}
                        >{`Showing 3 job vacancies`}</Text>
                        <Flex py={1.5} rowGap={4} flexDirection="column">
                            <CompanyBrandedJQCardPreview
                                primaryColor={primaryColor}
                            />
                            <CompanyBrandedJQCardPreview
                                primaryColor={primaryColor}
                            />
                            <CompanyBrandedJQCardPreview
                                primaryColor={primaryColor}
                            />
                        </Flex>
                    </Box>
                </Box>
            </Box>
        </CompanyCareerPagePreviewWrapper>
    );
};
