/**
 * Router Configuration
 * Defines all application routes and their components
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '@/components/layouts/MainLayout';

// Auth Components
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Common Components
import { ErrorBoundary } from '@/components/common/ErrorBoundary';

// Pages
import LoginPage from '@/pages/Login';
import DashboardPage from '@/pages/Dashboard';
import PaymentPlansPage from '@/pages/PaymentPlans';
import PaymentPlanDetailsPage from '@/pages/PaymentPlanDetails';
import InvoicesPage from '@/pages/Invoices';
import TransactionsPage from '@/pages/Transactions';
import PaymentPortalPage from '@/pages/PaymentPortal';
import NotFoundPage from '@/pages/NotFound';

/**
 * Application Router
 *
 * Route Structure:
 * - /login - Public authentication page
 * - / - Protected: Redirect to dashboard (requires authentication)
 * - /dashboard - Protected: Main dashboard (any authenticated user)
 * - /payment-plans - Protected: Payment plans list (admin only)
 * - /invoices - Protected: Invoices list (any authenticated user)
 * - /transactions - Protected: Transaction history (any authenticated user)
 * - /payment-portal - Protected: Student payment portal (student only)
 * - * - Public: 404 Not Found page
 */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'payment-plans',
        element: (
          <ProtectedRoute requiredRole="admin">
            <PaymentPlansPage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'payment-plans/:id',
        element: (
          <ProtectedRoute requiredRole="admin">
            <PaymentPlanDetailsPage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'invoices',
        element: <InvoicesPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'transactions',
        element: <TransactionsPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'payment-portal',
        element: (
          <ProtectedRoute requiredRole="student">
            <PaymentPortalPage />
          </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
