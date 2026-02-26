import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { useDebounce } from '@/hooks/useDebounce';
import { InvoiceStatus } from '@/types/invoice';

interface InvoiceFiltersProps {
  filters: {
    status?: InvoiceStatus;
    search?: string;
  };
  onFilterChange: (
    filters: Partial<{
      status?: InvoiceStatus;
      search?: string;
    }>,
  ) => void;
  onClearFilters: () => void;
}

/**
 * Invoice Filters Component
 * Provides filtering controls for invoice list
 */
export function InvoiceFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: InvoiceFiltersProps) {
  // Local state for search input
  const [searchValue, setSearchValue] = useState(filters.search || '');

  // Debounce the search value - wait 500ms after user stops typing
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const hasActiveFilters = filters.status || filters.search;

  // Trigger filter change when debounced value changes
  // Only update if the value actually changed to avoid unnecessary updates
  useEffect(() => {
    const newSearch = debouncedSearchValue || undefined;
    if (newSearch !== filters.search) {
      onFilterChange({ search: newSearch });
    }
  }, [debouncedSearchValue, filters.search, onFilterChange]);

  // Update local search value when filters are cleared
  useEffect(() => {
    if (!filters.search) {
      setSearchValue('');
    }
  }, [filters.search]);

  return (
    <div className="bg-white p-4 rounded-lg border space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search by student name */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Student</Label>
          <Input
            id="search"
            placeholder="Search by student name..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        {/* Status filter */}
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            id="status"
            value={filters.status || ''}
            onChange={(e) =>
              onFilterChange({
                status: e.target.value
                  ? (e.target.value as InvoiceStatus)
                  : undefined,
              })
            }
          >
            <option value="">All Statuses</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="DUE">Due</option>
            <option value="OUTSTANDING">Outstanding</option>
            <option value="PARTIAL">Partial</option>
            <option value="PAID">Paid</option>
          </Select>
        </div>

        {/* Clear filters button */}
        <div className="flex items-end">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="w-full"
            >
              Clear All Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
