import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Verificar si ya está autenticado al cargar
  useEffect(() => {
    const authStatus = localStorage.getItem('wedding-auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email: string, password: string): boolean => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    // Sin variables configuradas nadie puede entrar
    if (!adminEmail || !adminPassword) {
      console.warn('Faltan VITE_ADMIN_EMAIL / VITE_ADMIN_PASSWORD: el panel /admin está desactivado.');
      return false;
    }

    // El correo ignora mayúsculas y espacios (los teclados móviles suelen agregarlos)
    const sameEmail = email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
    if (sameEmail && password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('wedding-auth', 'authenticated');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('wedding-auth');
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
