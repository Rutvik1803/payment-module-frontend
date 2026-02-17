/**
 * Toast Utility Functions
 * Reusable toast notification helpers for consistent messaging across the app
 */

import { toast } from 'sonner';

export const showSuccessToast = (title: string, description?: string) => {
    if (description) {
        toast.success(title, { description });
    } else {
        toast.success(title);
    }
};

export const showErrorToast = (title: string, description?: string) => {
    if (description) {
        toast.error(title, { description });
    } else {
        toast.error(title);
    }
};

export const showWarningToast = (title: string, description?: string) => {
    if (description) {
        toast.warning(title, { description });
    } else {
        toast.warning(title);
    }
};

export const showInfoToast = (title: string, description?: string) => {
    if (description) {
        toast.info(title, { description });
    } else {
        toast.info(title);
    }
};

// Pre-built common toasts
export const commonToasts = {
    loginSuccess: () =>
        toast.success('Login Successful', {
            description: 'Welcome back! Redirecting to dashboard...',
        }),

    loginError: (error?: string) =>
        toast.error('Login Failed', {
            description: error || 'Invalid email or password. Please try again.',
        }),

    logoutSuccess: () =>
        toast.info('Logged Out', {
            description: 'You have been successfully logged out.',
        }),

    unauthorized: () =>
        toast.error('Unauthorized', {
            description: 'You need to be logged in to access this page.',
        }),

    serverError: () =>
        toast.error('Server Error', {
            description: 'Something went wrong. Please try again later.',
        }),

    networkError: () =>
        toast.error('Network Error', {
            description:
                'Unable to connect to the server. Please check your internet connection.',
        }),

    savingSuccess: (itemName: string = 'Item') =>
        toast.success('Saved', { description: `${itemName} saved successfully.` }),

    deletingSuccess: (itemName: string = 'Item') =>
        toast.success('Deleted', {
            description: `${itemName} deleted successfully.`,
        }),

    updatingSuccess: (itemName: string = 'Item') =>
        toast.success('Updated', {
            description: `${itemName} updated successfully.`,
        }),

    validationError: () =>
        toast.warning('Validation Error', {
            description: 'Please check the form and fix any errors.',
        }),
};
