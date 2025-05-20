import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { useAuth } from "../../contexts/AuthContext";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = ['Name is required'];
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = ['Email is required'];
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = ['Email is invalid'];
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = ['Password is required'];
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = ['Password must be at least 8 characters'];
      isValid = false;
    }

    if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = ['Passwords do not match'];
      isValid = false;
    }

    if (!isChecked) {
      newErrors.terms = ['Please accept the terms and conditions'];
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await register(formData);
    if (!result.success) {
      setErrors(result.errors || {});
    }
    // Toast notification is handled in the AuthContext
    // Redirection is handled by the PublicRoute component
  };

  return (
    <div className="flex flex-col flex-1 w-full max-w-md mx-auto p-4">
      <Link to="/" className="mb-5 text-sm text-gray-500 hover:text-gray-700 inline-flex items-center">
        <ChevronLeftIcon className="size-5 mr-1" /> Back
      </Link>
      <h1 className="text-2xl font-semibold mb-2">Sign Up</h1>
      <p className="text-sm text-gray-600 mb-6">Create your account below.</p>
      {errors.general && (
        <div className="p-3 mb-4 text-sm text-white bg-red-600 rounded">
          {errors.general[0]}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label>Full Name<span className="text-red-500">*</span></Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name[0]}</p>}
        </div>

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
              placeholder="Choose a password"
            />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
              {showPassword ? <EyeIcon className="size-5" /> : <EyeCloseIcon className="size-5" />}
            </span>
          </div>
          {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password[0]}</p>}
        </div>

        <div>
          <Label>Confirm Password<span className="text-red-500">*</span></Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="Re-enter password"
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-3 flex items-center cursor-pointer">
              {showConfirmPassword ? <EyeIcon className="size-5" /> : <EyeCloseIcon className="size-5" />}
            </span>
          </div>
          {errors.password_confirmation && <p className="mt-1 text-sm text-red-500">{errors.password_confirmation[0]}</p>}
        </div>

        <div className="flex items-center">
          <Checkbox checked={isChecked} onChange={setIsChecked} />
          <span className="ml-2 text-sm text-gray-600">
            I agree to the <Link to="/terms" className="text-blue-600">Terms</Link> and <Link to="/privacy" className="text-blue-600">Privacy Policy</Link>.
          </span>
        </div>
        {errors.terms && <p className="text-sm text-red-500">{errors.terms[0]}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 text-white bg-blue-600 rounded shadow hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">
            Already have an account? <Link to="/signin" className="text-blue-600 hover:text-blue-800">Sign in</Link>
          </span>
        </div>
      </form>
    </div>
  );
}