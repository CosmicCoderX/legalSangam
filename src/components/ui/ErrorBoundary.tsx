import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-mist flex items-center justify-center p-4">
          <div className="card max-w-md w-full text-center py-12">
            <div className="inline-flex size-16 rounded-full bg-red-100 text-red-600 items-center justify-center mb-6">
              <AlertTriangle size={32} />
            </div>
            <h1 className="text-2xl font-bold text-ink mb-2">Something went wrong.</h1>
            <p className="text-slate-600 mb-8 px-4">
              We encountered an unexpected error. Please refresh the page or return to your dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => window.location.reload()} className="btn-secondary">
                Refresh Page
              </button>
              <Link to="/dashboard" className="btn-primary flex items-center justify-center gap-2" onClick={() => this.setState({ hasError: false })}>
                <Home size={18} /> Dashboard
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
