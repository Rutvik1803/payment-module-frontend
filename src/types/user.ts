/**
 * User Type Definitions
 * Mirrors backend types for type safety
 */

export type UserRole = 'admin' | 'student';

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    created_at: string;
}

export interface UserResponse extends User { }

export interface StudentOption {
    value: number;
    label: string;
    email: string;
}
