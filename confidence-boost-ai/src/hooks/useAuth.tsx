import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinedDate: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  clearSessionHistory: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  register: async () => false,
  clearSessionHistory: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for existing auth on mount
  useEffect(() => {
    // Clear any existing authentication to start fresh
    localStorage.removeItem('cogniview_user');
    setUser(null);
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulated login - in a real app, you'd call an API
      // This is just a mock implementation for demonstration
      if (email && password) {
        // Check if user exists in localStorage (for demo purposes)
        const usersJson = localStorage.getItem('cogniview_users');
        const users = usersJson ? JSON.parse(usersJson) : [];
        
        const foundUser = users.find((u: any) => u.email === email);
        
        if (foundUser && foundUser.password === password) {
          // Remove password before storing in state/localStorage
          const { password, ...userWithoutPassword } = foundUser;
          
          // Convert joinedDate string back to Date object
          userWithoutPassword.joinedDate = new Date(userWithoutPassword.joinedDate);
          
          setUser(userWithoutPassword);
          localStorage.setItem('cogniview_user', JSON.stringify(userWithoutPassword));
          
          toast({
            title: "Login Successful",
            description: `Welcome back, ${userWithoutPassword.name}!`,
          });
          
          setIsLoading(false);
          return true;
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid email or password",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulated registration - in a real app, you'd call an API
      if (name && email && password) {
        // Check if user already exists
        const usersJson = localStorage.getItem('cogniview_users');
        const users = usersJson ? JSON.parse(usersJson) : [];
        
        if (users.some((u: any) => u.email === email)) {
          toast({
            title: "Registration Failed",
            description: "Email already in use",
            variant: "destructive",
          });
          setIsLoading(false);
          return false;
        }
        
        // Create new user
        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          password, // NOTE: In a real app, never store plain-text passwords
          joinedDate: new Date(),
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
        };
        
        // Save to "database" (localStorage)
        users.push(newUser);
        localStorage.setItem('cogniview_users', JSON.stringify(users));
        
        // Remove password before storing in state/localStorage for auth
        const { password: _, ...userWithoutPassword } = newUser;
        
        setUser(userWithoutPassword);
        localStorage.setItem('cogniview_user', JSON.stringify(userWithoutPassword));
        
        // Clear interview session history for new user
        localStorage.removeItem('interview_session_history');
        
        toast({
          title: "Registration Successful",
          description: `Welcome to Cogniview, ${name}!`,
        });
        
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cogniview_user');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  const clearSessionHistory = () => {
    localStorage.removeItem('interview_session_history');
    toast({
      title: "History Cleared",
      description: "Your interview history has been reset",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
        clearSessionHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
