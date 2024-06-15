import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps { // Định nghĩa kiểu dữ liệu cho props
  children: React.ReactNode;
}

const PrivateRoute = ({ children } : PrivateRouteProps) => {
  const isAuthenticated = false;
  // isAuthenticated hiện tại là false, nhưng trong một ứng dụng thực tế, nó sẽ được xác 
  // định thông qua một số logic xác thực như kiểm tra token, session, hoặc trạng thái người dùng.

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
