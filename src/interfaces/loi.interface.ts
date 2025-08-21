import { LOI_TEMPLATE_FIELD_TYPE } from 'Enum';

export interface LoiTemplateField {
    name: string;
    placeholder: string;
    fieldType: LOI_TEMPLATE_FIELD_TYPE;
}

export interface AuditMetadata {
    added_by: string;
    created_on: string;
    updated_by: string;
    updated_on: string;
}

export interface LoiProps {
    companyId: string;
    loiId: string;
    template: string;
    templateFields: LoiTemplateField[];
    auditMetadata: AuditMetadata;
}

export interface CreateOrUpdateLoiResponseProps {
    loiId: string;
    companyId: string;
    template: string;
    templateFields: LoiTemplateField[];
}
