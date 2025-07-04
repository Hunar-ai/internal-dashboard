import { LOI_TEMPLATE_FIELD_TYPE } from 'Enum';

interface TemplateField {
    name: string;
    fieldType: LOI_TEMPLATE_FIELD_TYPE;
}

export interface LoiProps {
    companyId: string;
    loiId: string;
    template: string;
}

export interface CreateOrUpdateLoiResponseProps {
    loiId: string;
    companyId: string;
    template: string;
    templateFields: TemplateField[];
}
