import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[  ];
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { isAuthenticated, roles, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Hoặc một component loading tùy chỉnh
  }
  
  // Ensure roles is always an array before using includes()
  if (allowedRoles) {
    const canAccess = isAuthenticated && allowedRoles.some(role => roles.includes(role));
    return canAccess ? <>{children}</> : <Navigate to="/notlogged" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;