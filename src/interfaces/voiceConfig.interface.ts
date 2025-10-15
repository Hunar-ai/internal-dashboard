export interface PersonaProps {
    id: string;
    name: string;
    descriprion: string;
    createdOn: string;
    updatedOn: string;
}

export interface ProviderConfigMetaProps {
    mobileNumber: string;
    referenceName: string;
}

export interface ProviderConfigProps {
    id: string;
    name: string;
    secretId: string;
    secretToken: string;
    apiEndpoint: string;
    meta: ProviderConfigMetaProps;
    createdOn: string;
    updatedOn: string;
}

export interface CreateProviderConfigProps
    extends Pick<ProviderConfigProps, 'secretId' | 'secretToken'>,
        ProviderConfigMetaProps {
    providerType: string;
}

export interface ProviderProps {
    id: string;
    type: string;
    config: ProviderConfigProps;
}

export interface CompanyProviderProps {
    id: string;
    companyId: string;
    active: boolean;
    provider: ProviderProps;
}

export interface VoiceConfigProps {
    companyId: string;
    enabled: boolean;
    persona: PersonaProps;
    providers: CompanyProviderProps[];
}
