/**
 * Payment Plans Page
 * List and manage payment plans
 */

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { PaymentPlanForm } from '@/components/paymentPlan/PaymentPlanForm';
import { PaymentSchedulePreview } from '@/components/paymentPlan/PaymentSchedulePreview';

export default function PaymentPlansPage() {
  const [showForm, setShowForm] = useState(false);
  const [previewData, setPreviewData] = useState({
    type: 'ONE_TIME',
    total_amount: '',
    number_of_installments: '',
    start_date: new Date().toISOString().split('T')[0],
  });

  const handleFormSuccess = useCallback(() => {
    setShowForm(false);
  }, []);

  const handleCancel = useCallback(() => {
    setShowForm(false);
  }, []);

  const handleFormChange = useCallback((values: any) => {
    setPreviewData(values);
  }, []);

  if (!showForm) {
    return (
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Payment Plans</h1>
            <p className="text-lg text-gray-600">
              Create and manage payment plans for students
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => setShowForm(true)}
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Create Payment Plan
          </Button>
        </div>

        {/* Payment Plans List - Placeholder */}
        <div className="bg-white border rounded-lg p-12">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              No Payment Plans Yet
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Get started by creating your first payment plan. Click the "Create
              Payment Plan" button above.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Payment Plans</h1>
        <p className="text-lg text-gray-600">
          Create and manage payment plans for students
        </p>
      </div>

      {/* Form and Preview Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <div>
          <PaymentPlanForm
            onSuccess={handleFormSuccess}
            onCancel={handleCancel}
            onFormChange={handleFormChange}
          />
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-8 h-fit">
          <PaymentSchedulePreview {...previewData} />
        </div>
      </div>
    </div>
  );
}
