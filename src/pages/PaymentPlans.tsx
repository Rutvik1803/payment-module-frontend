/**
 * Payment Plans Page
 * List and manage payment plans
 */

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function PaymentPlansPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Payment Plans</h1>
        <p className="text-lg text-gray-600">
          Create and manage payment plans for students
        </p>
      </div>

      {/* Main Content Card */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <CardTitle className="text-2xl">
                Payment Plans Management
              </CardTitle>
              <CardDescription className="text-base mt-1">
                Configure flexible payment options for students
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <div className="p-12">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Coming Soon</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              This feature will be available in Sprint 2. You'll be able to
              create customized payment plans, set installment schedules, and
              manage student payment options.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
