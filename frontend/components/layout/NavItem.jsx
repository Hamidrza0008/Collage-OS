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
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-500/20 shadow-2xs">
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
