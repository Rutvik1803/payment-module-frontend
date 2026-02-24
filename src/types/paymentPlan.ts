/**
 * Payment Plan Type Definitions
 * Mirrors backend types for type safety
 */

export type PaymentPlanStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
export type PaymentPlanType = 'ONE_TIME' | 'INSTALLMENT';

export interface PaymentPlan {
    id: number;
    user_id: number;
    total_amount: string;
    paid_amount: string;
    remaining_amount: string;
    status: PaymentPlanStatus;
    type: PaymentPlanType;
    number_of_installments?: number;
    start_date: string;
    end_date?: string;
    created_at: string;
    updated_at: string;
    user?: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        role: string;
    };
}

export interface CreatePaymentPlanDTO {
    user_id: number;
    total_amount: number;
    type: PaymentPlanType;
    number_of_installments?: number;
    start_date: string;
}

export interface PaymentSchedule {
    installment_number: number;
    due_date: string;
    amount: string;
    status: 'UPCOMING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
}

export interface PaymentPlanWithSchedules extends PaymentPlan {
    schedules: PaymentSchedule[];
}

export interface PaymentPlanFormData {
    user_id: string;
    total_amount: string;
    type: PaymentPlanType;
    number_of_installments: string;
    start_date: string;
}
