import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    // 🔐 Login API Call (later)

    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const { token, user } = response.data;

      if(token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.response?.data); // 👈 ADD THIS
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      {/* Responsiveness breakdown:
          - w-full: Full width on mobile
          - max-w-md: Prevents the form from getting too wide on tablets
          - lg:w-[70%]: Original width preference for large screens
          - px-6: Padding for mobile screens so content doesn't hit the edges
      */}
      <div className="w-full max-w-md mx-auto lg:max-w-none lg:w-[70%] h-auto md:h-full flex flex-col justify-center px-6 py-8 md:px-0">
        
        {/* Heading */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-black md:text-3xl">
            Welcome Back
          </h3>
          <p className="text-sm text-slate-700 mt-2 mb-8">
            Please enter your details to log in
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-1">
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            placeholder="johndoe@example.com"
            type="email"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-xs mb-4 animate-tighten">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button 
            type="submit" 
            className="btn-primary w-full py-3 mt-4 text-base font-semibold transition-transform active:scale-[0.98]"
          >
            LOG IN
          </button>

          {/* 🔥 Pill Style Switch */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
            <span className="text-gray-500">
              Don’t have an account?
            </span>

            <Link
              to="/signup"
              className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 hover:scale-105 transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;