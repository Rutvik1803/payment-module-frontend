import { PaymentScheduleStatus } from '@/types/paymentPlan';
import { cn } from '@/lib/utils';

interface PaymentScheduleStatusBadgeProps {
  status: PaymentScheduleStatus;
  className?: string;
}

const statusConfig: Record<
  PaymentScheduleStatus,
  {
    label: string;
    className: string;
    dotClassName: string;
  }
> = {
  PENDING: {
    label: 'Pending',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
    dotClassName: 'bg-blue-500',
  },
  PAID: {
    label: 'Paid',
    className: 'bg-green-100 text-green-800 border-green-200',
    dotClassName: 'bg-green-500',
  },
  OVERDUE: {
    label: 'Overdue',
    className: 'bg-red-100 text-red-800 border-red-200',
    dotClassName: 'bg-red-500',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-gray-100 text-gray-800 border-gray-200',
    dotClassName: 'bg-gray-500',
  },
};

/**
 * Payment Schedule Status Badge Component
 * Displays a colored badge based on payment schedule status
 */
export function PaymentScheduleStatusBadge({
  status,
  className,
}: PaymentScheduleStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        config.className,
        className,
      )}
    >
      <span
        className={cn('w-1.5 h-1.5 rounded-full', config.dotClassName)}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}
