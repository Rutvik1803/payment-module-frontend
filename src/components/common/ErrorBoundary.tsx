/**
 * Error Boundary Component
 * Catches and displays errors in a user-friendly way
 */

import {
  useRouteError,
  useNavigate,
  isRouteErrorResponse,
} from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let errorMessage: string;
  let errorDetails: string | undefined;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || 'An error occurred';
    errorDetails = error.data?.message;
  } else if (error instanceof Error) {
    errorMessage = error.message;
    errorDetails = error.stack;
  } else {
    errorMessage = 'Unknown error occurred';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Error Title */}
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Oops! Something went wrong
          </h1>

          {/* Error Message */}
          <p className="text-lg text-gray-600 text-center mb-6">
            {errorMessage}
          </p>

          {/* Error Details (in development mode) */}
          {import.meta.env.DEV && errorDetails && (
            <details className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <summary className="cursor-pointer font-semibold text-gray-700 mb-2">
                Technical Details
              </summary>
              <pre className="text-xs text-gray-600 overflow-x-auto whitespace-pre-wrap break-words">
                {errorDetails}
              </pre>
            </details>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </Button>
            <Button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go to Dashboard
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reload Page
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
