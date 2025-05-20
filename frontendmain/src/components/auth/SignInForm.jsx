// src/components/auth/SignInForm.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";                // ← react-router-dom
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import { useAuth } from "../../contexts/AuthContext";

export default function SignInForm() {
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  // Local form state
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember]       = useState(false);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>

          {/* OAuth Buttons (unchanged) */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 mb-6">
            <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
              {/* Google SVG */}
              <svg width="20" height="20" /* … */> … </svg>
              Sign in with Google
            </button>
            <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
              {/* X SVG */}
              <svg width="21" height="20" /* … */> … </svg>
              Sign in with X
            </button>
          </div>

          {/* Divider */}
          <div className="relative py-3 sm:py-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                Or
              </span>
            </div>
          </div>

          {/* Actual Form */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Email */}
              <div>
                <Label>Email <span className="text-error-500">*</span></Label>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="info@gmail.com"
                />
              </div>

              {/* Password */}
              <div>
                <Label>Password <span className="text-error-500">*</span></Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <span
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword 
                      ? <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" /> 
                      : <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />}
                  </span>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={remember} onChange={setRemember} />
                  <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                    Keep me logged in
                  </span>
                </div>
                <Link
                  to="/reset-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <div>
                <Button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full"
                  size="sm"
                >
                  {loading ? "Signing in…" : "Sign in"}
                </Button>
              </div>

              {/* Error */}
              {error?.general && (
                <p className="mt-2 text-sm text-red-600">{error.general[0]}</p>
              )}
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Don&apos;t have an account? {" "}
              <Link
                to="/signup"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign Up
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
