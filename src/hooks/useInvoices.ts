import { useCallback } from 'react';
import useSWR from 'swr';
import { toast } from 'sonner';
import {
    getAllInvoices,
    markInvoiceAsPaid,
    updateInvoiceStatus,
} from '@/services/invoiceService';
import { Invoice, InvoiceStatus } from '@/types/invoice';

interface InvoicesFilters {
    status?: InvoiceStatus;
    search?: string;
}

interface InvoicesPagination {
    page: number;
    limit: number;
}

interface UseInvoicesOptions {
    filters?: InvoicesFilters;
    pagination?: InvoicesPagination;
}

interface UseInvoicesReturn {
    invoices: Invoice[];
    totalCount: number;
    isLoading: boolean;
    isError: boolean;
    error: any;
    mutate: () => void;
    markAsPaid: (id: number) => Promise<void>;
    updateStatus: (id: number, status: InvoiceStatus) => Promise<void>;
}

/**
 * Custom hook for managing invoices data with SWR
 * Provides data fetching, caching, and mutation functions
 */
export function useInvoices(
    options: UseInvoicesOptions = {}
): UseInvoicesReturn {
    const { filters = {}, pagination = { page: 1, limit: 10 } } = options;

    // Normalize filter values to ensure consistency
    const status = filters.status || '';
    const search = filters.search || '';

    // Build query params for API call (only include defined values)
    const queryParams: Record<string, any> = {
        page: pagination.page,
        limit: pagination.limit,
    };

    if (filters.status) queryParams.status = filters.status;
    if (filters.search) queryParams.search = filters.search;

    // SWR key uses stable array with primitive values for proper caching
    // Each unique combination of filters creates a distinct cache entry
    const swrKey = [
        'invoices',
        pagination.page,
        pagination.limit,
        status,
        search
    ];

    // Fetcher function
    const fetcher = async () => {
        const response = await getAllInvoices(queryParams);
        return response;
    };

    const {
        data,
        error,
        isLoading,
        mutate,
    } = useSWR(swrKey, fetcher, {
        // Deduplication - prevent duplicate requests within this time
        dedupingInterval: 5000, // 5 seconds - short window for duplicate prevention

        // Cache freshness - data is considered fresh for this duration
        revalidateIfStale: true, // Auto-revalidate stale data

        // Network events
        revalidateOnFocus: true, // Refetch when user returns to tab (catches new data!)
        revalidateOnReconnect: true, // Refetch when internet reconnects

        // Error handling
        shouldRetryOnError: true,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
    });

    /**
     * Mark invoice as paid
     */
    const markAsPaid = useCallback(
        async (id: number) => {
            try {
                await markInvoiceAsPaid(id);
                toast.success('Invoice marked as paid successfully');
                await mutate();
            } catch (error: any) {
                const message =
                    error?.response?.data?.error || 'Failed to mark invoice as paid';
                toast.error(message);
                throw error;
            }
        },
        [mutate]
    );

    /**
     * Update invoice status
     */
    const updateStatus = useCallback(
        async (id: number, status: InvoiceStatus) => {
            try {
                await updateInvoiceStatus(id, status);
                toast.success(`Invoice status updated to ${status}`);
                await mutate();
            } catch (error: any) {
                const message =
                    error?.response?.data?.error || 'Failed to update invoice status';
                toast.error(message);
                throw error;
            }
        },
        [mutate]
    );

    return {
        invoices: data?.invoices || [],
        totalCount: data?.pagination?.total || 0,
        isLoading,
        isError: !!error,
        error,
        mutate,
        markAsPaid,
        updateStatus,
    };
}
