/**
 * Payment Schedule Timeline Component
 * Visual timeline representation of payment schedule
 */

import { PaymentSchedule } from '@/types/paymentPlan';
import { cn } from '@/lib/utils';

interface PaymentScheduleTimelineProps {
  schedules: PaymentSchedule[];
}

export function PaymentScheduleTimeline({
  schedules,
}: PaymentScheduleTimelineProps) {
  const paidCount = schedules.filter((s) => s.status === 'PAID').length;
  const totalCount = schedules.length;
  const progressPercentage =
    totalCount > 0 ? (paidCount / totalCount) * 100 : 0;

  const getStatusIcon = (
    status: PaymentSchedule['status'],
    isOverdue: boolean,
  ) => {
    if (status === 'PAID') {
      return (
        <svg
          className="w-5 h-5 text-green-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    if (isOverdue || status === 'OVERDUE') {
      return (
        <svg
          className="w-5 h-5 text-red-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    if (status === 'CANCELLED') {
      return (
        <svg
          className="w-5 h-5 text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    // PENDING
    return (
      <svg
        className="w-5 h-5 text-blue-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress Summary */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold text-gray-900">
            Payment Progress
          </h3>
          <span className="text-sm font-medium text-gray-900">
            {paidCount} of {totalCount} paid
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-green-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          {progressPercentage.toFixed(0)}% Complete
        </p>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          Installment Timeline
        </h3>
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

          {/* Timeline Items */}
          <div className="space-y-6">
            {schedules.map((schedule) => {
              const isOverdue =
                (schedule.status === 'PENDING' ||
                  schedule.status === 'OVERDUE') &&
                new Date(schedule.due_date) < new Date();

              return (
                <div
                  key={schedule.id}
                  className="relative flex items-start gap-4"
                >
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0 bg-white">
                    {getStatusIcon(schedule.status, isOverdue)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">
                        Installment #{schedule.installment_number}
                      </p>
                      <span
                        className={cn(
                          'text-xs font-semibold',
                          schedule.status === 'PAID' && 'text-green-700',
                          schedule.status === 'PENDING' &&
                            !isOverdue &&
                            'text-blue-700',
                          isOverdue && 'text-red-700',
                          schedule.status === 'CANCELLED' && 'text-gray-500',
                        )}
                      >
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        }).format(parseFloat(schedule.amount))}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Due: {formatDate(schedule.due_date)}
                      {schedule.status === 'PAID' && schedule.paid_date && (
                        <span className="text-green-600 ml-2">
                          • Paid: {formatDate(schedule.paid_date)}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
