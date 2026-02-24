import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { PaymentPlanCard } from './PaymentPlanCard';
import { PaymentPlanStatusBadge } from './PaymentPlanStatusBadge';
import { PaymentPlanActions } from './PaymentPlanActions';
import { usePaymentPlans } from '@/hooks/usePaymentPlans';
import { PaymentPlanStatus, PaymentPlanType } from '@/types/paymentPlan';

interface PaymentPlansListProps {
  filters: {
    status?: PaymentPlanStatus;
    type?: PaymentPlanType;
    search?: string;
  };
  onViewDetails?: (id: number) => void;
}

export function PaymentPlansList({
  filters,
  onViewDetails,
}: PaymentPlansListProps) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { plans, totalCount, isLoading, isError, cancelPlan, deletePlan } =
    usePaymentPlans({
      filters,
      pagination: { page, limit },
    });

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

  const totalPages = Math.ceil(totalCount / limit);

  // Loading State
  if (isLoading) {
    return (
      <div className="bg-white border rounded-lg p-12">
        <div className="flex flex-col items-center justify-center">
          <Spinner className="h-8 w-8" />
          <p className="mt-3 text-sm text-gray-600">Loading payment plans...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Failed to Load Payment Plans
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            There was an error loading the payment plans. Please try again.
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  // Empty State
  if (plans.length === 0) {
    return (
      <div className="bg-white border rounded-lg p-12">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No Payment Plans Found
          </h3>
          <p className="text-sm text-gray-600">
            {filters.status || filters.type || filters.search
              ? 'No payment plans match your filters. Try adjusting your search criteria.'
              : 'Get started by creating your first payment plan.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {(page - 1) * limit + 1} to{' '}
          {Math.min(page * limit, totalCount)} of {totalCount} payment plans
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm text-gray-600">
            Per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
            className="text-sm border rounded px-2 py-1"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-4">
        {plans.map((plan) => (
          <PaymentPlanCard
            key={plan.id}
            plan={plan}
            onCancel={cancelPlan}
            onDelete={deletePlan}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden lg:block bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Student
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Start Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Created
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {plans.map((plan) => (
              <tr key={plan.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {plan.user
                        ? `${plan.user.first_name} ${plan.user.last_name}`
                        : `User #${plan.user_id}`}
                    </div>
                    {plan.user && (
                      <div className="text-xs text-gray-500">
                        {plan.user.email}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                  {formatCurrency(parseFloat(plan.total_amount.toString()))}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {getTypeBadge(plan.type)}
                </td>
                <td className="px-4 py-4">
                  <PaymentPlanStatusBadge status={plan.status} />
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {plan.start_date ? formatDate(plan.start_date) : 'N/A'}
                </td>
                <td className="px-4 py-4 text-sm text-gray-700">
                  {formatDate(plan.created_at.toString())}
                </td>
                <td className="px-4 py-4 text-right">
                  <PaymentPlanActions
                    plan={plan}
                    onCancel={cancelPlan}
                    onDelete={deletePlan}
                    onViewDetails={onViewDetails}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white border rounded-lg p-4">
          <Button
            variant="outline"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`w-8 h-8 rounded ${
                    page === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <Button
            variant="outline"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
