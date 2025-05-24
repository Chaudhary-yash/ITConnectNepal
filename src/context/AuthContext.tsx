import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { currentUser, users } from '../data/mockData';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  loading: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const foundUser = users.find(u => u.email === email);
      
      if (foundUser && password === 'password') {  // Mock validation
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        toast.success('Logged in successfully');
        return true;
      } else {
        toast.error('Invalid email or password');
        return false;
      }
    } catch (error) {
      toast.error('An error occurred during login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        toast.error('Email already in use');
        return false;
      }
      
      // In a real app, we would create a new user in the database
      // For demo purposes, we'll just log in as the current user
      setUser(currentUser);
      localStorage.setItem('user', JSON.stringify(currentUser));
      toast.success('Account created successfully');
      return true;
    } catch (error) {
      toast.error('An error occurred during registration');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      login, 
      register, 
      logout,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};