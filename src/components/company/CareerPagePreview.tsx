import { Box, Flex, Select, Text } from '@chakra-ui/react';
import { CareerPageJQCardPreview } from './CareerPageJQCardPreview';

interface CareerPagePreviewProps {
    logo1: string;
    logo2: string;
    bannerImg: string;
    primaryColor: string;
    description: string;
    companyName: string;
}

export const CareerPagePreview = ({
    logo1,
    logo2,
    bannerImg,
    primaryColor,
    description,
    companyName
}: CareerPagePreviewProps) => {
    return (
        <Box borderWidth="1px" overflow="auto" maxHeight="100%">
            <Flex
                justifyContent="space-between"
                alignItems="center"
                height="72px"
                px={2}
            >
                <Box as="img" src={logo1} height="40px" alt="Logo 1" />
                <Box as="img" src={logo2} height="40px" alt="Logo 2" />
            </Flex>
            <Flex
                position="relative"
                height="100px"
                justifyContent="center"
                alignItems="center"
            >
                <Text>Apply for job at {companyName}</Text>
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
                <Box py={2}>
                    <Text py={2}>Showing 4 job vacancies</Text>
                    <Flex gap={2}>
                        <Select placeholder="SELECT CITY"></Select>
                        <Select placeholder="SELECT LOCALITY"></Select>
                    </Flex>
                    <Flex py={5} rowGap={4} flexDirection="column">
                        <CareerPageJQCardPreview primaryColor={primaryColor} />
                        <CareerPageJQCardPreview primaryColor={primaryColor} />
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};
