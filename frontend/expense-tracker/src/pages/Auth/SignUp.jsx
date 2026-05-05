import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null); // stores URL now
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!name.trim()) return setError("Please enter your name.");
    if (!validateEmail(email)) return setError("Please enter a valid email.");
    if (!password) return setError("Please enter your password.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters long.");

    setError("");

    try {
      // 🔥 IMPORTANT: NO uploadImage() here
      // ProfilePhotoSelector already uploaded and returned URL
      const profileImageUrl = profilePic || null;

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName: name,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error.response?.data);

      setError(
        error.response?.data?.message ||
        "An error occurred during signup. Please try again."
      );
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto lg:max-w-none lg:w-[80%] xl:w-[70%] flex flex-col justify-center px-6 py-8 md:px-0">

        {/* Heading */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-black md:text-3xl">
            Create an Account
          </h3>
          <p className="text-sm text-slate-700 mt-2 mb-8">
            Join us and start tracking your expenses
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-1">

          {/* Inputs */}
          <div className="grid grid-cols-1 gap-4">
            <Input
              value={name}
              onChange={({ target }) => setName(target.value)}
              label="Full Name"
              placeholder="John Doe"
              type="text"
            />

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
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-xs mt-2 mb-4">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="btn-primary w-full mt-6 py-3 text-base font-medium transition-all active:scale-[0.98]"
          >
            SIGN UP
          </button>

          {/* Login Link */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
            <span className="text-gray-500">
              Already have an account?
            </span>

            <Link
              to="/login"
              className="px-5 py-1.5 rounded-full bg-purple-100 text-purple-700 font-medium hover:bg-purple-200 hover:scale-105 transition-all duration-200"
            >
              Log in
            </Link>
          </div>

        </form>
      </div>
    </AuthLayout>
  );
};

export default Signup;