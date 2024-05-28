import { FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';

import { HelperText } from '@components/common';

import type {
    CompanyDetailsFormProps,
    CompanyFormProps,
    FormErrorProps
} from 'interfaces';
import { ErrorMsg, RegExUtil } from 'utils';

interface CompanyAddDetailsFormProps extends CompanyDetailsFormProps {
    isDisabled: boolean;
    formErrorState: FormErrorProps<CompanyDetailsFormProps>;
    updateForm: (modifiedForm: Partial<CompanyFormProps>) => void;
    updateFieldErrorState: (_: {
        fieldName: keyof CompanyDetailsFormProps;
        fieldValue: string;
    }) => void;
}

export const CompanyAddDetailsForm = ({
    isDisabled,
    formErrorState,
    updateForm,
    updateFieldErrorState,
    ...form
}: CompanyAddDetailsFormProps) => {
    const onFormFieldChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const fieldName = e.target.name as keyof CompanyDetailsFormProps;
        const fieldValue = e.target.value;

        updateForm({ [fieldName]: fieldValue });
        updateFieldErrorState({ fieldName, fieldValue });

        if (fieldName === 'name') {
            const companyId = RegExUtil.conformToId(fieldValue);
            updateForm({ companyId, description: fieldValue });
            updateFieldErrorState({
                fieldName: 'companyId',
                fieldValue: companyId
            });
            updateFieldErrorState({ fieldName: 'description', fieldValue });
        }
    };

    return (
        <>
            <FormControl
                isInvalid={formErrorState.name}
                isRequired
                isDisabled={isDisabled}
            >
                <FormLabel>Company Name</FormLabel>
                <Input
                    placeholder="Enter Company Name"
                    name="name"
                    value={form.name}
                    onChange={onFormFieldChange}
                />
                <HelperText
                    hasError={formErrorState.name}
                    errorMsg={ErrorMsg.alphaNumeric()}
                />
            </FormControl>
            <FormControl
                isInvalid={formErrorState.companyId}
                isRequired
                isDisabled={isDisabled}
            >
                <FormLabel>Company ID</FormLabel>
                <Input
                    placeholder="Enter Company ID"
                    name="companyId"
                    value={form.companyId}
                    onChange={onFormFieldChange}
                />
                <HelperText
                    hasError={formErrorState.companyId}
                    errorMsg={ErrorMsg.id()}
                    msg="Please keep it short (upto 15 characters)"
                />
            </FormControl>
            <FormControl
                isInvalid={formErrorState.email}
                isRequired
                isDisabled={isDisabled}
            >
                <FormLabel>Email ID of Company POC</FormLabel>
                <Input
                    placeholder="Enter Email ID"
                    name="email"
                    value={form.email}
                    onChange={onFormFieldChange}
                />
                <HelperText
                    hasError={formErrorState.email}
                    errorMsg={ErrorMsg.email()}
                />
            </FormControl>
            <FormControl
                isInvalid={formErrorState.mobileNumber}
                isRequired
                isDisabled={isDisabled}
            >
                <FormLabel>Phone Number of Company POC</FormLabel>
                <Input
                    placeholder="Enter Phone Number"
                    name="mobileNumber"
                    value={form.mobileNumber}
                    onChange={onFormFieldChange}
                />
                <HelperText
                    hasError={formErrorState.mobileNumber}
                    errorMsg={ErrorMsg.mobileNumber()}
                />
            </FormControl>
            <FormControl
                isInvalid={formErrorState.rawAddress}
                isRequired
                isDisabled={isDisabled}
            >
                <FormLabel>Address</FormLabel>
                <Textarea
                    placeholder="Enter Address"
                    name="rawAddress"
                    value={form.rawAddress}
                    onChange={onFormFieldChange}
                />
                <HelperText
                    hasError={formErrorState.rawAddress}
                    errorMsg={ErrorMsg.characterLength()}
                />
            </FormControl>
            <FormControl
                isInvalid={formErrorState.description}
                isRequired
                isDisabled={isDisabled}
            >
                <FormLabel>Description</FormLabel>
                <Textarea
                    placeholder="Enter Description"
                    name="description"
                    value={form.description}
                    onChange={onFormFieldChange}
                />
                <HelperText
                    hasError={formErrorState.description}
                    errorMsg={ErrorMsg.characterLength()}
                />
            </FormControl>
        </>
    );
};
