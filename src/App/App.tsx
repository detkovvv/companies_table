import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';

import { CommonTable } from '../components/CommonTable/CommonTable';
import { FallbackComponent } from '../components/FallbackComponent/FallbackComponent';
import { store } from '../store/store';

export const App = () => {
    return (
        <ErrorBoundary
            FallbackComponent={FallbackComponent}
            onReset={() => {
                // reset the state of your app here
            }}
            resetKeys={['someKey']}
        >
            <Provider store={store}>
                <CommonTable />
            </Provider>
        </ErrorBoundary>
    );
};
