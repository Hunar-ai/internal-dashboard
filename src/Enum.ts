export enum LOGGEDIN_PERSONNEL_ROLE {
    'HUNAR_PERSONNEL' = 'HUNAR_PERSONNEL',
    'COMPANY_PERSONNEL' = 'COMPANY_PERSONNEL',
    'VENDOR' = 'VENDOR'
}

export enum PERSONNEL_ROLE {
    'FIELD_SALES_REP' = 'FIELD_SALES_REP',
    'SUPERVISOR' = 'SUPERVISOR',
    'MANAGER' = 'MANAGER',
    'ADMIN' = 'ADMIN'
}

export enum PERSONNEL_TYPE {
    COMPANY_PERSONNEL = 'COMPANY_PERSONNEL',
    HUNAR_PERSONNEL = 'HUNAR_PERSONNEL'
}

export enum SORT_ORDER {
    'ASC' = 'asc',
    'DESC' = 'desc'
}

export enum GENDER {
    'MALE' = 'MALE',
    'FEMALE' = 'FEMALE',
    'OTHER' = 'OTHER'
}

export const EDUCATION_QUALIFICATION_VALIDATION: string[] = [
    'BELOW_10',
    'PASSED_10',
    'PASSED_12',
    'ITI',
    'DIPLOMA',
    'BACHELORS',
    'MASTERS',
    'OTHERS'
];

export const GENDER_VALIDATION: string[] = ['MALE', 'FEMALE', 'OTHER'];

export enum EDUCATION_QUALIFICATION {
    'BELOW_10' = 'BELOW_10',
    'PASSED_10' = 'PASSED_10',
    'PASSED_12' = 'PASSED_12',
    'ITI' = 'ITI',
    'DIPLOMA' = 'DIPLOMA',
    'BACHELORS' = 'BACHELORS',
    'MASTERS' = 'MASTERS',
    'OTHERS' = 'OTHERS'
}

export enum JOBQUERY_WORKER_STATUS {
    'SHORTLISTED' = 'SHORTLISTED',
    'CONTACT_INITIATED' = 'CONTACT_INITIATED',
    'CONTACTED' = 'CONTACTED',
    'INTERESTED' = 'INTERESTED',
    'NOT_INTERESTED' = 'NOT_INTERESTED',
    'SHARED' = 'SHARED',
    'COMPANY_APPROVED' = 'COMPANY_APPROVED',
    'COMPANY_REJECTED' = 'COMPANY_REJECTED',
    'HIRED' = 'HIRED',
    'SEARCH_RESULTS' = 'SEARCH_RESULTS'
}

export enum FORM_FIELD {
    'gender' = 'gender',
    'educationalQualificationType' = 'educationalQualificationType',
    'district' = 'district',
    'preferredLanguages' = 'preferredLanguages',
    'willingToMove' = 'willingToMove',
    'englishProficiency' = 'englishProficiency',
    'vehicleOptions' = 'vehicleOptions',
    'maritalStatus' = 'maritalStatus',
    'jobRoles' = 'jobRoles',
    'state' = 'state',
    'perkOptions' = 'perkOptions',
    'workerStatus' = 'workerStatus',
    'jobQueryWorkerStatus' = 'jobQueryWorkerStatus',
    'employerJobQueryWorkerStatus' = 'employerJobQueryWorkerStatus',
    'referrerType' = 'referrerType',
    'logoPlacement' = 'logoPlacement'
}

export enum SORT_TYPE {
    'DEFAULT' = 'DEFAULT',
    'NUMERIC' = 'NUMERIC'
}

export enum FILTER_TYPE {
    'MULTI_SELECT' = 'MULTI_SELECT',
    'RANGE' = 'RANGE'
}

export enum REFERRER_TYPE {
    EMPLOYEE = 'EMPLOYEE',
    SUB_CONTRACTOR = 'SUB_CONTRACTOR',
    COLLEAGUE = 'COLLEAGUE',
    LEAD = 'LEAD',
    VENDOR = 'VENDOR'
}

export enum LOGO_PLACEMENT {
    TOP_LEFT = 'TOP_LEFT',
    TOP_RIGHT = 'TOP_RIGHT',
    TOP_CENTRE = 'TOP_CENTRE'
}

export enum EMPLOYEE_ID_TYPE {
    ALPHANUMERIC = 'ALPHANUMERIC',
    NUMERIC = 'NUMERIC'
}

export enum SUBSCRIBE_EVENT {
    SUBSCRIBED = 'SUBSCRIBED',
    UNSUBSCRIBED = 'UNSUBSCRIBED'
}

export enum JOB_QUERY_MARK_STATUS {
    INTERESTED = 'INTERESTED',
    NOT_INTERESTED = 'NOT_INTERESTED'
}

export enum QUESTION_TYPE {
    SINGLE_SELECT = 'SINGLE_SELECT',
    MULTI_SELECT = 'MULTI_SELECT',
    TEXT_AREA = 'TEXT_AREA',
    TEXT = 'TEXT',
    YES_NO = 'YES_NO',
    DATE = 'DATE',
    FILE_UPLOAD_LINK = 'FILE_UPLOAD_LINK'
}

export enum ALLOWED_EXTENSION {
    PNG = '.png',
    JPEG = '.jpeg',
    JPG = '.jpg',
    PDF = '.pdf',
    DOC = '.doc',
    DOCX = '.docx'
}

export enum DOCUMENT_TYPE {
    'CV' = 'cv'
}
