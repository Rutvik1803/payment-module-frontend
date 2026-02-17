/**
 * Main Layout Component
 * Provides navigation and layout structure for authenticated pages
 */

import { Outlet, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { commonToasts } from '@/lib/toastUtils';

export default function MainLayout() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    commonToasts.logoutSuccess();
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-900">
                Payment Portal
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium"
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/payment-plans')}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium"
              >
                Payment Plans
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/invoices')}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium"
              >
                Invoices
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/transactions')}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium"
              >
                Transactions
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/payment-portal')}
                className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium"
              >
                Make Payment
              </Button>
            </nav>

            {/* User Profile & Logout */}
            <div className="flex items-center space-x-4">
              {user && (
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                    {user.first_name.charAt(0)}
                    {user.last_name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>
              )}
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-300 font-medium"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              &copy; 2026 Payment Portal. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span className="hover:text-blue-600 cursor-pointer">
                Privacy Policy
              </span>
              <span className="hover:text-blue-600 cursor-pointer">
                Terms of Service
              </span>
              <span className="hover:text-blue-600 cursor-pointer">
                Support
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
