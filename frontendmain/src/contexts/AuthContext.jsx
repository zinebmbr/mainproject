import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // fetch authenticated user
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

  const register = async (formData) => {
    setLoading(true);
    try {
      await api.post('/register', formData);
      const { data } = await api.get('/user');
      setUser(data);
      setError(null);
      return { success: true };
    } catch (e) {
      console.error(e);
      setError(e.response?.data?.errors || { general: [e.message] });
      return { success: false, errors: e.response?.data?.errors };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      await api.post('/login', { email, password });
      const { data } = await api.get('/user');
      setUser(data);
      setError(null);
      return { success: true };
    } catch (e) {
      console.error(e);
      setError({ general: [e.response?.data?.message || 'Login failed'] });
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/logout');
      setUser(null);
      navigate('/signin');
    } catch (e) {
      console.error(e);
      setError({ general: ['Logout failed'] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
