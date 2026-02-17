/**
 * Transactions Page
 * View transaction history
 */

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function TransactionsPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Transactions</h1>
        <p className="text-lg text-gray-600">
          Complete payment transaction history and details
        </p>
      </div>

      {/* Main Content Card */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center shadow-md">
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
                  d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <CardTitle className="text-2xl">Transaction History</CardTitle>
              <CardDescription className="text-base mt-1">
                View all payment transactions and records
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <div className="p-12">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-purple-600"
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
              This feature will be available in Sprint 5. You'll be able to view
              detailed transaction logs, filter by date, and export transaction
              reports.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
