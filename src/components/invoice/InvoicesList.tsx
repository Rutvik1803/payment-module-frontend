import { useState } from 'react';
import { useInvoices } from '@/hooks/useInvoices';
import { InvoiceStatusBadge } from './InvoiceStatusBadge';
import { InvoiceActions } from './InvoiceActions';
import { InvoiceCard } from './InvoiceCard';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { InvoiceStatus } from '@/types/invoice';
import { TableLoadingSpinner } from '../common';

interface InvoicesListProps {
  filters: {
    status?: InvoiceStatus;
    search?: string;
  };
  onViewDetails?: (id: number) => void;
}

/**
 * Invoices List Component
 * Displays a paginated list of invoices with desktop table and mobile card views
 */
export function InvoicesList({ filters, onViewDetails }: InvoicesListProps) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { invoices, totalCount, isLoading, isError, mutate, markAsPaid } = useInvoices({
    filters,
    pagination: { page, limit },
  });

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

  const isOverdue = (dueDate: string, status: InvoiceStatus) => {
    return (
      (status === 'DUE' || status === 'OUTSTANDING') &&
      new Date(dueDate) < new Date()
    );
  };

  // Loading State
  if (isLoading) {
    return <TableLoadingSpinner message="Loading invoices..." />;
  }

  // Error State
  if (isError) {
    return (
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
          Failed to Load Invoices
        </h3>
        <p className="text-gray-600 mb-4">
          There was an error loading the invoices. Please try again.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  // Empty State
  if (invoices.length === 0) {
    const hasFilters = filters.status || filters.search;
    return (
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Invoices Found
        </h3>
        <p className="text-gray-600">
          {hasFilters
            ? 'No invoices match your current filters. Try adjusting your search criteria.'
            : 'No invoices have been created yet.'}
        </p>
      </div>
    );
  }

  // Pagination calculations
  const totalPages = Math.ceil(totalCount / limit);
  const startIndex = (page - 1) * limit + 1;
  const endIndex = Math.min(page * limit, totalCount);

  // Page numbers to display (max 5)
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxPages = 5;
    let start = Math.max(1, page - Math.floor(maxPages / 2));
    let end = Math.min(totalPages, start + maxPages - 1);

    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="space-y-4">
      {/* Results Summary and Per-Page Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="text-sm text-gray-600">
          Showing {startIndex} to {endIndex} of {totalCount} invoices
        </div>
        <div className="flex items-center gap-3">
          {/* Refresh Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => mutate()}
            className="flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </Button>
          
          <span className="text-sm text-gray-600">Per page:</span>
          <Select
            value={limit.toString()}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setPage(1);
            }}
            options={[
              { value: '10', label: '10' },
              { value: '25', label: '25' },
              { value: '50', label: '50' },
              { value: '100', label: '100' },
            ]}
            className="w-20"
          />
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {invoices.map((invoice) => (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
            onMarkAsPaid={markAsPaid}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Paid
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map((invoice) => {
              const overdue = isOverdue(invoice.due_date, invoice.status);
              return (
                <tr
                  key={invoice.id}
                  className={`hover:bg-gray-50 ${
                    overdue ? 'bg-red-50/50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.invoice_number}
                    {overdue && (
                      <span className="ml-2 text-xs text-red-600 font-semibold">
                        OVERDUE
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {invoice.user
                        ? `${invoice.user.first_name} ${invoice.user.last_name}`
                        : 'Unknown'}
                    </div>
                    {invoice.user && (
                      <div className="text-sm text-gray-500">
                        {invoice.user.email}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(invoice.paid_amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(invoice.due_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <InvoiceStatusBadge status={invoice.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <InvoiceActions
                      invoice={invoice}
                      onMarkAsPaid={markAsPaid}
                      onViewDetails={onViewDetails}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>

          {getPageNumbers().map((pageNum) => (
            <Button
              key={pageNum}
              variant={pageNum === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
