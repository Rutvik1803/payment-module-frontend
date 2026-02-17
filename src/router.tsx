/**
 * Router Configuration
 * Defines all application routes and their components
 */

import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '@/components/layouts/MainLayout';

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
 * - / - Redirect to dashboard
 * - /dashboard - Main dashboard (protected)
 * - /payment-plans - Payment plans list (protected, admin)
 * - /invoices - Invoices list (protected)
 * - /transactions - Transaction history (protected)
 * - /payment-portal - Student payment portal (protected, student)
 * - * - 404 Not Found page
 *
 * TODO: Add authentication guards in PAYMENT-020
 * TODO: Add role-based route protection (admin/student)
 */
export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <MainLayout />,
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
        element: <PaymentPlansPage />,
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
        element: <PaymentPortalPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
