/**
 * Payment Plan Details Page
 * Displays detailed information about a payment plan including schedules
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PaymentScheduleDisplay } from '@/components/payment-schedule';
import { PaymentPlanStatusBadge } from '@/components/paymentPlan/PaymentPlanStatusBadge';
import { getPaymentPlanById } from '@/services/paymentPlanService';
import { PaymentPlanWithSchedules } from '@/types/paymentPlan';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function PaymentPlanDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [plan, setPlan] = useState<PaymentPlanWithSchedules | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      if (!id) {
        setError('Invalid payment plan ID');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getPaymentPlanById(parseInt(id, 10));
        setPlan(data);
      } catch (err: any) {
        console.error('Error fetching payment plan:', err);
        setError(err.message || 'Failed to load payment plan details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanDetails();
  }, [id]);

  const formatCurrency = (amount: number | string) => {
    const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(numAmount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTypeBadge = (type: string) => {
    return type === 'ONE_TIME' ? 'One-Time Payment' : 'Installment Plan';
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <LoadingSpinner size="lg" message="Loading payment plan details..." />
        </div>
      </div>
    );
  }

  // Error State
  if (error || !plan) {
    return (
      <div className="space-y-6">
        <Button
          variant="outline"
          onClick={() => navigate('/payment-plans')}
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
          Back to Payment Plans
        </Button>
        <div className="bg-white border rounded-lg p-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Failed to Load Payment Plan
            </h3>
            <p className="text-gray-600">{error || 'Payment plan not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => navigate('/payment-plans')}
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
          Back to Payment Plans
        </Button>
      </div>

      {/* Page Title */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">
          Payment Plan Details
        </h1>
        <p className="text-lg text-gray-600">
          View payment plan information and schedule
        </p>
      </div>

      {/* Payment Plan Information Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="space-y-4">
          {/* Student Info & Status */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">
                {plan.user
                  ? `${plan.user.first_name} ${plan.user.last_name}`
                  : `User #${plan.user_id}`}
              </h2>
              {plan.user && (
                <p className="text-gray-600 mt-1">{plan.user.email}</p>
              )}
            </div>
            <PaymentPlanStatusBadge status={plan.status} />
          </div>

          {/* Plan Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t">
            <div>
              <p className="text-sm text-gray-600 mb-1">Plan Type</p>
              <p className="text-lg font-semibold text-gray-900">
                {getTypeBadge(plan.type)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Amount</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(plan.total_amount)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Paid Amount</p>
              <p className="text-lg font-semibold text-green-600">
                {formatCurrency(plan.paid_amount)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Remaining</p>
              <p className="text-lg font-semibold text-orange-600">
                {formatCurrency(plan.remaining_amount)}
              </p>
            </div>
            {plan.number_of_installments && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Installments</p>
                <p className="text-lg font-semibold text-gray-900">
                  {plan.number_of_installments}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600 mb-1">Start Date</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(plan.start_date)}
              </p>
            </div>
            {plan.end_date && (
              <div>
                <p className="text-sm text-gray-600 mb-1">End Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(plan.end_date)}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-600 mb-1">Created</p>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(plan.created_at)}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Payment Schedule Display */}
      <PaymentScheduleDisplay
        paymentPlanId={plan.id}
        schedules={plan.schedules}
        onViewInvoice={(invoiceId) => {
          // Navigate to invoice details or handle invoice viewing
          console.log('View invoice:', invoiceId);
          // You can implement: navigate(`/invoices/${invoiceId}`);
        }}
      />
    </div>
  );
}
