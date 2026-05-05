import React from 'react'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import UserProvider from './context/UserContext';
import {Toaster} from "react-hot-toast"
const App = () => {
  return (
    <UserProvider>
      <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />
        </Routes>
      </Router>
    </div>
    {/* <Toaster
  position="top-right"
  reverseOrder={false}
  gutter={12}
  containerStyle={{
    top: 20,
    right: 20,
    zIndex: 99999, // 🔥 VERY IMPORTANT (prevents modal overlap)
  }}
  toastOptions={{
    duration: 3000,
    style: {
      fontSize: "13px",
      borderRadius: "10px",
      background: "#1f2937",
      color: "#fff",
      padding: "12px 16px",
    },

    success: {
      style: {
        background: "#22c55e",
      },
    },

    error: {
      style: {
        background: "#ef4444",
      },
    },
  }}
/> */}
    <Toaster
  position="top-right"
  reverseOrder={false}
  gutter={12}
  containerStyle={{
    top: 24,
    right: 24,
    zIndex: 99999,
  }}
  toastOptions={{
    duration: 4000,
    // Default Base Style
    style: {
      maxWidth: "400px",
      padding: "16px",
      fontSize: "14px",
      fontWeight: "500",
      borderRadius: "16px",
      background: "#1f2937", // Gray-800
      color: "#f3f4f6", // Gray-100
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
    },

    // Success Toast
    success: {
      iconTheme: {
        primary: "#10b981",
        secondary: "#fff",
      },
      style: {
        background: "rgba(6, 78, 59, 0.8)", // Deep emerald with transparency
        border: "1px solid rgba(16, 185, 129, 0.3)",
      },
    },

    // Error Toast
    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
      style: {
        background: "rgba(127, 29, 29, 0.8)", // Deep red with transparency
        border: "1px solid rgba(239, 68, 68, 0.3)",
      },
    },
  }}
/>
    </UserProvider>
  );
};

export default App;

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if token exists in localStorage
  
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};