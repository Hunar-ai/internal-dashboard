import React from 'react';

import { createRoot } from 'react-dom/client';
import { ErrorTracker } from 'utils';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// ErrorTracker.init({
//     dsn: process.env.REACT_APP_SENTRY_DSN,
//     environment: process.env.REACT_APP_ENVIRONMENT,
//     release: process.env.REACT_APP_VERSION
// });

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

window.addEventListener('unhandledrejection', event => {
    ErrorTracker.captureException({
        location: window.location.href,
        reason: event.reason
    });
    event.preventDefault();
});
