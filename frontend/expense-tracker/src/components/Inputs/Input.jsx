import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, label, placeholder, type, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      {/* Label */}
      <label className="block text-sm font-medium text-slate-900 mb-1">
        {label}
      </label>

      <div className="relative flex bg-slate-100 items-center ">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full text-sm text-slate-800 bg-transparent border-[1.5px] border-slate-200 rounded-lg px-4 py-3 outline-none hover:border-2 focus:border-purple-500 transition-all"
          value={value}
          onChange={onChange}
        />

        {/* Password Toggle Icon */}
        {type === "password" && (
          <button
            type="button" // CRITICAL: Prevents button from submitting the form
            className="absolute right-4 text-slate-400 cursor-pointer hover:text-purple-600 transition-colors"
            onClick={toggleShowPassword}
          >
            {showPassword ? (
              <FaRegEye size={20} />
            ) : (
              <FaRegEyeSlash size={20} />
            )}
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
    </div>
  );
};

export default Input;