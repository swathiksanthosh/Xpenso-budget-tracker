import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { IoClose } from "react-icons/io5"; // Close icon

const Input = ({
  value,
  onChange,
  placeholder,
  label,
  type,
  customWidth,
  showClear = false,
  showPasswordToggle = false, // ✅ NEW PROP to control eye icon
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const handleClear = () => {
    onChange({ target: { value: "" } });
  };

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-800 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          className={`${customWidth ? customWidth : "w-full md:w-[400px]"} px-4 py-2.5 ${isPassword && showPasswordToggle ? "pr-12" : showClear ? "pr-10" : "pr-4"} border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500`}
          value={value}
          onChange={onChange}
        />

        {/* Password visibility toggle */}
        {isPassword && showPasswordToggle && (
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
            onClick={toggleShowPassword}
          >
            {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
          </div>
        )}

        {/* Clear icon for non-password fields */}
        {showClear && !isPassword && value && (
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
            onClick={handleClear}
          >
            <IoClose size={18} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;




