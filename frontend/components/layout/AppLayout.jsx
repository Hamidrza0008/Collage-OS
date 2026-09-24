"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import {
  STUDENT_NAV_ITEMS,
  STUDENT_USER,
  STUDENT_QUOTE,
  FACULTY_NAV_ITEMS,
  FACULTY_USER,
  FACULTY_QUOTE,
} from "./navConfig";

export default function AppLayout({
  children,
  role = "student",
  navItems,
  user,
  brandQuote,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const resolvedNavItems =
    navItems || (role === "faculty" ? FACULTY_NAV_ITEMS : STUDENT_NAV_ITEMS);
  const resolvedUser =
    user || (role === "faculty" ? FACULTY_USER : STUDENT_USER);
  const resolvedBrandQuote =
    brandQuote || (role === "faculty" ? FACULTY_QUOTE : STUDENT_QUOTE);

  return (
    <div className="flex min-h-screen bg-[#F7FBF9] dark:bg-[#031A16] text-[#0B3024] dark:text-[#F1FAF6] transition-colors duration-200">
      {/* Left Sidebar (Sticky Desktop & Drawer Mobile) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        navItems={resolvedNavItems}
        brandQuote={resolvedBrandQuote}
      />

      {/* Main Application Area: Offset by sidebar width on desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[260px]">
        {/* Top Navbar */}
        <Navbar onMenuToggle={() => setIsSidebarOpen(true)} user={resolvedUser} />

        {/* Main Content Container (Where pages render through children) */}
        <main className="flex-1 p-3 sm:p-5 md:p-6 overflow-y-auto max-w-full">
          {children}
        </main>
      </div>
    </div>
  );
}


