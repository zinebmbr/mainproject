// src/components/common/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading…</div>;
  return !isAuthenticated
    ? <Outlet />
    : <Navigate to="/signin" replace />;
}

export function PublicRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading…</div>;
  return isAuthenticated
    ? <Outlet />
    : <Navigate to="/dashboard" replace />;
}
