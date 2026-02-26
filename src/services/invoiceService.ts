/**
 * Invoice API Service
 * Handles all invoice related API calls
 */

import api from './api';
import { Invoice } from '@/types/invoice';

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

interface PaginatedResponse<T> {
    success: boolean;
    data: {
        invoices: T[];
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
 * Get all invoices with pagination and filters
 */
export const getAllInvoices = async (params?: {
    page?: number;
    limit?: number;
    status?: string;
    userId?: number;
    search?: string;
}): Promise<PaginatedResponse<Invoice>['data']> => {
    const response = await api.get<PaginatedResponse<Invoice>>(
        '/api/invoices',
        { params }
    );
    return response.data.data;
};

/**
 * Get invoice by ID
 */
export const getInvoiceById = async (id: number): Promise<Invoice> => {
    const response = await api.get<ApiResponse<Invoice>>(
        `/api/invoices/${id}`
    );
    return response.data.data;
};

/**
 * Mark invoice as paid
 */
export const markInvoiceAsPaid = async (id: number): Promise<Invoice> => {
    const response = await api.post<ApiResponse<Invoice>>(
        `/api/invoices/${id}/mark-paid`
    );
    return response.data.data;
};

/**
 * Update invoice status
 */
export const updateInvoiceStatus = async (
    id: number,
    status: string
): Promise<Invoice> => {
    const response = await api.patch<ApiResponse<Invoice>>(
        `/api/invoices/${id}/status`,
        { status }
    );
    return response.data.data;
};

/**
 * Get invoices for a specific user
 */
export const getUserInvoices = async (userId: number): Promise<Invoice[]> => {
    const response = await api.get<ApiResponse<Invoice[]>>(
        `/api/invoices/user/${userId}`
    );
    return response.data.data;
};

/**
 * Delete invoice (admin only)
 */
export const deleteInvoice = async (id: number): Promise<void> => {
    await api.delete(`/api/invoices/${id}`);
};
