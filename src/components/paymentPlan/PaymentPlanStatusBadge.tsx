import { PaymentPlanStatus } from '@/types/paymentPlan';
import { cn } from '@/lib/utils';

interface PaymentPlanStatusBadgeProps {
  status: PaymentPlanStatus;
  className?: string;
}

const statusConfig: Record<
  PaymentPlanStatus,
  {
    label: string;
    className: string;
    dotClassName: string;
  }
> = {
  ACTIVE: {
    label: 'Active',
    className: 'bg-green-100 text-green-800 border-green-200',
    dotClassName: 'bg-green-500',
  },
  COMPLETED: {
    label: 'Completed',
    className: 'bg-blue-100 text-blue-800 border-blue-200',
    dotClassName: 'bg-blue-500',
  },
  CANCELLED: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-800 border-red-200',
    dotClassName: 'bg-red-500',
  },
};

export function PaymentPlanStatusBadge({
  status,
  className,
}: PaymentPlanStatusBadgeProps) {
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
