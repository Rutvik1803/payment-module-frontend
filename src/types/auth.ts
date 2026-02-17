/**
 * Authentication Types
 * Type definitions for authentication-related data structures
 */

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: 'admin' | 'student';
    created_at: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    role?: 'admin' | 'student';
}

export interface AuthResponse {
    user: User;
    token: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    statusCode?: number;
}

export interface ApiError {
    success: false;
    error: string;
    statusCode: number;
    errors?: Record<string, string[]>;
}
