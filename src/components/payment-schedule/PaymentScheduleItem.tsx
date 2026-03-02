/**
 * Payment Schedule Item Component
 * Displays a single installment card with details
 */

import { PaymentSchedule } from '@/types/paymentPlan';
import { PaymentScheduleStatusBadge } from './PaymentScheduleStatusBadge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PaymentScheduleItemProps {
  schedule: PaymentSchedule;
  onViewTransaction?: (invoiceId: number) => void;
}

export function PaymentScheduleItem({
  schedule,
  onViewTransaction,
}: PaymentScheduleItemProps) {
  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(amount));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue =
    (schedule.status === 'PENDING' || schedule.status === 'OVERDUE') &&
    new Date(schedule.due_date) < new Date();

  const isPaid = schedule.status === 'PAID';

  return (
    <Card
      className={cn(
        'p-4 hover:shadow-md transition-shadow',
        isOverdue && 'border-red-300 bg-red-50/30',
        isPaid && 'border-green-200 bg-green-50/20',
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">
            Installment #{schedule.installment_number}
          </h4>
          <p className="text-sm text-gray-500 mt-0.5">
            {formatCurrency(schedule.amount)}
          </p>
        </div>
        <PaymentScheduleStatusBadge status={schedule.status} />
      </div>

      {/* Overdue Warning */}
      {isOverdue && (
        <div className="flex items-center gap-2 mb-3 p-2 bg-red-100 rounded-md border border-red-200">
          <svg
            className="w-4 h-4 text-red-600 flex-shrink-0"
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
          <span className="text-xs font-medium text-red-900">
            Payment Overdue
          </span>
        </div>
      )}

      {/* Details Grid */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Due Date:</span>
          <span className="font-medium text-gray-900">
            {formatDate(schedule.due_date)}
          </span>
        </div>

        {isPaid && schedule.paid_date && (
          <div className="flex justify-between">
            <span className="text-gray-600">Paid Date:</span>
            <span className="font-medium text-green-700">
              {formatDate(schedule.paid_date)}
            </span>
          </div>
        )}

        {schedule.invoice_id && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Invoice:</span>
            {onViewTransaction ? (
              <button
                onClick={() => onViewTransaction(schedule.invoice_id!)}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium underline"
              >
                View Invoice #{schedule.invoice_id}
              </button>
            ) : (
              <span className="text-xs text-gray-900 font-medium">
                INV-{schedule.invoice_id}
              </span>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
