/**
 * usePaymentSchedule Hook
 * Custom SWR hook for fetching payment schedule data
 */

import useSWR from 'swr';
import { getPaymentPlanById } from '@/services/paymentPlanService';
import { PaymentSchedule } from '@/types/paymentPlan';

interface UsePaymentScheduleReturn {
    schedules: PaymentSchedule[];
    isLoading: boolean;
    isError: boolean;
    error: any;
    mutate: () => void;
}

/**
 * Hook to fetch payment schedule for a payment plan
 */
export function usePaymentSchedule(planId: number | null): UsePaymentScheduleReturn {
    const { data, error, mutate } = useSWR(
        planId ? ['payment-schedule', planId] : null,
        async () => {
            if (!planId) return null;
            const result = await getPaymentPlanById(planId);
            return result.schedules || [];
        },
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
            dedupingInterval: 2000,
        }
    );

    return {
        schedules: data || [],
        isLoading: !error && !data && planId !== null,
        isError: !!error,
        error,
        mutate,
    };
}
