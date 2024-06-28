import { Card, Flex, Text, Box, Button } from '@chakra-ui/react';

interface CompanyCareerJQCardPreviewProps {
    primaryColor: string;
}

export const CompanyCareerJQCardPreview = ({
    primaryColor
}: CompanyCareerJQCardPreviewProps) => {
    return (
        <Card width="100%" p={4}>
            <Flex flexDirection="column" rowGap={3}>
                <Text fontSize="sm">Punjab & Haryana</Text>
                <Box>
                    <Text fontSize="lg">Field Assitant Trainee</Text>
                    <Text fontSize="sm">Field Assitant Trainee</Text>
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
                >
                    Age - 18 - 28 Years Education Qualification - Minimum 12th
                    Pass Experience - More than 06 months in MFI/BFSI,
                    Microfinance
                </Text>
                <Box>
                    <Button
                        bgColor={primaryColor || 'gray'}
                        colorScheme={primaryColor}
                        color="white"
                    >
                        APPLY NOW
                    </Button>
                </Box>
            </Flex>
        </Card>
    );
};
