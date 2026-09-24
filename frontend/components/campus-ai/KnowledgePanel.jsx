"use client";

import { useState } from "react";
import {
  Search,
  FileText,
  BookOpen,
  ShieldCheck,
  Download,
  MessageSquare,
  Sparkles,
  Database,
  ExternalLink,
  Filter,
} from "lucide-react";
import { COLLEGE_KNOWLEDGE_ITEMS } from "./campusAIData";

export default function KnowledgePanel({ activeTab, onAskAboutItem }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  // Determine current mode meta
  const getPanelMeta = () => {
    switch (activeTab) {
      case "documents":
        return {
          title: "College Documents & Curricula",
          subtitle: "Official academic documents, semester syllabi, and reference catalogs indexed for RAG vector search.",
          badge: "Vector Indexed",
          defaultFilter: "Documents",
        };
      case "guidelines":
        return {
          title: "Campus Guidelines & Protocols",
          subtitle: "Standard operating procedures, internship NOC requirements, and campus safety protocols.",
          badge: "Official Protocol",
          defaultFilter: "Guidelines",
        };
      case "policies":
        return {
          title: "Official College Policies",
          subtitle: "Governing university regulations, attendance criteria, grading schemes, and code of conduct.",
          badge: "Board Approved",
          defaultFilter: "Policies",
        };
      case "knowledge":
      default:
        return {
          title: "College Knowledge Base",
          subtitle: "Unified searchable directory of permitted campus data, documents, policies, and guidelines.",
          badge: "MongoDB + RAG",
          defaultFilter: "All",
        };
    }
  };

  const meta = getPanelMeta();

  // Filter items based on activeTab, search query, and selectedTag
  const filteredItems = COLLEGE_KNOWLEDGE_ITEMS.filter((item) => {
    // Tab filter
    if (activeTab === "documents" && item.type !== "Documents") return false;
    if (activeTab === "guidelines" && item.type !== "Guidelines") return false;
    if (activeTab === "policies" && item.type !== "Policies") return false;

    // Tag filter
    if (selectedTag !== "All" && !item.tags.includes(selectedTag)) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchSummary = item.summary.toLowerCase().includes(q);
      const matchTag = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchSummary && !matchTag) return false;
    }

    return true;
  });

  // Extract all unique tags
  const allTags = ["All", ...new Set(COLLEGE_KNOWLEDGE_ITEMS.flatMap((item) => item.tags))];

  return (
    <div className="h-full overflow-y-auto space-y-4 p-3.5 sm:p-4 scrollbar-thin">
      {/* Header Banner */}
      <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              {meta.title}
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              {meta.badge}
            </span>
          </div>
          <p className="text-xs text-[#36594C] dark:text-[#B5CCC5] mt-1 max-w-xl">
            {meta.subtitle}
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-4 h-4 text-[#658278] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#0A2A24] text-xs text-[#0B3024] dark:text-[#F1FAF6] placeholder-[#658278] focus:border-emerald-500/60 outline-none transition-colors"
          />
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <Filter className="w-3.5 h-3.5 text-[#658278] shrink-0 mr-1" />
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
              selectedTag === tag
                ? "bg-[#159B72] text-white shadow-2xs"
                : "bg-white dark:bg-[#06241F] text-[#36594C] dark:text-[#B5CCC5] border border-[#D8E8E2] dark:border-[#16463D] hover:border-emerald-500/40"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-8 text-center space-y-2">
          <p className="text-sm font-medium text-[#0B3024] dark:text-[#F1FAF6]">
            No matching items found.
          </p>
          <p className="text-xs text-[#658278] dark:text-[#789991]">
            Try adjusting your search terms or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] p-4 flex flex-col justify-between gap-3 shadow-xs hover:border-emerald-500/50 transition-all group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    {item.category} • {item.type}
                  </span>
                  <span className="text-[11px] text-[#658278] dark:text-[#789991]">
                    {item.fileSize}
                  </span>
                </div>

                <h3 className="text-[13.5px] font-semibold text-[#0B3024] dark:text-[#F1FAF6] group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#36594C] dark:text-[#B5CCC5] line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10.5px] px-2 py-0.5 rounded-md bg-[#F1F8F5] dark:bg-[#0A2A24] text-[#658278] dark:text-[#B5CCC5]"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-[#D8E8E2]/60 dark:border-[#16463D]/60 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#658278]">
                  Updated {item.lastUpdated}
                </span>

                <button
                  type="button"
                  onClick={() => onAskAboutItem(item.title)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-500/20 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>Ask Campus AI</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
