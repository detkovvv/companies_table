import { type ErrorBoundaryPropsWithComponent } from 'react-error-boundary';

export const FallbackComponent: ErrorBoundaryPropsWithComponent['FallbackComponent'] = ({
    error,
    resetErrorBoundary,
}) => {
    return (
        <div role='alert'>
            <p>Что-то пошло не так:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Попробуйте снова</button>
        </div>
    );
};
