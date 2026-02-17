/**
 * Router Configuration
 * Defines all application routes and their components
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '@/components/layouts/MainLayout';

// Auth Components
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Pages
import LoginPage from '@/pages/Login';
import DashboardPage from '@/pages/Dashboard';
import PaymentPlansPage from '@/pages/PaymentPlans';
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
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'payment-plans',
        element: (
          <ProtectedRoute requiredRole="admin">
            <PaymentPlansPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'invoices',
        element: <InvoicesPage />,
      },
      {
        path: 'transactions',
        element: <TransactionsPage />,
      },
      {
        path: 'payment-portal',
        element: (
          <ProtectedRoute requiredRole="student">
            <PaymentPortalPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
