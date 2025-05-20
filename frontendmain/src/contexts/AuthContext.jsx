// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const navigate              = useNavigate();

  // On mount: fetch current user
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/user');
        setUser(data);
      } catch (e) {
        if (e.response?.status !== 401) console.error(e);
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Register
  const register = async formData => {
    setLoading(true);
    try {
      await api.post('/register', formData);
      const { data } = await api.get('/user');
      setUser(data);
      setError(null);
      return { success: true };
    } catch (e) {
      setError(e.response?.data?.errors || { general: [e.message] });
      return { success: false, errors: e.response?.data?.errors };
    } finally {
      setLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    setLoading(true);
    try {
      await api.post('/login', { email, password });
      const { data } = await api.get('/user');
      setUser(data);
      setError(null);
      return { success: true };
    } catch (e) {
      setError({ general: [e.response?.data?.message || 'Login failed'] });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/logout');
      setUser(null);
      navigate('/signin');
    } catch {
      setError({ general: ['Logout failed'] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      register,
      login,
      logout,
      isAuthenticated: Boolean(user),
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be within AuthProvider');
  return ctx;
};
