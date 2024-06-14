// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { isAuthenticated, login, logout } from '../services/utils/auth';
import apiClient from '../services/api/apiClient';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isAuthenticated());
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (isLoggedIn) {
        setLoading(true);
        try {
          const response = await apiClient.get('/me');
          setUser(response.data);
        } catch (err) {
          setError('Failed to fetch user data');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUser();
  }, [isLoggedIn]);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/login', { email, password });
      login(response.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      setError('Failed to login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
  };

  return { isLoggedIn, user, loading, error, handleLogin, handleLogout };
};

export default useAuth;