/**
 * Payment Plans Page
 * List and manage payment plans
 */

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { PaymentPlanForm } from '@/components/paymentPlan/PaymentPlanForm';
import { PaymentSchedulePreview } from '@/components/paymentPlan/PaymentSchedulePreview';
import { PaymentPlansList } from '@/components/paymentPlan/PaymentPlansList';
import { PaymentPlanFilters } from '@/components/paymentPlan/PaymentPlanFilters';
import { PaymentPlanStatus, PaymentPlanType } from '@/types/paymentPlan';

export default function PaymentPlansPage() {
  const [showForm, setShowForm] = useState(false);
  const [previewData, setPreviewData] = useState({
    type: 'ONE_TIME',
    total_amount: '',
    number_of_installments: '',
    start_date: new Date().toISOString().split('T')[0],
  });

  const [filters, setFilters] = useState<{
    status?: PaymentPlanStatus;
    type?: PaymentPlanType;
    search?: string;
  }>({});

  const handleFormSuccess = useCallback(() => {
    setShowForm(false);
  }, []);

  const handleCancel = useCallback(() => {
    setShowForm(false);
  }, []);

  const handleFormChange = useCallback((values: any) => {
    setPreviewData(values);
  }, []);

  const handleFilterChange = useCallback(
    (newFilters: Partial<typeof filters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    },
    [],
  );

  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Form View
  if (showForm) {
    return (
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Payment Plans</h1>
            <p className="text-lg text-gray-600">Create a new payment plan</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowForm(false)}
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
            Back to List
          </Button>
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

  // List View
  return (
    <div className="space-y-6">
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

      {/* Filters */}
      <PaymentPlanFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* Payment Plans List */}
      <PaymentPlansList filters={filters} />
    </div>
  );
}
