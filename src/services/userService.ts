/**
 * User API Service
 * Handles all user related API calls
 */

import api from './api';
import { User, StudentOption } from '@/types/user';

interface ApiResponse<T> {
    success: boolean;
    data: T;
    message: string;
}

/**
 * Get all students (for dropdown)
 */
export const getAllStudents = async (): Promise<StudentOption[]> => {
    const response = await api.get<ApiResponse<User[]>>('/api/users', {
        params: { role: 'student' },
    });

    // Transform users to dropdown options
    return response.data.data.map((user) => ({
        value: user.id,
        label: `${user.first_name} ${user.last_name}`,
        email: user.email,
    }));
};

/**
 * Get user by ID
 */
export const getUserById = async (id: number): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/api/users/${id}`);
    return response.data.data;
};

/**
 * Search students by name or email
 */
export const searchStudents = async (query: string): Promise<StudentOption[]> => {
    const response = await api.get<ApiResponse<User[]>>('/api/users', {
        params: { role: 'student', search: query },
    });

    return response.data.data.map((user) => ({
        value: user.id,
        label: `${user.first_name} ${user.last_name}`,
        email: user.email,
    }));
};
