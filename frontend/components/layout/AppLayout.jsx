"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { ThemeProvider } from "../providers/ThemeProvider";

function AppLayoutContent({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F7FBF9] dark:bg-[#031A16] text-[#0B3024] dark:text-[#F1FAF6] transition-colors duration-200">
      {/* Left Sidebar (Sticky Desktop & Drawer Mobile) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Application Area: Offset by sidebar width on desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[260px]">
        {/* Top Navbar */}
        <Navbar onMenuToggle={() => setIsSidebarOpen(true)} />

        {/* Main Content Container (Where future pages render through children) */}
        <main className="flex-1 p-4 sm:p-5 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AppLayout({ children }) {
  return (
    <ThemeProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </ThemeProvider>
  );
}
