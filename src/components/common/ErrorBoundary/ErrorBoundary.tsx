import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        this.props.onError?.(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className={styles.errorContainer}>
                    <div className={styles.errorContent}>
                        <h2 className={styles.errorTitle}>Что-то пошло не так</h2>
                        <p className={styles.errorMessage}>
                            Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить страницу.
                        </p>
                        {this.state.error && (
                            <details className={styles.errorDetails}>
                                <summary>Детали ошибки</summary>
                                <pre className={styles.errorStack}>
                                    {this.state.error.stack}
                                </pre>
                            </details>
                        )}
                        <button
                            className={styles.retryButton}
                            onClick={() => window.location.reload()}
                        >
                            Обновить страницу
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}