/**
 * Invoices Page
 * List and manage invoices
 */

import { useState, useCallback } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { InvoiceFilters } from '@/components/invoice/InvoiceFilters';
import { InvoicesList } from '@/components/invoice/InvoicesList';
import { InvoiceStatus } from '@/types/invoice';

export default function InvoicesPage() {
  const [filters, setFilters] = useState<{
    status?: InvoiceStatus;
    search?: string;
  }>({});

  const handleFilterChange = useCallback(
    (newFilters: Partial<typeof filters>) => {
      setFilters((prev) => {
        const updated = { ...prev, ...newFilters };
        // Remove undefined values to ensure consistent object shape
        Object.keys(updated).forEach((key) => {
          if (updated[key as keyof typeof updated] === undefined) {
            delete updated[key as keyof typeof updated];
          }
        });
        return updated;
      });
    },
    [],
  );

  const handleClearFilters = useCallback(() => {
    setFilters({});
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Invoices</h1>
        <p className="text-lg text-gray-600">
          View and manage all payment invoices
        </p>
      </div>

      {/* Main Content Card */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center shadow-md">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
            </div>
            <div>
              <CardTitle className="text-2xl">Invoice Management</CardTitle>
              <CardDescription className="text-base mt-1">
                Track and manage student invoices
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {/* Filters */}
          <div className="mb-6">
            <InvoiceFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Invoice List */}
          <InvoicesList filters={filters} />
        </CardContent>
      </Card>
    </div>
  );
}
