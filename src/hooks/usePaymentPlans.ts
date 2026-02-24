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

    // Build query params for SWR key
    const queryParams = {
        page: pagination.page,
        limit: pagination.limit,
        ...(filters.status && { status: filters.status }),
        ...(filters.type && { type: filters.type }),
        ...(filters.search && { search: filters.search }),
    };

    // SWR key includes all query params for proper cache invalidation
    const swrKey = ['payment-plans', queryParams];

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
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 2000,
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
