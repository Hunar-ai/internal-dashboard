import { type OptionsProps } from './option.interface';
import { FORM_FIELD } from 'Enum';

export interface FormFields {
    [FORM_FIELD.twilioStatus]: OptionsProps;
}

export interface MappedField {
    [key: string]: string;
}

export type FormattedFieldMap = {
    [key in keyof FormFields]: MappedField;
};
