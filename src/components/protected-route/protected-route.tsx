import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState, useSelector } from '../../services/store';

const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
const selectHasPasswordResetRequest = (state: RootState) => state.auth.isPasswordRecoverySuccess;

type TProtectedRoute = {
  children: React.ReactNode;
  anonymous?: boolean;
};

export function ProtectedRouteElement({ children, anonymous = false }: TProtectedRoute) {  
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

  return <>{children}</>;
}