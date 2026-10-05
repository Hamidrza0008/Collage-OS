"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthInput({
  label,
  required = false,
  type = "text",
  icon: Icon,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  disabled = false,
  readOnly = false,
  id,
  showPasswordToggle = false,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`space-y-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs sm:text-[13px] font-semibold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight"
        >
          {label}
          {required && <span className="text-[#159B72] dark:text-[#20D39B] ml-1">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 flex items-center justify-center text-[#658278] dark:text-[#789991] pointer-events-none">
            <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
          </div>
        )}

        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          className={`w-full h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 outline-hidden ${
            Icon ? "pl-10.5 sm:pl-11" : "pl-4"
          } ${showPasswordToggle ? "pr-11" : "pr-4"} ${
            readOnly
              ? "bg-[#F1F8F5] dark:bg-[#07241E] text-[#36594C] dark:text-[#A7C8BD] border border-[#D8E8E2] dark:border-[#16463D] cursor-not-allowed"
              : error
              ? "bg-white dark:bg-[#0A2A24] border-2 border-rose-500 text-rose-900 dark:text-rose-100 focus:ring-4 focus:ring-rose-500/15"
              : "bg-white dark:bg-[#0A2A24] border border-[#D8E8E2] dark:border-[#16463D] text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278]/60 dark:placeholder:text-[#789991]/60 hover:border-[#159B72]/60 focus:border-[#159B72] dark:focus:border-[#20D39B] focus:ring-4 focus:ring-[#DDF4EB] dark:focus:ring-[#075A43]/40"
          }`}
          {...props}
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute right-3.5 flex items-center justify-center text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors p-1 rounded-md"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>

      {error ? (
        <p className="text-[11px] font-medium text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
          <span>&bull;</span> {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-[#658278] dark:text-[#789991] mt-1">{helperText}</p>
      ) : null}
    </div>
  );
}
