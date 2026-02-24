import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { PaymentPlanType } from '@/types/paymentPlan';

interface PaymentSchedulePreviewProps {
  type?: PaymentPlanType | string;
  totalAmount?: string;
  numberOfInstallments?: string;
  startDate?: string;
}

interface ScheduleItem {
  installmentNumber: number;
  dueDate: string;
  amount: number;
}

export function PaymentSchedulePreview({
  type,
  totalAmount,
  numberOfInstallments,
  startDate,
}: PaymentSchedulePreviewProps) {
  const schedule = useMemo<ScheduleItem[]>(() => {
    // Validate inputs
    if (!type || !totalAmount || !startDate) {
      return [];
    }

    const amount = parseFloat(totalAmount);
    if (isNaN(amount) || amount <= 0) {
      return [];
    }

    // ONE_TIME payment
    if (type === 'ONE_TIME') {
      return [
        {
          installmentNumber: 1,
          dueDate: startDate,
          amount: amount,
        },
      ];
    }

    // INSTALLMENT payment
    if (type === 'INSTALLMENT') {
      const installments = parseInt(numberOfInstallments || '0', 10);
      if (isNaN(installments) || installments < 2 || installments > 12) {
        return [];
      }

      const amountPerInstallment = amount / installments;
      const start = new Date(startDate);

      return Array.from({ length: installments }, (_, index) => {
        const dueDate = new Date(start);
        dueDate.setMonth(dueDate.getMonth() + index);

        return {
          installmentNumber: index + 1,
          dueDate: dueDate.toISOString().split('T')[0],
          amount: amountPerInstallment,
        };
      });
    }

    return [];
  }, [type, totalAmount, numberOfInstallments, startDate]);

  if (schedule.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Payment Schedule Preview</h3>
        <p className="text-sm text-muted-foreground">
          Fill in the form to see a preview of the payment schedule
        </p>
      </Card>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Payment Schedule Preview</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {type === 'ONE_TIME'
              ? 'Single payment'
              : `${schedule.length} monthly installments`}
          </p>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">#</th>
                <th className="px-4 py-3 text-left text-sm font-medium">
                  Due Date
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {schedule.map((item) => (
                <tr key={item.installmentNumber} className="hover:bg-muted/50">
                  <td className="px-4 py-3 text-sm">
                    {item.installmentNumber}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {formatDate(item.dueDate)}
                  </td>
                  <td className="px-4 py-3 text-sm text-right font-medium">
                    {formatCurrency(item.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-muted font-semibold">
              <tr>
                <td colSpan={2} className="px-4 py-3 text-sm">
                  Total
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  {formatCurrency(
                    schedule.reduce((sum, item) => sum + item.amount, 0),
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {type === 'INSTALLMENT' && schedule.length > 1 && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
            <p className="text-xs text-blue-900">
              <strong>Note:</strong> Payments are scheduled monthly starting
              from the selected start date. The exact due dates are shown above.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
