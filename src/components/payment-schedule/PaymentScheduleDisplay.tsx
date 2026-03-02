/**
 * Payment Schedule Display Component
 * Main component for displaying payment plan installment schedule
 */

import { useState } from 'react';
import { usePaymentSchedule } from '@/hooks/usePaymentSchedule';
import { PaymentScheduleTimeline } from './PaymentScheduleTimeline';
import { PaymentScheduleItem } from './PaymentScheduleItem';
import { PaymentSchedule } from '@/types/paymentPlan';
import { InlineSpinner } from '@/components/common/LoadingSpinner';
import { cn } from '@/lib/utils';

interface PaymentScheduleDisplayProps {
  paymentPlanId: number;
  schedules?: PaymentSchedule[]; // Optional: if provided, won't fetch data
  onViewInvoice?: (invoiceId: number) => void;
  className?: string;
}

type ViewMode = 'timeline' | 'list';

/**
 * Payment Schedule Display Component
 * Shows payment schedule with timeline and list views
 */
export function PaymentScheduleDisplay({
  paymentPlanId,
  schedules: providedSchedules,
  onViewInvoice,
  className,
}: PaymentScheduleDisplayProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');

  // Only fetch data if schedules not provided
  const {
    schedules: fetchedSchedules,
    isLoading,
    isError,
  } = usePaymentSchedule(providedSchedules ? null : paymentPlanId);

  // Use provided schedules or fetched schedules
  const schedules = providedSchedules || fetchedSchedules;

  // Calculate summary stats
  const totalAmount = schedules.reduce(
    (sum, s) => sum + parseFloat(s.amount),
    0,
  );
  const paidAmount = schedules
    .filter((s) => s.status === 'PAID')
    .reduce((sum, s) => sum + parseFloat(s.amount), 0);
  const remainingAmount = totalAmount - paidAmount;
  const progressPercentage =
    totalAmount > 0 ? (paidAmount / totalAmount) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  // Loading State
  if (isLoading) {
    return (
      <div className={cn('space-y-6', className)}>
        <div className="flex flex-col items-center justify-center py-12">
          <InlineSpinner size="sm" />
          <p className="text-gray-500 mt-4">Loading payment schedule...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className={cn('space-y-6', className)}>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Failed to Load Schedule
          </h3>
          <p className="text-gray-600">
            There was an error loading the payment schedule.
          </p>
        </div>
      </div>
    );
  }

  // Empty State
  if (schedules.length === 0) {
    return (
      <div className={cn('space-y-6', className)}>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Payment Schedule
          </h3>
          <p className="text-gray-600">
            No payment schedule has been created for this plan yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Payment Schedule</h2>
          {/* View Toggle */}
          <div className="flex gap-2 bg-white rounded-lg p-1 border">
            <button
              onClick={() => setViewMode('timeline')}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded transition-colors',
                viewMode === 'timeline'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900',
              )}
            >
              Timeline
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'px-3 py-1.5 text-sm font-medium rounded transition-colors',
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900',
              )}
            >
              List
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalAmount)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Paid Amount</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(paidAmount)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Remaining</p>
            <p className="text-2xl font-bold text-orange-600">
              {formatCurrency(remainingAmount)}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-600">
              Overall Progress
            </span>
            <span className="text-xs font-bold text-gray-900">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-white rounded-full h-2.5 border overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-6 lg:space-y-0">
          {/* Timeline */}
          <div>
            <PaymentScheduleTimeline schedules={schedules} />
          </div>

          {/* List Items */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Installment Details
            </h3>
            {schedules.map((schedule) => (
              <PaymentScheduleItem
                key={schedule.id}
                schedule={schedule}
                onViewTransaction={onViewInvoice}
              />
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <PaymentScheduleItem
              key={schedule.id}
              schedule={schedule}
              onViewTransaction={onViewInvoice}
            />
          ))}
        </div>
      )}
    </div>
  );
}
