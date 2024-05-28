import { VStack } from '@chakra-ui/react';
import { CompanyDomainStatus } from './CompanyDomainStatus';

interface CompanyAddStatusViewProps {
    isDefaultView: boolean;
    isDNSLoading: boolean;
    isDNSSuccessful: boolean;
    isDNSRetryVisible: boolean;
    isDomainAddLoading: boolean;
    isDomainAddSuccessful: boolean;
    isDomainRetryVisible: boolean;
    onDNSRetryClick: VoidFunction;
    onDomainRetryClick: VoidFunction;
}

export const CompanyAddStatusView = ({
    isDefaultView,
    isDNSLoading,
    isDNSSuccessful,
    isDNSRetryVisible,
    isDomainAddLoading,
    isDomainAddSuccessful,
    isDomainRetryVisible,
    onDNSRetryClick,
    onDomainRetryClick
}: CompanyAddStatusViewProps) => {
    return (
        <VStack spacing={6}>
            <CompanyDomainStatus
                isDefaultView={isDefaultView}
                title="Google DNS"
                isRetrying={isDNSLoading}
                isSuccessful={isDNSSuccessful}
                isRetryBtnVisible={isDNSRetryVisible}
                onRetryClick={onDNSRetryClick}
            />
            <CompanyDomainStatus
                isDefaultView={isDefaultView}
                title="Netlify"
                isRetrying={isDomainAddLoading}
                isSuccessful={isDomainAddSuccessful}
                isRetryBtnVisible={isDomainRetryVisible}
                onRetryClick={onDomainRetryClick}
            />
        </VStack>
    );
};
