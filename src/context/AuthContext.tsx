/**
 * Authentication Context
 * Provides global authentication state management
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { User, LoginDTO, RegisterDTO } from '../types/auth';
import authService from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginDTO) => Promise<void>;
  register: (userData: RegisterDTO) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider Component
 * Wraps the app and provides authentication state
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Initialize auth state on mount
   * Check if user has valid token and load user data
   */
  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getToken();
      const storedUser = authService.getStoredUser();

      if (token && storedUser) {
        // We have a token, set user from localStorage first
        setUser(storedUser);

        // Then verify token validity with backend
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          // Token is invalid, clear everything
          authService.removeToken();
          setUser(null);
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Login handler
   */
  const login = async (credentials: LoginDTO): Promise<void> => {
    try {
      const { user: loggedInUser } = await authService.login(credentials);
      setUser(loggedInUser);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Register handler
   */
  const register = async (userData: RegisterDTO): Promise<void> => {
    try {
      const { user: registeredUser } = await authService.register(userData);
      setUser(registeredUser);
    } catch (error) {
      throw error;
    }
  };

  /**
   * Logout handler
   */
  const logout = (): void => {
    setUser(null);
    authService.logout();
  };

  /**
   * Refresh user data from backend
   */
  const refreshUser = async (): Promise<void> => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      // If refresh fails, logout
      logout();
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use auth context
 * Must be used within AuthProvider
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
