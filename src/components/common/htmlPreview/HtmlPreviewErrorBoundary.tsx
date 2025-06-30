import React, { ReactNode } from 'react';

import { Alert, AlertTitle } from '@mui/material';

interface HtmlErrorBoundaryProps {
    children: ReactNode;
}

interface HtmlErrorBoundaryState {
    hasError: boolean;
    errorMessage: string;
}

class HtmlErrorBoundary extends React.Component<
    HtmlErrorBoundaryProps,
    HtmlErrorBoundaryState
> {
    constructor(props: HtmlErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, errorMessage: '' };
    }

    static getDerivedStateFromError(error: Error): HtmlErrorBoundaryState {
        return { hasError: true, errorMessage: error.toString() };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('HTML rendering error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Alert severity="error">
                    <AlertTitle>Error rendering HTML</AlertTitle>
                    {this.state.errorMessage}
                </Alert>
            );
        }

        return this.props.children;
    }
}

export default HtmlErrorBoundary;
