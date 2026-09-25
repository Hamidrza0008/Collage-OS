"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Code2,
  Binary,
  Database,
  Network,
  Terminal,
  FileText,
  Calendar,
  Award,
  MoreVertical,
  ArrowRight,
  Eye,
  CheckCircle,
  Download,
} from "lucide-react";

export default function AssignmentCard({ assignment, onViewDetails, onToggleStatus, onDownloadResources }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "code":
        return <Code2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />;
      case "tree":
        return <Binary className="w-5 h-5 text-teal-700 dark:text-teal-400" />;
      case "database":
        return <Database className="w-5 h-5 text-purple-700 dark:text-purple-400" />;
      case "network":
        return <Network className="w-5 h-5 text-blue-700 dark:text-blue-400" />;
      case "terminal":
        return <Terminal className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />;
      default:
        return <FileText className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />;
    }
  };

  const getUrgencyBadge = (urgency, dueText) => {
    if (urgency === "urgent" || urgency === "overdue") {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/40">
          {dueText}
        </span>
      );
    }
    if (urgency === "upcoming") {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/40">
          {dueText}
        </span>
      );
    }
    if (urgency === "submitted") {
      return (
        <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/40">
          Submitted
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/40">
        {dueText}
      </span>
    );
  };

  const getPriorityBadge = (priorityType, label) => {
    if (priorityType === "high") {
      return (
        <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
          {label}
        </span>
      );
    }
    if (priorityType === "medium") {
      return (
        <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
          {label}
        </span>
      );
    }
    if (priorityType === "lab") {
      return (
        <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-blue-100/80 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
          {label}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-md text-[10.5px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
        {label}
      </span>
    );
  };

  return (
    <div className="w-full bg-[#FFFFFF] dark:bg-[#021512] border border-[#D8E8E2] dark:border-[#10372F] rounded-2xl shadow-xs p-4 sm:p-5 hover:border-emerald-300 dark:hover:border-emerald-800/60 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group">
      {/* Left Section: Icon + Subject, Title, Description, Tags */}
      <div className="flex items-start gap-3.5 flex-1 min-w-0">
        <div className="w-12 h-12 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/40 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
          {getIcon(assignment.icon)}
        </div>

        <div className="flex-1 min-w-0">
          <span className="text-[11px] font-semibold text-[#658278] dark:text-[#8AA89F] uppercase tracking-wider block">
            {assignment.subject}
          </span>
          <h3 className="text-sm sm:text-[15px] font-bold text-[#0B3024] dark:text-[#F1FAF6] tracking-tight leading-snug truncate mt-0.5">
            {assignment.title}
          </h3>
          <p className="text-xs text-[#5C786E] dark:text-[#8AA89F] line-clamp-2 mt-1 font-normal leading-relaxed">
            {assignment.description}
          </p>

          {/* Tags */}
          <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
            {assignment.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-100/80 dark:bg-[#041D18] text-[#5C786E] dark:text-[#8AA89F] border border-gray-200/50 dark:border-[#10372F]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Middle & Right Section: Due date, Marks, Priority, 3-dot Menu, View Details CTA */}
      <div className="flex flex-col sm:flex-row md:items-center justify-between md:justify-end gap-3 sm:gap-5 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-[#10372F] w-full md:w-auto">
        {/* Due Information & Marks */}
        <div className="flex items-center sm:flex-col items-start sm:items-start md:items-end justify-between sm:justify-start gap-2 sm:gap-1.5 flex-wrap">
          {getUrgencyBadge(assignment.urgency, assignment.dueStatus)}
          <div className="flex items-center gap-1.5 text-[11px] text-[#658278] dark:text-[#789991] font-medium">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{assignment.dueDate}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#0B3024] dark:text-[#C5DCD4] font-semibold">
            <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Marks: {assignment.marks}</span>
          </div>
        </div>

        {/* Priority & Actions */}
        <div className="flex flex-col sm:items-end gap-2.5 w-full sm:w-auto">
          <div className="flex items-center justify-between sm:justify-end gap-2">
            {getPriorityBadge(assignment.priorityType, assignment.priority)}

            {/* 3-Dot Menu */}
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((p) => !p)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#082A24] transition-colors cursor-pointer"
                aria-label="Assignment actions"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#10372F] shadow-lg py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                  <Link
                    href={`/student/assignments/${assignment.id}`}
                    onClick={() => {
                      if (onViewDetails) onViewDetails(assignment);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 text-[#0B3024] dark:text-[#C5DCD4] hover:bg-gray-50 dark:hover:bg-[#0A3029]"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    <span>View Details</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      onToggleStatus(assignment.id);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 text-[#0B3024] dark:text-[#C5DCD4] hover:bg-gray-50 dark:hover:bg-[#0A3029]"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>
                      {assignment.status === "submitted" ? "Mark as Pending" : "Mark as Submitted"}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onDownloadResources(assignment.title);
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 text-[#0B3024] dark:text-[#C5DCD4] hover:bg-gray-50 dark:hover:bg-[#0A3029]"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-600" />
                    <span>Download Resources</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* View Details Button */}
          <Link
            href={`/student/assignments/${assignment.id}`}
            onClick={() => {
              if (onViewDetails) onViewDetails(assignment);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white dark:bg-[#10B981] dark:hover:bg-[#059669] dark:text-[#021512] text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
