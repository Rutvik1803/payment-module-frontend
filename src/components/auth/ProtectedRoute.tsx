/**
 * Protected Route Component
 * Wraps routes that require authentication
 * Redirects to login if user is not authenticated
 */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'student';
}

/**
 * ProtectedRoute Component
 *
 * Usage:
 * <ProtectedRoute>
 *   <DashboardPage />
 * </ProtectedRoute>
 *
 * Or with role requirement:
 * <ProtectedRoute requiredRole="admin">
 *   <AdminOnlyPage />
 * </ProtectedRoute>
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access if required
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to appropriate page based on user role
    if (user?.role === 'student') {
      return <Navigate to="/payment-portal" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and has required role (if specified)
  return <>{children}</>;
};

export default ProtectedRoute;
