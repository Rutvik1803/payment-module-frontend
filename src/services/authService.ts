/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import api from './api';
import { LoginDTO, RegisterDTO, AuthResponse, User } from '../types/auth';

/**
 * Token Management
 */
export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const setToken = (token: string): void => {
    localStorage.setItem('token', token);
};

export const removeToken = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

/**
 * User Storage
 */
export const getStoredUser = (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
};

export const setStoredUser = (user: User): void => {
    localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Authentication API Calls
 */

/**
 * Login user
 */
export const login = async (credentials: LoginDTO): Promise<AuthResponse> => {
    const response = await api.post<{ success: boolean; data: AuthResponse }>('/auth/login', credentials);

    const { user, token } = response.data.data;

    // Store token and user data
    setToken(token);
    setStoredUser(user);

    return response.data.data;
};

/**
 * Register new user
 */
export const register = async (userData: RegisterDTO): Promise<AuthResponse> => {
    const response = await api.post<{ success: boolean; data: AuthResponse }>('/auth/register', userData);

    const { user, token } = response.data.data;

    // Store token and user data
    setToken(token);
    setStoredUser(user);

    return response.data.data;
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (): Promise<User> => {
    const response = await api.get<{ success: boolean; data: { user: User } }>('/auth/me');

    const user = response.data.data.user;

    // Update stored user data
    setStoredUser(user);

    return user;
};

/**
 * Logout user
 * Note: Does not handle navigation - that should be done by the caller
 */
export const logout = (): void => {
    removeToken();
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
    return !!getToken();
};

/**
 * Verify token validity by checking with backend
 */
export const verifyToken = async (): Promise<boolean> => {
    try {
        await getCurrentUser();
        return true;
    } catch {
        removeToken();
        return false;
    }
};

const authService = {
    login,
    register,
    getCurrentUser,
    logout,
    isAuthenticated,
    verifyToken,
    getToken,
    setToken,
    removeToken,
    getStoredUser,
    setStoredUser,
};

export default authService;
