import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const selectIsAuthenticated = state => state.auth.isAuthenticated;
const selectHasPasswordResetRequest = state => state.auth.isPasswordRecoverySuccess;
const selectIsLoggedIn = state => state.auth.isLoggedIn;


export function ProtectedRouteElement({ children,  anonymous = false }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  const from = location.state?.from || '/';
  const hasPasswordResetStatement = useSelector(selectHasPasswordResetRequest);

  // if (!isAuthenticated && location.pathname.startsWith('/profile')) {
  //   return <Navigate to="/login" state={{ from: location }} />;
  // }

  // if (isAuthenticated && ['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname)) {
  //   return <Navigate to="/" />;
  // }

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (location.pathname === '/reset-password' && !hasPasswordResetStatement) {
    return <Navigate to="/forgot-password" />;
  }



  return children;
}