import React from 'react';

import type { LoiProps, OptionsProps } from 'interfaces';
import { LOI_TEMPLATE_FIELD_TYPE } from 'Enum';

const LOI_DATE_FIELDS = ['loi_date', 'joining_date'];

export const useLoiHelper = (loiData?: LoiProps[]) => {
    const loiIdOptions: OptionsProps = React.useMemo(() => {
        return (loiData ?? [])?.map(loi => ({
            value: loi.loiId,
            label: loi.loiId
        }));
    }, [loiData]);

    return { loiIdOptions };
};

export const getLoiTemplatePlaceholders = (placeholders: string[]) => {
    return placeholders.map(placeholder => ({
        name: placeholder,
        fieldType:
            LOI_TEMPLATE_FIELD_TYPE[
                LOI_DATE_FIELDS?.includes(placeholder) ? 'DATE' : 'TEXT'
            ]
    }));
};
