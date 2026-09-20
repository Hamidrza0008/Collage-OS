"use client";

export default function ProfileTabs({ tabs, activeTab, onSelectTab }) {
  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-xl px-4 py-2 mt-4 shadow-2xs overflow-hidden">
      <nav
        aria-label="Profile Sections"
        className="flex items-center gap-6 sm:gap-8 overflow-x-auto scrollbar-none py-1"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onSelectTab(tab)}
              className={`relative text-xs sm:text-[13px] whitespace-nowrap transition-colors py-1 cursor-pointer select-none ${
                isActive
                  ? "font-semibold text-[#159B72] dark:text-[#20D39B]"
                  : "font-medium text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
              }`}
            >
              {tab}
              {isActive && (
                <span className="absolute -bottom-[9px] inset-x-0 h-[2.5px] bg-[#159B72] dark:bg-[#20D39B] rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
