/**
 * Payment Plan API Service
 * Handles all payment plan related API calls
 */

import api from './api';
import {
    PaymentPlan,
    PaymentPlanWithSchedules,
    CreatePaymentPlanDTO,
} from '@/types/paymentPlan';

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

interface PaginatedResponse<T> {
    success: boolean;
    data: {
        items: T[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    };
    message: string;
}

/**
 * Create a new payment plan
 */
export const createPaymentPlan = async (
    data: CreatePaymentPlanDTO
): Promise<PaymentPlanWithSchedules> => {
    const response = await api.post<ApiResponse<PaymentPlanWithSchedules>>(
        '/api/payment-plans',
        data
    );
    return response.data.data;
};

/**
 * Get all payment plans with pagination
 */
export const getAllPaymentPlans = async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    user_id?: number;
}): Promise<PaginatedResponse<PaymentPlan>['data']> => {
    const response = await api.get<PaginatedResponse<PaymentPlan>>(
        '/api/payment-plans',
        { params }
    );
    return response.data.data;
};

/**
 * Get payment plan by ID
 */
export const getPaymentPlanById = async (
    id: number
): Promise<PaymentPlanWithSchedules> => {
    const response = await api.get<ApiResponse<PaymentPlanWithSchedules>>(
        `/api/payment-plans/${id}`
    );
    return response.data.data;
};

/**
 * Get payment plans for a specific user
 */
export const getUserPaymentPlans = async (
    userId: number
): Promise<PaymentPlan[]> => {
    const response = await api.get<ApiResponse<PaymentPlan[]>>(
        `/api/payment-plans/user/${userId}`
    );
    return response.data.data;
};

/**
 * Get payment plan summary
 */
export const getPaymentPlanSummary = async (id: number) => {
    const response = await api.get<ApiResponse<any>>(
        `/api/payment-plans/${id}/summary`
    );
    return response.data.data;
};

/**
 * Update payment plan status
 */
export const updatePaymentPlanStatus = async (
    id: number,
    status: string
): Promise<PaymentPlan> => {
    const response = await api.patch<ApiResponse<PaymentPlan>>(
        `/api/payment-plans/${id}/status`,
        { status }
    );
    return response.data.data;
};

/**
 * Cancel payment plan
 */
export const cancelPaymentPlan = async (id: number): Promise<PaymentPlan> => {
    const response = await api.post<ApiResponse<PaymentPlan>>(
        `/api/payment-plans/${id}/cancel`
    );
    return response.data.data;
};

/**
 * Delete payment plan
 */
export const deletePaymentPlan = async (id: number): Promise<void> => {
    await api.delete(`/api/payment-plans/${id}`);
};
