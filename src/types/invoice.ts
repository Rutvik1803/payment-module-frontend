/**
 * Invoice Type Definitions
 * Mirrors backend types for type safety
 */

export type InvoiceStatus = 'UPCOMING' | 'DUE' | 'OUTSTANDING' | 'PARTIAL' | 'PAID';

export interface Invoice {
    id: number;
    user_id: number;
    payment_plan_id: number | null;
    invoice_number: string;
    amount: string;
    paid_amount: string;
    status: InvoiceStatus;
    due_date: string;
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

export interface CreateInvoiceDTO {
    user_id: number;
    invoice_number: string;
    amount: number;
    due_date: string;
    payment_plan_id?: number | null;
}

export interface UpdateInvoiceDTO {
    amount?: number;
    paid_amount?: number;
    status?: InvoiceStatus;
    due_date?: string;
}
