"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function NavItem({
  icon: Icon,
  label,
  href = "#",
  isActive = false,
  hasSubmenu = false,
  badge = null,
  onClick,
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group flex items-center justify-between px-3 py-1.5 rounded-xl text-[13px] transition-all duration-150 select-none ${
        isActive
          ? "bg-[#eaf5ef] dark:bg-[#075A43] text-[#1c6442] dark:text-[#20D39B] font-semibold shadow-xs"
          : "text-[#36594C] dark:text-[#B5CCC5] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] font-medium"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {Icon && (
          <Icon
            className={`w-4 h-4 shrink-0 transition-colors ${
              isActive
                ? "text-[#1c6442] dark:text-[#20D39B]"
                : "text-[#658278] dark:text-[#789991] group-hover:text-[#0B3024] dark:group-hover:text-[#F1FAF6]"
            }`}
            strokeWidth={isActive ? 2.2 : 1.9}
          />
        )}
        <span className="whitespace-nowrap">{label}</span>
      </div>

      <div className="flex items-center gap-1 shrink-0 ml-2">
        {badge && (
          <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-semibold tracking-wide bg-[#159B72]/15 text-[#159B72] dark:bg-[#123F35] dark:text-[#20D39B]">
            {badge}
          </span>
        )}
        {hasSubmenu && (
          <ChevronRight
            className={`w-3.5 h-3.5 transition-colors ${
              isActive
                ? "text-[#1c6442] dark:text-[#20D39B]"
                : "text-[#658278] dark:text-[#789991] group-hover:text-[#0B3024] dark:group-hover:text-[#F1FAF6]"
            }`}
            strokeWidth={2}
          />
        )}
      </div>
    </Link>
  );
}
