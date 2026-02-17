/**
 * Payment Portal Page
 * Student-facing page for making payments
 */

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

export default function PaymentPortalPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Payment Portal</h1>
        <p className="text-lg text-gray-600">
          Make secure payments on your invoices
        </p>
      </div>

      {/* Main Content Card */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
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
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <div>
              <CardTitle className="text-2xl">Make a Payment</CardTitle>
              <CardDescription className="text-base mt-1">
                Securely pay your outstanding invoices
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <div className="p-12">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-10 h-10 text-indigo-600"
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
              This feature will be available in Sprint 3. You'll be able to make
              secure payments using various payment methods, view payment
              confirmations, and receive instant receipts.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
