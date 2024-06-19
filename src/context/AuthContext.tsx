import { jwtDecode } from 'jwt-decode';
import { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
  setAuth: (user: string, token: string) => void;
  roles: string[];
  loading: boolean;
  token: string;
}

interface AuthToken {
  email: string;
  given_name: string;
  role?: string[];
  nbf: number;
  exp: number;
  iat: number;
  iss: string;
  aud: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [roles, setRoles] = useState<string[]>(['Guest']);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    // Khôi phục trạng thái từ localStorage khi tải lại trang
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRoles = localStorage.getItem('roles');
    console.log(storedRoles);
    if (storedAuth && storedRoles) {
      const parsedRoles = JSON.parse(storedRoles);
      setIsAuthenticated(storedAuth === 'true');
      setRoles(parsedRoles);
    }
    setLoading(false); // Đánh dấu rằng việc khôi phục đã hoàn tất
  }, []);

  const logout = async () => {
    setIsAuthenticated(false);
    setRoles(['Guest']);
    setToken('');
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem('user');
    localStorage.removeItem('roles');
    localStorage.removeItem('accessToken');
  };

  const setAuth = (user: string, token: string) => {
    setIsAuthenticated(true);
    const decodedToken: AuthToken = jwtDecode(token);
    const role = decodedToken.role ?? ['Guest'];
    setRoles(role);
    setToken(token);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', user);
    localStorage.setItem('roles', JSON.stringify(role));
    localStorage.setItem('accessToken', token);
  };

  const value = { isAuthenticated, logout, setAuth, roles, loading, token };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };