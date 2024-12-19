export interface FormChangeEvent {
    target: {
        name: string;
        value?: string[] | string | number;
    };
}

export interface AuditMetadata {
    addedBy: string;
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
}

export interface ValidationMapProps {
    [key: string]: (_: string) => boolean;
}

export type FormErrorProps<TForm extends Record<string, any>> = {
    [key in keyof TForm]: boolean;
};

export interface ErrorStateProps {
    [key: string]: boolean;
}

export type FormErrorStateProps = {
    [key: string]: { error: boolean; errorMsg?: string };
};
