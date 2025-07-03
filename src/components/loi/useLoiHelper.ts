import React from 'react';

import type { LoiProps, OptionsProps } from 'interfaces';
import { LOI_TEMPLATE_FIELD_TYPE } from 'Enum';

const LOI_DATE_FIELDS = ['loi_date', 'joining_date'];
const RESERVED_ACRONYMS = ['loi'];

export const useLoiHelper = (loiData?: LoiProps[]) => {
    const loiIdOptions: OptionsProps = React.useMemo(() => {
        return (loiData ?? [])?.map(loi => ({
            value: loi.loiId,
            label: loi.loiId
        }));
    }, [loiData]);

    return { loiIdOptions };
};

const convertTemplateFieldToPlaceholder = (templateField: string) => {
    return templateField
        .split('_')
        .map(word => {
            if (RESERVED_ACRONYMS.includes(word?.toLowerCase())) {
                return word?.toUpperCase();
            }
            return (
                word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase()
            );
        })
        .join(' ');
};

export const getLoiTemplatePlaceholders = (templateFields: string[]) => {
    return templateFields.map(templateField => ({
        name: templateField,
        placeholder: convertTemplateFieldToPlaceholder(templateField),
        fieldType:
            LOI_TEMPLATE_FIELD_TYPE[
                LOI_DATE_FIELDS?.includes(templateField) ? 'DATE' : 'TEXT'
            ]
    }));
};
