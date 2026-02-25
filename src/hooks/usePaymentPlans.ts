import { useCallback } from 'react';
import useSWR from 'swr';
import { toast } from 'sonner';
import {
    getAllPaymentPlans,
    updatePaymentPlanStatus,
    cancelPaymentPlan,
    deletePaymentPlan,
} from '@/services/paymentPlanService';
import {
    PaymentPlan,
    PaymentPlanStatus,
    PaymentPlanType,
} from '@/types/paymentPlan';

interface PaymentPlansFilters {
    status?: PaymentPlanStatus;
    type?: PaymentPlanType;
    search?: string;
}

interface PaymentPlansPagination {
    page: number;
    limit: number;
}

interface UsePaymentPlansOptions {
    filters?: PaymentPlansFilters;
    pagination?: PaymentPlansPagination;
}

interface UsePaymentPlansReturn {
    plans: PaymentPlan[];
    totalCount: number;
    isLoading: boolean;
    isError: boolean;
    error: any;
    mutate: () => void;
    updateStatus: (id: number, status: PaymentPlanStatus) => Promise<void>;
    cancelPlan: (id: number) => Promise<void>;
    deletePlan: (id: number) => Promise<void>;
}

/**
 * Custom hook for managing payment plans data with SWR
 * Provides data fetching, caching, and mutation functions
 */
export function usePaymentPlans(
    options: UsePaymentPlansOptions = {}
): UsePaymentPlansReturn {
    const { filters = {}, pagination = { page: 1, limit: 10 } } = options;

    // Normalize filter values to ensure consistency
    const status = filters.status || '';
    const type = filters.type || '';
    const search = filters.search || '';

    // Build query params for API call (only include defined values)
    const queryParams: Record<string, any> = {
        page: pagination.page,
        limit: pagination.limit,
    };

    if (filters.status) queryParams.status = filters.status;
    if (filters.type) queryParams.type = filters.type;
    if (filters.search) queryParams.search = filters.search;

    // SWR key uses stable array with primitive values for proper caching
    // Each unique combination of filters creates a distinct cache entry
    const swrKey = [
        'payment-plans',
        pagination.page,
        pagination.limit,
        status,
        type,
        search
    ];

    // Fetcher function
    const fetcher = async () => {
        const response = await getAllPaymentPlans(queryParams);
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
        // After this, it's "stale" and will auto-refetch on next mount/focus
        revalidateIfStale: true, // Auto-revalidate stale data

        // Network events
        revalidateOnFocus: true, // Refetch when user returns to tab (catches new data!)
        revalidateOnReconnect: true, // Refetch when internet reconnects

        // Auto refresh every 30 seconds (optional - for real-time needs)
        // refreshInterval: 30000, // Uncomment for polling every 30s

        // Error handling
        shouldRetryOnError: true,
        errorRetryCount: 3,
        errorRetryInterval: 5000,
    });

    /**
     * Update payment plan status
     */
    const updateStatus = useCallback(
        async (id: number, status: PaymentPlanStatus) => {
            try {
                await updatePaymentPlanStatus(id, status);
                toast.success(`Payment plan status updated to ${status}`);
                await mutate();
            } catch (error: any) {
                const message =
                    error?.response?.data?.error || 'Failed to update payment plan status';
                toast.error(message);
                throw error;
            }
        },
        [mutate]
    );

    /**
     * Cancel payment plan
     */
    const cancelPlan = useCallback(
        async (id: number) => {
            try {
                await cancelPaymentPlan(id);
                toast.success('Payment plan cancelled successfully');
                await mutate();
            } catch (error: any) {
                const message =
                    error?.response?.data?.error || 'Failed to cancel payment plan';
                toast.error(message);
                throw error;
            }
        },
        [mutate]
    );

    /**
     * Delete payment plan
     */
    const deletePlan = useCallback(
        async (id: number) => {
            try {
                await deletePaymentPlan(id);
                toast.success('Payment plan deleted successfully');
                await mutate();
            } catch (error: any) {
                const message =
                    error?.response?.data?.error || 'Failed to delete payment plan';
                toast.error(message);
                throw error;
            }
        },
        [mutate]
    );

    return {
        plans: data?.items || [],
        totalCount: data?.pagination?.total || 0,
        isLoading,
        isError: !!error,
        error,
        mutate,
        updateStatus,
        cancelPlan,
        deletePlan,
    };
}
