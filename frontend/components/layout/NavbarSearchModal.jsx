"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Home,
  Layers,
  ClipboardCheck,
  Bell,
  Calendar,
  LayoutGrid,
  Briefcase,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  User,
  Settings,
  ArrowRight,
} from "lucide-react";

const NAV_SHORTCUTS = [
  { label: "Home Dashboard", category: "Navigation", href: "/student", icon: Home },
  { label: "Global Search & Discovery", category: "Search", href: "/student/search", icon: Search },
  { label: "Campus AI Workspace", category: "Featured", href: "/student/campus-ai", icon: Sparkles },
  { label: "Academics & Grades", category: "Curriculum", href: "/student/academics", icon: Layers },
  { label: "Assignments & Deadlines", category: "Curriculum", href: "/student/assignments", icon: ClipboardCheck },
  { label: "Notices & Circulars", category: "Campus", href: "/student/notices", icon: Bell },
  { label: "Events & Workshops", category: "Campus", href: "/student/events", icon: Calendar },
  { label: "Student Projects", category: "Showcase", href: "/student/projects", icon: LayoutGrid },
  { label: "Internships & Hackathons", category: "Career", href: "/student/internships", icon: Briefcase },
  { label: "Lost & Found Hub", category: "Utility", href: "/student/lost-and-found", icon: ShieldCheck },
  { label: "Campus Feed", category: "Community", href: "/student/feed", icon: MessageSquare },
  { label: "My Profile", category: "Account", href: "/student/profile", icon: User },
  { label: "Notification Center", category: "Inbox", href: "/student/notifications", icon: Bell },
  { label: "Settings & Preferences", category: "Account", href: "/student/settings", icon: Settings },
];

export default function NavbarSearchModal({ isOpen, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Filter shortcuts
  const filtered = query.trim()
    ? NAV_SHORTCUTS.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : NAV_SHORTCUTS;

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle keyboard navigation (Arrow Up, Arrow Down, Enter, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filtered.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered.length > 0 && filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex]);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  const handleSelect = (item) => {
    onClose();
    router.push(item.href);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 md:pt-20 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#E8F1ED] dark:border-[#10372F] gap-2.5">
          <Search className="w-5 h-5 text-[#159B72] dark:text-[#20D39B] shrink-0" strokeWidth={2.2} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search student modules..."
            className="flex-1 text-sm bg-transparent text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] dark:placeholder-[#789991] focus:outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-[#658278] dark:text-[#789991] bg-[#F1F8F5] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] rounded-md">
              ESC to exit
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="p-2 max-h-[380px] overflow-y-auto space-y-1">
          {query.trim().length > 0 && (
            <div
              onClick={() => {
                onClose();
                router.push(`/student/search?q=${encodeURIComponent(query.trim())}`);
              }}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer bg-emerald-50 dark:bg-[#082A24] text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors mb-1.5"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Search className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="truncate">Search all of College OS for &ldquo;{query}&rdquo;</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="text-center py-6 text-xs text-[#658278] dark:text-[#789991] space-y-2">
              <p>No navigation shortcuts match &ldquo;{query}&rdquo;.</p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push(`/student/search?q=${encodeURIComponent(query.trim())}`);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#159B72] hover:bg-[#087A5B] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search all results in Global Search</span>
              </button>
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.href}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors text-xs ${
                    isSelected
                      ? "bg-[#DDF3EB] dark:bg-[#08352C] text-[#0B3024] dark:text-[#F1FAF6] font-semibold"
                      : "text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-white dark:bg-[#0B3024] text-[#159B72] dark:text-[#20D39B] shadow-2xs"
                          : "bg-gray-100 dark:bg-[#06241F] text-[#658278] dark:text-[#789991]"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">{item.label}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] uppercase font-bold text-[#658278] dark:text-[#789991] tracking-wider px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5">
                      {item.category}
                    </span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? "text-[#159B72] dark:text-[#20D39B]" : "opacity-0"}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 border-t border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#082A24] flex items-center justify-between text-[11px] text-[#658278] dark:text-[#789991]">
          <span>Navigate with <kbd className="px-1 py-0.2 rounded bg-black/5 dark:bg-white/10 font-bold">↑</kbd> <kbd className="px-1 py-0.2 rounded bg-black/5 dark:bg-white/10 font-bold">↓</kbd></span>
          <span>Press <kbd className="px-1.5 py-0.2 rounded bg-black/5 dark:bg-white/10 font-bold">Enter</kbd> to jump</span>
        </div>
      </div>
    </div>
  );
}
