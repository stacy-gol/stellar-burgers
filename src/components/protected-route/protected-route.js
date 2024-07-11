import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const selectIsAuthenticated = state => state.auth.isAuthenticated;
const selectHasPasswordResetRequest = state => state.auth.isPasswordRecoverySuccess;

export function ProtectedRouteElement({ children,  anonymous = false }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();
  const from = location.state?.from || '/';
  const hasPasswordResetStatement = useSelector(selectHasPasswordResetRequest);

  if (anonymous && isAuthenticated) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (location.pathname === '/reset-password' && !hasPasswordResetStatement) {
    return <Navigate to="/forgot-password" />;
  }

  return children;
}