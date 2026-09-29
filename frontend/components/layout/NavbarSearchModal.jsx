"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  X,
  ArrowRight,
  Clock,
  Sparkles,
  CornerDownLeft,
  Trash2,
  ExternalLink,
} from "lucide-react";
import {
  COMMAND_CATEGORIES,
  COMMAND_ITEMS,
  getRecentCommandIds,
  saveRecentCommandId,
  clearRecentCommandIds,
  getContextualCommandIds,
} from "./commandPaletteData";
import { getStoredNotifications } from "@/components/notifications/notificationData";
import { getSavedItems } from "@/components/saved/savedItemsStore";

// Highlight matched characters in label
function HighlightMatch({ text, query }) {
  if (!query || !query.trim()) {
    return <span>{text}</span>;
  }
  const trimmed = query.trim();
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold px-0.5 rounded"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}

export default function NavbarSearchModal({ isOpen, onClose }) {
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentIds, setRecentIds] = useState([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  const inputRef = useRef(null);
  const modalRef = useRef(null);
  const listRef = useRef(null);

  // Sync real-time notification & saved item counts
  const syncCounts = useCallback(() => {
    try {
      const storedNotifs = getStoredNotifications();
      const unread = Array.isArray(storedNotifs)
        ? storedNotifs.filter((n) => !n.read).length
        : 0;
      setUnreadNotificationsCount(unread);

      const items = getSavedItems();
      setSavedCount(Array.isArray(items) ? items.length : 0);
    } catch (err) {
      console.warn("Failed to sync modal counts:", err);
    }
  }, []);

  // Sync recent commands from storage
  const syncRecent = useCallback(() => {
    setRecentIds(getRecentCommandIds());
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setActiveCategory("all");
      setSelectedIndex(0);
      syncRecent();
      syncCounts();

      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [isOpen, syncRecent, syncCounts]);

  // Listen for storage / custom store events
  useEffect(() => {
    window.addEventListener("college_os_notifications_updated", syncCounts);
    window.addEventListener("college_os_saved_items_updated", syncCounts);
    window.addEventListener("storage", syncCounts);

    return () => {
      window.removeEventListener("college_os_notifications_updated", syncCounts);
      window.removeEventListener("college_os_saved_items_updated", syncCounts);
      window.removeEventListener("storage", syncCounts);
    };
  }, [syncCounts]);

  // Contextual items for current route
  const contextualCommands = useMemo(() => {
    if (query.trim()) return [];
    const contextualIds = getContextualCommandIds(pathname);
    return contextualIds
      .map((id) => COMMAND_ITEMS.find((item) => item.id === id))
      .filter(Boolean);
  }, [pathname, query]);

  // Recent command objects
  const recentCommands = useMemo(() => {
    if (query.trim()) return [];
    return recentIds
      .map((id) => COMMAND_ITEMS.find((item) => item.id === id))
      .filter(Boolean);
  }, [recentIds, query]);

  // Filter commands by query and category
  const filteredCommands = useMemo(() => {
    const q = query.trim().toLowerCase();

    return COMMAND_ITEMS.filter((item) => {
      // Category filter
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }

      // Query filter
      if (!q) return true;

      const matchLabel = item.label.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchGroup = item.group?.toLowerCase().includes(q);
      const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(q));

      return matchLabel || matchDesc || matchGroup || matchKeywords;
    });
  }, [query, activeCategory]);

  // Build flat selectable items array for keyboard navigation
  const selectableItems = useMemo(() => {
    const items = [];
    const q = query.trim();

    // 1. If query exists, top item is the full search handoff card
    if (q) {
      items.push({
        type: "handoff",
        id: "handoff-global-search",
        query: q,
      });
    }

    // 2. When query is empty and on 'all' tab, include contextual & recent items in selection
    if (!q && activeCategory === "all") {
      if (contextualCommands.length > 0) {
        contextualCommands.forEach((cmd) => {
          items.push({ type: "command", id: `ctx-${cmd.id}`, command: cmd });
        });
      }
      if (recentCommands.length > 0) {
        recentCommands.forEach((cmd) => {
          items.push({ type: "command", id: `rec-${cmd.id}`, command: cmd });
        });
      }
    }

    // 3. Regular filtered commands
    filteredCommands.forEach((cmd) => {
      // Avoid duplicate selectable entries if already included in contextual/recent above
      const alreadyInList = items.some(
        (it) => it.type === "command" && it.command.id === cmd.id
      );
      if (!alreadyInList) {
        items.push({ type: "command", id: cmd.id, command: cmd });
      }
    });

    return items;
  }, [query, activeCategory, contextualCommands, recentCommands, filteredCommands]);

  // Ensure selectedIndex is within bounds when list changes
  useEffect(() => {
    setSelectedIndex((prev) => {
      if (selectableItems.length === 0) return 0;
      if (prev >= selectableItems.length) return selectableItems.length - 1;
      return prev;
    });
  }, [selectableItems.length]);

  // Scroll selected element into view
  useEffect(() => {
    if (!isOpen || selectableItems.length === 0) return;
    const currentItem = selectableItems[selectedIndex];
    if (!currentItem) return;

    const el = document.getElementById(`cmd-item-${currentItem.id}`);
    if (el) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex, selectableItems, isOpen]);

  // Command selection handler
  const handleExecute = useCallback(
    (item) => {
      if (!item) return;

      if (item.type === "handoff") {
        onClose();
        router.push(`/student/search?q=${encodeURIComponent(item.query)}`);
        return;
      }

      if (item.type === "command" && item.command) {
        const cmd = item.command;
        saveRecentCommandId(cmd.id);
        syncRecent();
        onClose();
        if (cmd.route) {
          router.push(cmd.route);
        }
      }
    },
    [onClose, router, syncRecent]
  );

  // Clear recent commands handler
  const handleClearRecent = (e) => {
    e.stopPropagation();
    clearRecentCommandIds();
    setRecentIds([]);
  };

  // Keyboard navigation & Focus trapping
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          selectableItems.length > 0 ? (prev + 1) % selectableItems.length : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          selectableItems.length > 0
            ? (prev - 1 + selectableItems.length) % selectableItems.length
            : 0
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (selectableItems.length > 0 && selectableItems[selectedIndex]) {
          handleExecute(selectableItems[selectedIndex]);
        }
      } else if (e.key === "Tab") {
        // Simple focus trap: prevent focus from leaking outside dialog
        const focusable = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable && focusable.length > 0) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectableItems, selectedIndex, handleExecute, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-5 md:pt-16 bg-[#0B3024]/40 dark:bg-black/75 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Global Command Palette"
      data-command-palette="true"
    >
      <div
        ref={modalRef}
        className="w-full max-w-2xl rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-[0_25px_60px_-15px_rgba(11,48,36,0.2)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden flex flex-col my-auto sm:my-0 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-[#E8F1ED] dark:border-[#10372F] gap-3">
          <Search
            className="w-5 h-5 text-[#159B72] dark:text-[#20D39B] shrink-0"
            strokeWidth={2.2}
          />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls="command-palette-results"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, search modules, or jump to..."
            className="flex-1 text-sm bg-transparent text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] dark:placeholder-[#789991] focus:outline-none"
          />

          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedIndex(0);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-[#F1F8F5] dark:hover:bg-[#082A24] transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-[#658278] dark:text-[#789991] bg-[#F1F8F5] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] rounded-md">
              ESC
            </kbd>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#E8F1ED]/80 dark:border-[#10372F]/80 bg-[#F7FBF9]/60 dark:bg-[#082A24]/40 overflow-x-auto no-scrollbar">
          {COMMAND_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#159B72] text-white dark:bg-[#20D39B] dark:text-[#06241F] shadow-xs font-semibold"
                    : "text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#DDF3EB]/60 dark:hover:bg-[#0B3024] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Scrollable Results Area */}
        <div
          ref={listRef}
          id="command-palette-results"
          role="listbox"
          className="p-2 max-h-[420px] sm:max-h-[460px] overflow-y-auto space-y-3"
        >
          {/* Full Search Handoff Banner (Shown when query is typed) */}
          {query.trim().length > 0 && (
            <div
              id="cmd-item-handoff-global-search"
              role="option"
              aria-selected={selectedIndex === 0}
              onClick={() =>
                handleExecute({
                  type: "handoff",
                  id: "handoff-global-search",
                  query: query.trim(),
                })
              }
              onMouseEnter={() => setSelectedIndex(0)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer transition-all border ${
                selectedIndex === 0
                  ? "bg-emerald-100/90 dark:bg-[#08352C] text-emerald-950 dark:text-emerald-100 border-[#159B72] dark:border-[#20D39B] shadow-xs"
                  : "bg-emerald-50/70 dark:bg-[#082A24]/50 text-emerald-900 dark:text-emerald-200 border-emerald-200/80 dark:border-emerald-800/40 hover:bg-emerald-100/80"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Search className="w-3.5 h-3.5" />
                </div>
                <div className="truncate text-xs">
                  <span className="font-semibold">Search all of College OS for </span>
                  <span className="font-bold underline decoration-emerald-400">
                    &ldquo;{query.trim()}&rdquo;
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300 tracking-wider px-1.5 py-0.5 rounded bg-emerald-200/60 dark:bg-emerald-900/40">
                  Global Search
                </span>
                <CornerDownLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
          )}

          {/* Contextual Suggestions (Shown when query is empty & 'all' category) */}
          {!query.trim() &&
            activeCategory === "all" &&
            contextualCommands.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center justify-between px-2 pt-1 pb-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#159B72] dark:text-[#20D39B] uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>Suggested for this page</span>
                  </div>
                </div>
                {contextualCommands.map((item) => {
                  const selectableIdx = selectableItems.findIndex(
                    (it) => it.type === "command" && it.id === `ctx-${item.id}`
                  );
                  const isSelected = selectedIndex === selectableIdx;
                  return (
                    <CommandRow
                      key={`ctx-${item.id}`}
                      item={item}
                      query={query}
                      isSelected={isSelected}
                      onSelect={() =>
                        handleExecute({ type: "command", id: item.id, command: item })
                      }
                      onHover={() => setSelectedIndex(selectableIdx)}
                      domId={`cmd-item-ctx-${item.id}`}
                      unreadNotifs={unreadNotificationsCount}
                      savedTotal={savedCount}
                    />
                  );
                })}
              </div>
            )}

          {/* Recent Commands (Shown when query is empty & 'all' category) */}
          {!query.trim() &&
            activeCategory === "all" &&
            recentCommands.length > 0 && (
              <div className="space-y-1">
                <div className="flex items-center justify-between px-2 pt-1 pb-0.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider">
                    <Clock className="w-3 h-3" />
                    <span>Recent Commands</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearRecent}
                    className="inline-flex items-center gap-1 text-[10.5px] font-medium text-[#658278] dark:text-[#789991] hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear Recent</span>
                  </button>
                </div>
                {recentCommands.map((item) => {
                  const selectableIdx = selectableItems.findIndex(
                    (it) => it.type === "command" && it.id === `rec-${item.id}`
                  );
                  const isSelected = selectedIndex === selectableIdx;
                  return (
                    <CommandRow
                      key={`rec-${item.id}`}
                      item={item}
                      query={query}
                      isSelected={isSelected}
                      onSelect={() =>
                        handleExecute({ type: "command", id: item.id, command: item })
                      }
                      onHover={() => setSelectedIndex(selectableIdx)}
                      domId={`cmd-item-rec-${item.id}`}
                      unreadNotifs={unreadNotificationsCount}
                      savedTotal={savedCount}
                    />
                  );
                })}
              </div>
            )}

          {/* Grouped Commands List */}
          {(() => {
            // Group visible commands
            const groups = {};
            filteredCommands.forEach((cmd) => {
              if (!groups[cmd.group]) groups[cmd.group] = [];
              groups[cmd.group].push(cmd);
            });

            const groupKeys = Object.keys(groups);

            if (groupKeys.length === 0 && query.trim().length > 0) {
              return (
                <div className="text-center py-8 text-xs text-[#658278] dark:text-[#789991] space-y-3">
                  <p>
                    No commands match &ldquo;<span className="font-semibold">{query}</span>&rdquo;.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      router.push(
                        `/student/search?q=${encodeURIComponent(query.trim())}`
                      );
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#159B72] hover:bg-[#087A5B] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search all of College OS for &ldquo;{query}&rdquo;</span>
                  </button>
                </div>
              );
            }

            return groupKeys.map((groupName) => (
              <div key={groupName} className="space-y-1">
                <div className="px-2 pt-1 pb-0.5 text-[11px] font-bold text-[#658278] dark:text-[#789991] uppercase tracking-wider">
                  {groupName}
                </div>
                {groups[groupName].map((item) => {
                  const selectableIdx = selectableItems.findIndex(
                    (it) => it.type === "command" && it.command?.id === item.id
                  );
                  const isSelected = selectedIndex === selectableIdx;

                  return (
                    <CommandRow
                      key={item.id}
                      item={item}
                      query={query}
                      isSelected={isSelected}
                      onSelect={() =>
                        handleExecute({ type: "command", id: item.id, command: item })
                      }
                      onHover={() => setSelectedIndex(selectableIdx)}
                      domId={`cmd-item-${item.id}`}
                      unreadNotifs={unreadNotificationsCount}
                      savedTotal={savedCount}
                    />
                  );
                })}
              </div>
            ));
          })()}
        </div>

        {/* Bottom Status & Keybinding Bar */}
        <div className="px-4 py-2.5 border-t border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#082A24] flex items-center justify-between text-[11px] text-[#658278] dark:text-[#789991]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-bold border border-black/10 dark:border-white/10 text-[10px]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-bold border border-black/10 dark:border-white/10 text-[10px]">
                ↓
              </kbd>
              <span className="hidden xs:inline ml-0.5">navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-bold border border-black/10 dark:border-white/10 text-[10px]">
                ↵
              </kbd>
              <span className="hidden xs:inline ml-0.5">execute</span>
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/10 font-bold border border-black/10 dark:border-white/10 text-[10px]">
                esc
              </kbd>
              <span className="hidden xs:inline ml-0.5">close</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 font-medium text-[10.5px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#159B72] dark:bg-[#20D39B]"></span>
            <span>College OS Command Palette</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for individual command rows
function CommandRow({
  item,
  query,
  isSelected,
  onSelect,
  onHover,
  domId,
  unreadNotifs,
  savedTotal,
}) {
  const Icon = item.icon;

  // Determine badges if this item is notifications or saved items
  const showNotifBadge =
    (item.id.includes("notification") || item.route === "/student/notifications") &&
    unreadNotifs > 0;

  const showSavedBadge =
    (item.id.includes("saved") || item.route === "/student/saved") && savedTotal > 0;

  return (
    <div
      id={domId}
      role="option"
      aria-selected={isSelected}
      onClick={onSelect}
      onMouseEnter={onHover}
      className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-colors text-xs ${
        isSelected
          ? "bg-[#DDF3EB] dark:bg-[#08352C] text-[#0B3024] dark:text-[#F1FAF6] font-semibold"
          : "text-[#36594C] dark:text-[#B5CCC5] hover:bg-[#F7FBF9] dark:hover:bg-[#082A24]"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
            isSelected
              ? "bg-white dark:bg-[#0B3024] text-[#159B72] dark:text-[#20D39B] shadow-2xs"
              : "bg-gray-100 dark:bg-[#06241F] text-[#658278] dark:text-[#789991]"
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate">
              <HighlightMatch text={item.label} query={query} />
            </span>

            {/* Notification unread counter */}
            {showNotifBadge && (
              <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#E5484D] text-white">
                {unreadNotifs}
              </span>
            )}

            {/* Saved total items badge */}
            {showSavedBadge && (
              <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                {savedTotal} saved
              </span>
            )}
          </div>

          {item.description && (
            <p className="text-[11px] text-[#658278] dark:text-[#789991] truncate font-normal mt-0.5">
              {item.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 ml-2">
        {item.shortcut ? (
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-[#658278] dark:text-[#789991] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded">
            {item.shortcut}
          </kbd>
        ) : null}

        <ArrowRight
          className={`w-3.5 h-3.5 transition-opacity ${
            isSelected ? "text-[#159B72] dark:text-[#20D39B] opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
