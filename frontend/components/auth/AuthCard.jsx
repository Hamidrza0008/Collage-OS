import React from "react";

export default function AuthCard({
  title,
  subtitle,
  children,
  showLogo = true,
  badge = null,
  maxWidth = "max-w-[460px]",
  className = "",
}) {
  return (
    <div className={`w-full ${maxWidth} mx-auto bg-white dark:bg-[#06241F] rounded-3xl sm:rounded-[28px] border border-[#E2EBE7] dark:border-[#16463D] shadow-xl shadow-[#0B3024]/4 dark:shadow-black/20 p-5 sm:p-6 lg:p-6.5 transition-colors duration-200 ${className}`}>
      {/* Card Header Branding */}
      {showLogo && (
        <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#159B72] flex items-center justify-center shadow-xs shrink-0 p-2">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
              <path
                d="M20.5 3.5C20.5 3.5 13.2 3.8 8.7 8.3C4.2 12.8 3.8 20.2 3.8 20.2C3.8 20.2 11.2 19.8 15.7 15.3C20.2 10.8 20.5 3.5 20.5 3.5Z"
                fill="white"
              />
              <path
                d="M4.2 19.8L13.5 10.5"
                stroke="#159B72"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M9.8 14.2L8 14.2"
                stroke="#159B72"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M12.4 11.6L14.2 9.8"
                stroke="#159B72"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M8.2 15.8L6.8 16.5"
                stroke="#159B72"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div>
            <span className="text-xl sm:text-[22px] font-black text-[#0B3024] dark:text-[#F1FAF6] tracking-tight block leading-tight">
              College OS
            </span>
            {badge && (
              <span className="text-xs sm:text-[12.5px] font-medium text-[#658278] dark:text-[#8AAEA1] block leading-tight mt-0.5">
                {badge}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Title & Subtitle */}
      {title && (
        <div className="mb-3.5 sm:mb-4 space-y-1">
          <h2 className="text-xl sm:text-[22px] font-extrabold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-[12.5px] text-[#52796F] dark:text-[#8AAEA1] leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Card Content Slot */}
      <div className="space-y-3 sm:space-y-3.5">{children}</div>
    </div>
  );
}
