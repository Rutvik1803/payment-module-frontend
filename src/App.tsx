/**
 * App Component
 * Root application component with router configuration and auth provider
 */

import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from './components/ui/sonner';
import { router } from './router';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
