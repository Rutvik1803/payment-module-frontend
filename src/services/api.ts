/**
 * API Service Configuration
 * Axios instance with request/response interceptors for HTTP communication
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

// Base API URL - Update this based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Create axios instance with default configuration
 */
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request Interceptor
 * Automatically attach JWT token to requests
 */
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');

        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * Handle common errors globally
 */
api.interceptors.response.use(
    (response) => {
        // Return the data from successful responses
        return response;
    },
    (error: AxiosError) => {
        // Handle different error scenarios
        if (error.response) {
            const status = error.response.status;

            // 401 Unauthorized - Token expired or invalid
            if (status === 401) {
                // Clear token and redirect to login
                localStorage.removeItem('token');
                localStorage.removeItem('user');

                // Only redirect if not already on login page
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            }

            // 403 Forbidden - No permission
            if (status === 403) {
                console.error('Access forbidden - insufficient permissions');
            }

            // 500 Server Error
            if (status >= 500) {
                console.error('Server error - please try again later');
            }
        } else if (error.request) {
            // Network error - no response received
            console.error('Network error - please check your connection');
        }

        return Promise.reject(error);
    }
);

export default api;
