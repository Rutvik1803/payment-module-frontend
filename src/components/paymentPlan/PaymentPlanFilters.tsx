import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useDebounce } from '@/hooks/useDebounce';
import { PaymentPlanStatus, PaymentPlanType } from '@/types/paymentPlan';

interface PaymentPlanFiltersProps {
  filters: {
    status?: PaymentPlanStatus;
    type?: PaymentPlanType;
    search?: string;
  };
  onFilterChange: (
    filters: Partial<{
      status?: PaymentPlanStatus;
      type?: PaymentPlanType;
      search?: string;
    }>,
  ) => void;
  onClearFilters: () => void;
}

export function PaymentPlanFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: PaymentPlanFiltersProps) {
  // Local state for search input
  const [searchValue, setSearchValue] = useState(filters.search || '');

  // Debounce the search value - wait 500ms after user stops typing
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const hasActiveFilters = filters.status || filters.type || filters.search;

  // Trigger filter change when debounced value changes
  useEffect(() => {
    onFilterChange({ search: debouncedSearchValue || undefined });
  }, [debouncedSearchValue]);

  // Update local search value when filters are cleared
  useEffect(() => {
    if (!filters.search) {
      setSearchValue('');
    }
  }, [filters.search]);

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-xs"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Student</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            value={filters.status || ''}
            onChange={(e) =>
              onFilterChange({
                status: e.target.value
                  ? (e.target.value as PaymentPlanStatus)
                  : undefined,
              })
            }
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </Select>
        </div>

        {/* Type Filter */}
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            id="type"
            value={filters.type || ''}
            onChange={(e) =>
              onFilterChange({
                type: e.target.value
                  ? (e.target.value as PaymentPlanType)
                  : undefined,
              })
            }
          >
            <option value="">All Types</option>
            <option value="ONE_TIME">One-Time</option>
            <option value="INSTALLMENT">Installment</option>
          </Select>
        </div>
      </div>
    </div>
  );
}
