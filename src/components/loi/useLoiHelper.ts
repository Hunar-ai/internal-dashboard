import React from 'react';

import { LOI_PLACEHOLDER_EXTRACTOR_REGEX } from './LoiConstants';

import type { LoiProps, LoiTemplateField, OptionsProps } from 'interfaces';
import { LOI_TEMPLATE_FIELD_TYPE } from 'Enum';

const convertTemplateFieldToPlaceholder = (templateField: string) => {
    return templateField
        .split('_')
        .map(
            word =>
                word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase()
        )
        .join(' ');
};

export const useLoiHelper = (loiData?: LoiProps[]) => {
    const loiIdOptions: OptionsProps = React.useMemo(() => {
        return (loiData ?? [])?.map((loi, index) => ({
            value: loi.loiId,
            label: `${loi.loiId} ${index === 0 ? '(Latest)' : ''}`,
            highlight: index === 0
        }));
    }, [loiData]);

    const extractTemplateFieldsFromLoiTemplate = (loiTemplate: string) => {
        return [...loiTemplate.matchAll(LOI_PLACEHOLDER_EXTRACTOR_REGEX)]?.map(
            placeholder => placeholder[1]
        );
    };

    const buildTemplateFieldDefaultMap = (
        loiTemplateFields: LoiTemplateField[]
    ) => {
        return (
            loiTemplateFields?.reduce<
                Record<string, Omit<LoiTemplateField, 'name'>>
            >((ob, current) => {
                if (current?.name) {
                    ob[current.name] = {
                        placeholder: current?.placeholder,
                        fieldType: current?.fieldType
                    };
                }
                return ob;
            }, {}) ?? {}
        );
    };

    const buildTemplateFields = (
        templateFields: string[],
        templateFieldDefaultMap: Record<
            string,
            Omit<LoiTemplateField, 'name'>
        > = {}
    ): LoiTemplateField[] => {
        return templateFields.map(templateField => ({
            name: templateField,
            fieldType:
                templateFieldDefaultMap[templateField]?.fieldType ??
                LOI_TEMPLATE_FIELD_TYPE.TEXT,
            placeholder:
                templateFieldDefaultMap[templateField]?.placeholder ??
                convertTemplateFieldToPlaceholder(templateField)
        }));
    };

    return {
        loiIdOptions,
        extractTemplateFieldsFromLoiTemplate,
        buildTemplateFieldDefaultMap,
        buildTemplateFields
    };
};
