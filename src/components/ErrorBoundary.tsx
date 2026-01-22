import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // In production, you would log this to an error tracking service like Sentry
    // logErrorToService(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: undefined });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: '#2C2C2E',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              maxWidth: '600px',
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2" />
                <path
                  d="M15 9L9 15M9 9L15 15"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>

            {/* Error Title */}
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 600,
                color: '#F4F4F2',
                margin: 0,
              }}
            >
              Something went wrong
            </h1>

            {/* Error Message */}
            <p
              style={{
                fontSize: '1rem',
                color: '#E5E5E5',
                margin: 0,
              }}
            >
              We encountered an unexpected error. Please try refreshing the page.
            </p>

            {/* Error Details (development only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#1C1C1E',
                  borderRadius: '8px',
                  textAlign: 'left',
                  overflow: 'auto',
                  maxHeight: '200px',
                }}
              >
                <p
                  style={{
                    fontSize: '0.875rem',
                    color: '#EF4444',
                    margin: '0 0 0.5rem 0',
                    fontWeight: 600,
                  }}
                >
                  Error Details (Development Mode):
                </p>
                <pre
                  style={{
                    fontSize: '0.75rem',
                    color: '#E5E5E5',
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {this.state.error.message}
                </pre>
              </div>
            )}

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                marginTop: '1rem',
              }}
            >
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#A78BFA',
                  color: '#1C1C1E',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#9333EA';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#A78BFA';
                }}
              >
                Refresh Page
              </button>

              <button
                onClick={this.handleReset}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'transparent',
                  color: '#A78BFA',
                  border: '2px solid #A78BFA',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(167, 139, 250, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                Try Again
              </button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
