import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedTheme = localStorage.getItem('theme') || 'dark';
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
    setTheme(storedTheme);
    document.documentElement.setAttribute('data-theme', storedTheme);
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const mockUser = {
      id: credentials.role === 'admin' ? 'ADM001' : 'EMP001',
      email: credentials.email,
      role: credentials.role,
      name: credentials.role === 'admin' ? 'Admin User' : 'Muthu Selvan E',
      department: credentials.role === 'employee' ? 'IT Department' : 'Administration',
      position: credentials.role === 'employee' ? 'Senior Developer' : 'System Administrator',
      avatar: null
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-jwt-token-' + Date.now());
    if (credentials.rememberMe) localStorage.setItem('rememberMe', 'true');
    setLoading(false);

    return { success: true, user: mockUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('rememberMe');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      theme,
      login,
      logout,
      toggleTheme,
      updateProfile,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
      isEmployee: user?.role === 'employee'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
