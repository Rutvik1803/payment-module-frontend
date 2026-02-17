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
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => navigate('/')}
            >
              Payment Module
            </h1>
            <nav className="hidden md:flex space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/payment-plans')}
              >
                Payment Plans
              </Button>
              <Button variant="ghost" onClick={() => navigate('/invoices')}>
                Invoices
              </Button>
              <Button variant="ghost" onClick={() => navigate('/transactions')}>
                Transactions
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/payment-portal')}
              >
                Make Payment
              </Button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-sm text-gray-600">
                {user.first_name} {user.last_name} ({user.role})
              </span>
            )}
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Payment Module. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
