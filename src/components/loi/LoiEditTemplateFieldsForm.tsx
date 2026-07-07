import React from 'react';

import { Grid, GridItem, Text, Divider } from '@chakra-ui/react';

import { SelectField, TextField } from '@components/common';

import { LoiTemplateField } from 'interfaces/loi.interface';
import { LOI_TEMPLATE_FIELD_TYPE } from 'Enum';

interface LoiEditTemplateFieldsFormProps {
    templateFields: LoiTemplateField[];
    onTemplateFieldChange: (
        name: string,
        field: string,
        value: string | number
    ) => void;
}

export const LoiEditTemplateFieldsForm = ({
    templateFields,
    onTemplateFieldChange
}: LoiEditTemplateFieldsFormProps) => {
    const loiFieldTypeOptions = React.useMemo(() => {
        return [
            {
                label: 'Text',
                value: LOI_TEMPLATE_FIELD_TYPE.TEXT
            },
            {
                label: 'Date',
                value: LOI_TEMPLATE_FIELD_TYPE.DATE
            }
        ];
    }, []);

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        name: string
    ) => {
        onTemplateFieldChange(name, e.target.name, e.target.value);
    };

    return (
        <>
            <Grid templateColumns="repeat(12, 1fr)" gap={2} mb={2}>
                <GridItem colSpan={4}>
                    <Text fontWeight={600}>Template Field</Text>
                </GridItem>
                <GridItem colSpan={5}>
                    <Text fontWeight={600}>Placeholder</Text>
                </GridItem>
                <GridItem colSpan={3}>
                    <Text fontWeight={600}>Type</Text>
                </GridItem>
            </Grid>
            <Divider mb={4} />
            {templateFields.map((field, idx) => (
                <Grid
                    key={idx}
                    templateColumns="repeat(12, 1fr)"
                    gap={2}
                    mb={2}
                    alignItems="baseline"
                >
                    <GridItem colSpan={4}>
                        <GridItem className="font-medium">
                            <Text fontWeight={600}>{`{{${field.name}}}`}</Text>
                        </GridItem>
                    </GridItem>

                    <GridItem colSpan={5}>
                        <TextField
                            label=""
                            name="placeholder"
                            value={field.placeholder}
                            onChange={e => onChange(e, field.name)}
                        />
                    </GridItem>

                    <GridItem colSpan={3}>
                        <SelectField
                            label=""
                            name="fieldType"
                            options={loiFieldTypeOptions}
                            value={field.fieldType}
                            onChange={e => onChange(e, field.name)}
                        />
                    </GridItem>
                </Grid>
            ))}
        </>
    );
};
