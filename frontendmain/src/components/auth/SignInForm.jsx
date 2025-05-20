import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { useAuth } from "../../contexts/AuthContext";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: ['Email is required'] }));
      return;
    }
    
    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: ['Password is required'] }));
      return;
    }
    
    const result = await login(formData.email, formData.password);
    if (!result.success) {
      setErrors({ general: ['Invalid email or password'] });
    }
    // Toast notification is handled in the AuthContext
    // Redirection is handled by the PublicRoute component
  };

  return (
    <div className="flex flex-col flex-1 w-full max-w-md mx-auto p-4">
      <Link to="/" className="mb-5 text-sm text-gray-500 hover:text-gray-700 inline-flex items-center">
        <ChevronLeftIcon className="size-5 mr-1" /> Back
      </Link>
      <h1 className="text-2xl font-semibold mb-2">Sign In</h1>
      <p className="text-sm text-gray-600 mb-6">Welcome back! Please sign in below.</p>
      {errors.general && (
        <div className="p-3 mb-4 text-sm text-white bg-red-600 rounded">
          {errors.general[0]}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label>Email<span className="text-red-500">*</span></Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email[0]}</p>}
        </div>

        <div>
          <Label>Password<span className="text-red-500">*</span></Label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
            />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
              {showPassword ? <EyeIcon className="size-5" /> : <EyeCloseIcon className="size-5" />}
            </span>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password[0]}</p>}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm">
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800">
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-white bg-blue-600 rounded shadow hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            Don't have an account? <Link to="/signup" className="text-blue-600 hover:text-blue-800">Sign up</Link>
          </span>
        </div>
      </form>
    </div>
  );
}