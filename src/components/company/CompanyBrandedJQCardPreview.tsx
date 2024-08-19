import { Card, Flex, Text, Box, Button } from '@chakra-ui/react';

interface CompanyBrandedJQCardPreviewProps {
    primaryColor: string;
}

export const CompanyBrandedJQCardPreview = ({
    primaryColor
}: CompanyBrandedJQCardPreviewProps) => {
    return (
        <Card width="100%" p={4}>
            <Flex flexDirection="column" rowGap={3}>
                <Text fontSize="sm" fontWeight={500}>{`Punjab & Haryana`}</Text>
                <Box>
                    <Text
                        fontSize="xl"
                        fontWeight={600}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '1',
                            WebkitBoxOrient: 'vertical'
                        }}
                    >{`Field Assistant Trainee`}</Text>
                    <Text fontSize="sm" as="span">
                        {`Salary: Negotiable`}
                    </Text>
                </Box>
                <Text
                    fontSize="sm"
                    sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical'
                    }}
                    color="gray.600"
                >
                    {`Age - 18 - 28 Years Education Qualification - Minimum 12th Pass Experience -
                    More than 06 months in MFI/BFSI, Microfinance`}
                </Text>
                <Box>
                    <Button
                        bgColor={primaryColor || 'gray'}
                        colorScheme={primaryColor}
                        color="white"
                    >
                        {`APPLY NOW`}
                    </Button>
                </Box>
            </Flex>
        </Card>
    );
};
