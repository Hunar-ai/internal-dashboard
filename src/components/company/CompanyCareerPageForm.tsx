import { Grid } from '@chakra-ui/react';

import { FormWrapper, LeftPanel, RightPanel } from '@components/common';

import { NAVBAR_HEIGHT } from 'Constants';

export const CompanyCareerPageForm = () => {
    return (
        <Grid
            templateColumns={{ base: 'auto', md: '8fr 4fr' }}
            height={`calc(100vh - ${NAVBAR_HEIGHT})`}
            overflow={{ base: 'auto', md: 'unset' }}
        >
            <LeftPanel>
                <FormWrapper
                    formTitle="Career Page Settings"
                    isFormDisabled={false}
                    isLoading={false}
                    onSubmit={() => console.log('TODO')}
                >
                    {`Form Here`}
                </FormWrapper>
            </LeftPanel>
            <RightPanel>{`Preview Here`}</RightPanel>
        </Grid>
    );
};
