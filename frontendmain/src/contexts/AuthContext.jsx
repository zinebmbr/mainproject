// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

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
      toast.success(`Welcome, ${data.name}! Your account was created successfully.`);
      return { success: true };
    } catch (e) {
      setError(e.response?.data?.errors || { general: [e.message] });
      toast.error(e.response?.data?.message || 'Registration failed. Please try again.');
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
      toast.success(`Welcome back, ${data.name}!`);
      return { success: true };
    } catch (e) {
      setError({ general: [e.response?.data?.message || 'Login failed'] });
      toast.error(e.response?.data?.message || 'Invalid credentials. Please try again.');
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
      toast.info('You have been logged out successfully.');
      navigate('/signin');
    } catch {
      setError({ general: ['Logout failed'] });
      toast.error('Logout failed. Please try again.');
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
