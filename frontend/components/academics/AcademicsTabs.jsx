"use client";

export default function AcademicsTabs({ activeTab, onTabClick }) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "marks", label: "Marks" },
    { id: "attendance", label: "Attendance" },
    { id: "timetable", label: "Time Table" },
    { id: "assignments", label: "Assignments" },
    { id: "calendar", label: "Academic Calendar" },
  ];

  return (
    <div className="w-full bg-white/80 dark:bg-[#021512]/80 backdrop-blur-xs border border-[#D8E8E2] dark:border-[#10372F] rounded-xl shadow-2xs px-2 py-1 mb-4 overflow-x-auto no-scrollbar">
      <nav className="flex items-center gap-1 sm:gap-1.5 min-w-max" aria-label="Academics sections">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabClick(tab.id)}
              className={`relative px-3.5 sm:px-4 py-1.5 text-xs sm:text-[13px] font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                isActive
                  ? "text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50/80 dark:bg-emerald-950/50"
                  : "text-[#5C786E] dark:text-[#8AA89F] hover:text-[#0B3024] dark:hover:text-[#E2F1EC] hover:bg-gray-50/70 dark:hover:bg-[#082A24]/50"
              }`}
            >
              {tab.label}
              {isActive && (
                <span
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full"
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
