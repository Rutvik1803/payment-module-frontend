import { Card } from '@/components/ui/card';
import { PaymentPlanStatusBadge } from './PaymentPlanStatusBadge';
import { PaymentPlanActions } from './PaymentPlanActions';
import { PaymentPlan } from '@/types/paymentPlan';

interface PaymentPlanCardProps {
  plan: PaymentPlan & {
    user?: { first_name: string; last_name: string; email: string };
  };
  onCancel: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onViewDetails?: (id: number) => void;
}

export function PaymentPlanCard({
  plan,
  onCancel,
  onDelete,
  onViewDetails,
}: PaymentPlanCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTypeBadge = (type: string) => {
    return type === 'ONE_TIME' ? 'One-Time' : 'Installment';
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {plan.user
                ? `${plan.user.first_name} ${plan.user.last_name}`
                : `User #${plan.user_id}`}
            </h3>
            {plan.user && (
              <p className="text-xs text-gray-500">{plan.user.email}</p>
            )}
          </div>
          <PaymentPlanStatusBadge status={plan.status} />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500 text-xs">Total Amount</p>
            <p className="font-semibold text-gray-900">
              {formatCurrency(parseFloat(plan.total_amount.toString()))}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Type</p>
            <p className="font-medium text-gray-700">
              {getTypeBadge(plan.type)}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Start Date</p>
            <p className="font-medium text-gray-700">
              {plan.start_date ? formatDate(plan.start_date) : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Created</p>
            <p className="font-medium text-gray-700">
              {formatDate(plan.created_at.toString())}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t">
          <PaymentPlanActions
            plan={plan}
            onCancel={onCancel}
            onDelete={onDelete}
            onViewDetails={onViewDetails}
          />
        </div>
      </div>
    </Card>
  );
}
