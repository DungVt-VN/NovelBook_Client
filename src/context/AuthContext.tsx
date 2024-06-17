import { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  setAuth: (user: string, pwd: string, roles: string, accessToken: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      setIsAuthenticated(storedAuth === 'true');
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('user');
    localStorage.removeItem('pwd');
    localStorage.removeItem('roles');
    localStorage.removeItem('accessToken');
  };

  const setAuth = (user: string, pwd: string, roles: string, accessToken: string) => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', user);
    localStorage.setItem('pwd', pwd);
    localStorage.setItem('roles', roles);
    localStorage.setItem('accessToken', accessToken);
  };

  const value = { isAuthenticated, login, logout, setAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
