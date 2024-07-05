import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const selectIsAuthenticated = state => state.auth.isAuthenticated;
const selectHasPasswordResetRequest = state => state.auth.isPasswordRecoverySuccess;

export function ProtectedRouteElement({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const hasPasswordResetStatement = useSelector(selectHasPasswordResetRequest);
  const location = useLocation();

  if (!isAuthenticated && location.pathname.startsWith('/profile')) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  if (isAuthenticated && ['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname)) {
    return <Navigate to="/" />;
  }

  // if (location.pathname === '/reset-password' && !hasPasswordResetStatement) {
  //   return <Navigate to="/forgot-password" />;
  // }

  return children;
}