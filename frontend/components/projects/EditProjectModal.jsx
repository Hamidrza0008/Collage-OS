"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import {
  X,
  Pencil,
  Check,
  AlertCircle,
  FolderGit2,
  Users,
  Code2,
  Globe,
  FileText,
  Shield,
  Plus,
  Trash2,
  Search,
  Sparkles,
  ExternalLink,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { PROJECT_CATEGORIES, BRANCH_OPTIONS } from "./projectsData";
import {
  CANONICAL_STUDENT_ROSTER,
  isProjectOwner,
  saveProject,
  searchStudentRoster,
} from "./projectsStore";

// Common project statuses
const PROJECT_STATUSES = [
  "In Development",
  "Active Project",
  "Beta Release",
  "Completed",
  "Planning / Ideation",
];

// Helper to validate URLs
function isValidUrl(string) {
  if (!string || !string.trim()) return true; // optional
  try {
    const url = new URL(string.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export default function EditProjectModal({
  isOpen,
  onClose,
  project,
  onProjectSaved,
}) {
  // Navigation tabs inside the modal for clear section organization
  const [activeTab, setActiveTab] = useState("info"); // 'info' | 'content' | 'tech' | 'team' | 'visibility'

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development",
    branch: "CSE",
    type: "Team Project",
    status: "In Development",
    description: "",
    problem: "",
    solution: "",
    highlights: [],
    tech: [],
    githubUrl: "",
    demoUrl: "",
    docUrl: "",
    visibility: "Public",
    team: [],
  });

  // Track initial snapshot for dirty state detection
  const [initialSnapshot, setInitialSnapshot] = useState(null);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  // Errors & Validation
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Tech stack tag input state
  const [tagInput, setTagInput] = useState("");

  // Highlight item input state
  const [highlightInput, setHighlightInput] = useState("");

  // Team search & add state
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  const [memberSearchFocused, setMemberSearchFocused] = useState(false);
  const [selectedRosterIndex, setSelectedRosterIndex] = useState(0);

  // Refs
  const modalRef = useRef(null);
  const titleInputRef = useRef(null);
  const searchInputRef = useRef(null);

  // Check ownership
  const isOwner = useMemo(() => isProjectOwner(project), [project]);

  // Initialize form state when project changes or modal opens
  useEffect(() => {
    if (!isOpen || !project) return;

    // Normalizing incoming tech
    let initialTech = [];
    if (Array.isArray(project.tech)) {
      initialTech = [...project.tech];
    } else if (Array.isArray(project.techStack)) {
      initialTech = project.techStack.map((t) => (typeof t === "string" ? t : t.name));
    } else if (typeof project.techStack === "string") {
      initialTech = project.techStack.split(",").map((s) => s.trim()).filter(Boolean);
    } else {
      initialTech = ["React", "Node.js", "Tailwind CSS"];
    }

    // Normalizing incoming team
    let initialTeam = [];
    if (Array.isArray(project.team) && project.team.length > 0) {
      initialTeam = project.team.map((m, idx) => ({
        id: m.id || `member-${idx}`,
        name: m.name || "Student",
        role: m.role || (m.isLead ? "Lead Developer" : "Contributor"),
        avatar: m.avatar || "/assets/layout/profile-avatar.jpg",
        isLead: Boolean(m.isLead || m.role?.toLowerCase().includes("lead") || idx === 0),
        username: m.username || `@${(m.name || "student").toLowerCase().replace(/\s+/g, "")}`,
        rollNumber: m.rollNumber || "",
      }));
    } else if (Array.isArray(project.members) && project.members.length > 0) {
      initialTeam = project.members.map((m, idx) => ({
        id: m.id || `member-${idx}`,
        name: m.name || "Student",
        role: m.role || (idx === 0 ? "Lead Developer" : "Contributor"),
        avatar: m.avatar || "/assets/layout/profile-avatar.jpg",
        isLead: idx === 0 || (m.role && m.role.toLowerCase().includes("lead")),
        username: m.username || `@${(m.name || "student").toLowerCase().replace(/\s+/g, "")}`,
        rollNumber: m.rollNumber || "",
      }));
    } else {
      // Default to Hamid Rza as owner
      initialTeam = [
        {
          id: "student-1",
          name: project.author || "Hamid Rza",
          role: "Lead Creator",
          avatar: "/assets/layout/profile-avatar.jpg",
          isLead: true,
          username: "@hamidrza",
          rollNumber: "22CS087",
        },
      ];
    }

    // Normalizing highlights
    let initialHighlights = [];
    if (Array.isArray(project.highlights)) {
      initialHighlights = [...project.highlights];
    } else if (Array.isArray(project.overview?.highlights)) {
      initialHighlights = [...project.overview.highlights];
    }

    const stateObj = {
      title: project.title || "",
      category: project.category || "Web Development",
      branch: project.branch || "CSE",
      type: project.type || "Team Project",
      status: project.status || "In Development",
      description: project.description || project.tagline || "",
      problem: project.overview?.problem || project.problem || "",
      solution: project.overview?.solution || project.solution || "",
      highlights: initialHighlights,
      tech: initialTech,
      githubUrl: project.githubUrl || "",
      demoUrl: project.demoUrl || "",
      docUrl: project.docUrl || "",
      visibility: project.visibility || "Public",
      team: initialTeam,
    };

    setFormData(stateObj);
    setInitialSnapshot(JSON.stringify(stateObj));
    setErrors({});
    setIsSaving(false);
    setSaveSuccess(false);
    setShowDiscardConfirm(false);
    setIsAddingMember(false);
    setMemberSearchQuery("");
    setActiveTab("info");

    // Focus title input on modal open
    setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.focus();
      }
    }, 120);
  }, [isOpen, project]);

  // Determine if form is dirty
  const isDirty = useMemo(() => {
    if (!initialSnapshot) return false;
    return JSON.stringify(formData) !== initialSnapshot;
  }, [formData, initialSnapshot]);

  // Handle closing with dirty state verification
  const handleRequestClose = () => {
    if (isDirty) {
      setShowDiscardConfirm(true);
    } else {
      onClose();
    }
  };

  const handleConfirmDiscard = () => {
    setShowDiscardConfirm(false);
    onClose();
  };

  // Keyboard navigation & Escape handling
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (showDiscardConfirm) {
          setShowDiscardConfirm(false);
        } else if (isAddingMember) {
          setIsAddingMember(false);
        } else {
          handleRequestClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDirty, showDiscardConfirm, isAddingMember]);

  // Prevent background scrolling while open
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Filter student roster for adding collaborators
  const candidateRoster = useMemo(() => {
    const query = memberSearchQuery.trim();
    const existingNames = new Set(formData.team.map((m) => m.name.toLowerCase()));
    const roster = searchStudentRoster(query);

    return roster.map((student) => ({
      ...student,
      isAlreadyMember: existingNames.has(student.name.toLowerCase()),
    }));
  }, [memberSearchQuery, formData.team]);

  // =========================================================================
  // Field Change Handlers
  // =========================================================================
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Tech tag handlers
  const handleAddTech = (techString) => {
    const trimmed = (techString || tagInput).trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    const alreadyExists = formData.tech.some((t) => t.toLowerCase() === lower);

    if (alreadyExists) {
      setErrors((prev) => ({ ...prev, tech: `"${trimmed}" is already in the tech stack.` }));
      return;
    }

    setFormData((prev) => ({ ...prev, tech: [...prev.tech, trimmed] }));
    setTagInput("");
    setErrors((prev) => ({ ...prev, tech: null }));
  };

  const handleRemoveTech = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tech: prev.tech.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  // Highlights handlers
  const handleAddHighlight = () => {
    const trimmed = highlightInput.trim();
    if (!trimmed) return;

    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, trimmed],
    }));
    setHighlightInput("");
  };

  const handleRemoveHighlight = (idx) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== idx),
    }));
  };

  // Team member handlers
  const handleAddTeamMember = (student) => {
    if (student.isAlreadyMember) return;

    const newMember = {
      id: student.studentId || student.id,
      name: student.name,
      role: student.defaultRole || "Contributor",
      avatar: student.avatar || "/assets/events/avatars/avatar-1.jpg",
      isLead: false,
      username: student.username,
      rollNumber: student.rollNumber,
    };

    setFormData((prev) => ({
      ...prev,
      team: [...prev.team, newMember],
    }));
    setMemberSearchQuery("");
    setIsAddingMember(false);
  };

  const handleRemoveTeamMember = (indexToRemove) => {
    const target = formData.team[indexToRemove];
    if (target?.isLead) {
      setErrors((prev) => ({
        ...prev,
        team: "The project owner/lead cannot be removed.",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      team: prev.team.filter((_, idx) => idx !== indexToRemove),
    }));
    setErrors((prev) => ({ ...prev, team: null }));
  };

  const handleUpdateMemberRole = (index, newRole) => {
    setFormData((prev) => {
      const copy = [...prev.team];
      copy[index] = { ...copy[index], role: newRole };
      return { ...prev, team: copy };
    });
  };

  // =========================================================================
  // Validation Pipeline
  // =========================================================================
  const validateForm = () => {
    const newErrors = {};

    // 1. Title
    if (!formData.title.trim()) {
      newErrors.title = "Project title is required.";
    } else if (formData.title.trim().length < 3) {
      newErrors.title = "Project title must be at least 3 characters.";
    }

    // 2. Short description
    if (!formData.description.trim()) {
      newErrors.description = "Short description is required.";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Please provide at least 10 characters summarizing the project.";
    }

    // 3. Tech stack
    if (formData.tech.length === 0) {
      newErrors.tech = "At least one technology is required in the tech stack.";
    }

    // 4. URLs
    if (formData.githubUrl.trim() && !isValidUrl(formData.githubUrl)) {
      newErrors.githubUrl = "Please enter a valid URL (e.g., https://github.com/...)";
    }
    if (formData.demoUrl.trim() && !isValidUrl(formData.demoUrl)) {
      newErrors.demoUrl = "Please enter a valid URL (e.g., https://...)";
    }
    if (formData.docUrl.trim() && !isValidUrl(formData.docUrl)) {
      newErrors.docUrl = "Please enter a valid documentation URL.";
    }

    // 5. Team
    if (formData.team.length === 0) {
      newErrors.team = "Project must have at least one team member (the owner).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // =========================================================================
  // Submit / Save
  // =========================================================================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isOwner) {
      setErrors({ global: "You do not have permission to edit this project." });
      return;
    }

    if (!validateForm()) {
      // Switch to the tab with the first error for fast correction
      if (errors.title || errors.description) setActiveTab("info");
      else if (errors.tech || errors.githubUrl || errors.demoUrl || errors.docUrl)
        setActiveTab("tech");
      else if (errors.team) setActiveTab("team");
      return;
    }

    setIsSaving(true);

    // Prepare save payload
    const savePayload = {
      ...project,
      id: project.id,
      title: formData.title.trim(),
      category: formData.category,
      branch: formData.branch,
      type: formData.type,
      status: formData.status,
      description: formData.description.trim(),
      tagline: formData.description.trim(),
      tech: formData.tech,
      techStack: formData.tech.map((t) => ({
        name: t,
        category: "Core Technology",
        type: "tech",
        badge: t,
      })),
      githubUrl: formData.githubUrl.trim(),
      demoUrl: formData.demoUrl.trim(),
      docUrl: formData.docUrl.trim(),
      visibility: formData.visibility,
      highlights: formData.highlights,
      overview: {
        ...(project.overview || {}),
        problem: formData.problem.trim() || project.overview?.problem || "",
        solution:
          formData.solution.trim() ||
          project.overview?.solution ||
          formData.description.trim(),
        highlights: formData.highlights,
      },
      team: formData.team,
      members: formData.team.map((m) => ({
        name: m.name,
        avatar: m.avatar,
        role: m.role,
        id: m.id,
      })),
      membersCount: formData.team.length,
      updatedAt: "Just now",
    };

    // Simulate smooth asynchronous persistence
    setTimeout(() => {
      const result = saveProject(savePayload);
      setIsSaving(false);

      if (result.success) {
        setSaveSuccess(true);
        if (onProjectSaved) {
          onProjectSaved(result.project);
        }
        setTimeout(() => {
          onClose();
        }, 300);
      } else {
        setErrors({ global: result.error || "Failed to save project changes." });
      }
    }, 380);
  };

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-project-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleRequestClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-3xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 text-left"
      >
        {/* =================================================================== */}
        {/* Modal Header                                                        */}
        {/* =================================================================== */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24] shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/40">
              <Pencil className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2
                  id="edit-project-dialog-title"
                  className="text-base sm:text-lg font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate"
                >
                  Edit Project & Team
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-[#159B72] dark:text-[#20D39B] border border-emerald-200/60 dark:border-emerald-800/40 shrink-0">
                  {formData.category}
                </span>
              </div>
              <p className="text-[11.5px] text-[#55786B] dark:text-[#8FAFA4] truncate">
                Update project metadata, repository links, overview, and collaborators
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRequestClose}
            className="p-2 rounded-xl text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#0A2E27] transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ownership warning banner if unauthorized */}
        {!isOwner && (
          <div className="px-5 py-2.5 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              You are viewing this project in read-only mode. Only the project author or
              lead can save changes.
            </span>
          </div>
        )}

        {/* =================================================================== */}
        {/* Navigation Tabs Bar                                                 */}
        {/* =================================================================== */}
        <div className="px-5 sm:px-6 pt-2 pb-0 border-b border-[#E8F1ED] dark:border-[#10372F] bg-[#FFFFFF] dark:bg-[#06241F] flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("info")}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "info"
                ? "border-[#159B72] dark:border-[#20D39B] text-[#159B72] dark:text-[#20D39B]"
                : "border-transparent text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
            }`}
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Basic Info</span>
            {(errors.title || errors.description) && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "content"
                ? "border-[#159B72] dark:border-[#20D39B] text-[#159B72] dark:text-[#20D39B]"
                : "border-transparent text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Overview & Features</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("tech")}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "tech"
                ? "border-[#159B72] dark:border-[#20D39B] text-[#159B72] dark:text-[#20D39B]"
                : "border-transparent text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Tech & Links</span>
            {(errors.tech || errors.githubUrl || errors.demoUrl || errors.docUrl) && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("team")}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "team"
                ? "border-[#159B72] dark:border-[#20D39B] text-[#159B72] dark:text-[#20D39B]"
                : "border-transparent text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Team ({formData.team.length})</span>
            {errors.team && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("visibility")}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === "visibility"
                ? "border-[#159B72] dark:border-[#20D39B] text-[#159B72] dark:text-[#20D39B]"
                : "border-transparent text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6]"
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Visibility</span>
          </button>
        </div>

        {/* Global Error Banner */}
        {errors.global && (
          <div className="px-5 py-2.5 bg-rose-50 dark:bg-rose-950/50 border-b border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{errors.global}</span>
          </div>
        )}

        {/* =================================================================== */}
        {/* Form Body (Scrollable)                                              */}
        {/* =================================================================== */}
        <form
          id="project-edit-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5"
        >
          {/* TAB 1: BASIC INFO */}
          {activeTab === "info" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Project Title */}
              <div>
                <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  ref={titleInputRef}
                  type="text"
                  required
                  placeholder="e.g., Campus Event Pulse"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  disabled={!isOwner}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border transition-colors focus:outline-none ${
                    errors.title
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#D8E8E2] dark:border-[#16463D] focus:border-[#159B72]"
                  }`}
                />
                {errors.title && (
                  <p className="text-[11px] text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.title}</span>
                  </p>
                )}
              </div>

              {/* Category & Status Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    disabled={!isOwner}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
                  >
                    {PROJECT_CATEGORIES.filter((c) => c !== "All").map((c) => (
                      <option key={c} value={c} className="bg-white dark:bg-[#06241F]">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                    Development Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                    disabled={!isOwner}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
                  >
                    {PROJECT_STATUSES.map((st) => (
                      <option key={st} value={st} className="bg-white dark:bg-[#06241F]">
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Branch & Team Format Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                    Target Branch / Department
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => handleChange("branch", e.target.value)}
                    disabled={!isOwner}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
                  >
                    {BRANCH_OPTIONS.filter((b) => b.value !== "all").map((b) => (
                      <option key={b.value} value={b.value} className="bg-white dark:bg-[#06241F]">
                        {b.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                    Team Format
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleChange("type", e.target.value)}
                    disabled={!isOwner}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
                  >
                    <option value="Team Project">Team Project</option>
                    <option value="Individual">Individual</option>
                    <option value="Personal">Personal Project</option>
                  </select>
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                  Short Description / Tagline <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide a 2-3 sentence overview describing your project..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  disabled={!isOwner}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border transition-colors focus:outline-none ${
                    errors.description
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#D8E8E2] dark:border-[#16463D] focus:border-[#159B72]"
                  }`}
                />
                {errors.description && (
                  <p className="text-[11px] text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.description}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CONTENT & FEATURES */}
          {activeTab === "content" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Problem Statement */}
              <div>
                <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                  Problem Statement
                </label>
                <textarea
                  rows={3}
                  placeholder="What campus, engineering, or real-world problem does this project address?"
                  value={formData.problem}
                  onChange={(e) => handleChange("problem", e.target.value)}
                  disabled={!isOwner}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
                />
              </div>

              {/* Solution Overview */}
              <div>
                <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                  Solution & Implementation
                </label>
                <textarea
                  rows={3}
                  placeholder="How does your platform or software solve the problem described above?"
                  value={formData.solution}
                  onChange={(e) => handleChange("solution", e.target.value)}
                  disabled={!isOwner}
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
                />
              </div>

              {/* Key Features & Highlights */}
              <div>
                <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                  Key Features & Highlights
                </label>
                <p className="text-[11px] text-[#658278] dark:text-[#789991] mb-2">
                  Bullet points displayed prominently on the project details showcase.
                </p>

                {/* Existing Highlights */}
                <div className="space-y-1.5 mb-2.5">
                  {formData.highlights.map((hl, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] text-xs text-[#0B3024] dark:text-[#F1FAF6]"
                    >
                      <span className="flex-1">{hl}</span>
                      {isOwner && (
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(idx)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                          title="Remove highlight"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                  {formData.highlights.length === 0 && (
                    <p className="text-[11px] text-[#85A297] italic py-1">
                      No key highlights added yet. Add one below.
                    </p>
                  )}
                </div>

                {/* Add Highlight Input */}
                {isOwner && (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Real-time WebSocket notifications"
                      value={highlightInput}
                      onChange={(e) => setHighlightInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddHighlight();
                        }
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
                    />
                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#0E825E] text-white flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TECH STACK & LINKS */}
          {activeTab === "tech" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              {/* Tech Stack Chips Editor */}
              <div>
                <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                  Technologies / Tech Stack <span className="text-red-500">*</span>
                </label>
                <p className="text-[11px] text-[#658278] dark:text-[#789991] mb-2">
                  Libraries, frameworks, and tools used. Type and press Enter to add.
                </p>

                {/* Existing Chips */}
                <div className="flex flex-wrap items-center gap-1.5 p-2.5 rounded-xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#D8E8E2] dark:border-[#16463D] min-h-[44px]">
                  {formData.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#DDF4EB] dark:bg-[#0D4436] text-[#087A5B] dark:text-[#20D39B] border border-emerald-300/40 dark:border-emerald-700/40"
                    >
                      <span>{t}</span>
                      {isOwner && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(idx)}
                          className="hover:text-red-600 dark:hover:text-red-400 cursor-pointer ml-0.5"
                          title={`Remove ${t}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  ))}
                  {formData.tech.length === 0 && (
                    <span className="text-xs text-[#85A297] italic">
                      No technologies specified.
                    </span>
                  )}
                </div>

                {errors.tech && (
                  <p className="text-[11px] text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.tech}</span>
                  </p>
                )}

                {/* Add Tag Input */}
                {isOwner && (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      placeholder="e.g. Next.js, Docker, MongoDB"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTech();
                        }
                      }}
                      className="flex-1 px-3 py-1.5 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddTech()}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#0E825E] text-white flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Tech</span>
                    </button>
                  </div>
                )}
              </div>

              {/* GitHub Repository URL */}
              <div>
                <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                  GitHub Repository URL (optional)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={formData.githubUrl}
                    onChange={(e) => handleChange("githubUrl", e.target.value)}
                    disabled={!isOwner}
                    className={`w-full px-3.5 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border transition-colors focus:outline-none ${
                      errors.githubUrl
                        ? "border-red-400 focus:border-red-500"
                        : "border-[#D8E8E2] dark:border-[#16463D] focus:border-[#159B72]"
                    }`}
                  />
                </div>
                {errors.githubUrl && (
                  <p className="text-[11px] text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.githubUrl}</span>
                  </p>
                )}
              </div>

              {/* Live Demo URL */}
              <div>
                <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                  Live Demo URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.demoUrl}
                  onChange={(e) => handleChange("demoUrl", e.target.value)}
                  disabled={!isOwner}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border transition-colors focus:outline-none ${
                    errors.demoUrl
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#D8E8E2] dark:border-[#16463D] focus:border-[#159B72]"
                  }`}
                />
                {errors.demoUrl && (
                  <p className="text-[11px] text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.demoUrl}</span>
                  </p>
                )}
              </div>

              {/* Documentation URL */}
              <div>
                <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                  Documentation URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://docs..."
                  value={formData.docUrl}
                  onChange={(e) => handleChange("docUrl", e.target.value)}
                  disabled={!isOwner}
                  className={`w-full px-3.5 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border transition-colors focus:outline-none ${
                    errors.docUrl
                      ? "border-red-400 focus:border-red-500"
                      : "border-[#D8E8E2] dark:border-[#16463D] focus:border-[#159B72]"
                  }`}
                />
                {errors.docUrl && (
                  <p className="text-[11px] text-red-500 dark:text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.docUrl}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: TEAM & COLLABORATORS */}
          {activeTab === "team" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider">
                    Project Contributors ({formData.team.length})
                  </h3>
                  <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                    Manage project lead and peer collaborators from the campus directory.
                  </p>
                </div>

                {isOwner && !isAddingMember && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingMember(true);
                      setTimeout(() => {
                        if (searchInputRef.current) searchInputRef.current.focus();
                      }, 100);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#0E825E] text-white transition-all cursor-pointer shadow-2xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Member</span>
                  </button>
                )}
              </div>

              {errors.team && (
                <p className="text-[11px] text-red-500 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.team}</span>
                </p>
              )}

              {/* Inline Add Member Combobox */}
              {isAddingMember && isOwner && (
                <div className="p-3.5 rounded-2xl bg-[#F0F8F5] dark:bg-[#0A2E27] border border-[#159B72]/30 dark:border-[#20D39B]/30 space-y-2.5 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                      Search Student Directory by Name, Roll No, or Username
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsAddingMember(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#658278]" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Type student name (e.g. Priya, Aryan) or Roll No (e.g. 22CS104)..."
                      value={memberSearchQuery}
                      onChange={(e) => {
                        setMemberSearchQuery(e.target.value);
                        setSelectedRosterIndex(0);
                      }}
                      onFocus={() => setMemberSearchFocused(true)}
                      className="w-full pl-9 pr-3.5 py-1.5 rounded-xl text-xs bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
                    />
                  </div>

                  {/* Filtered Candidates List */}
                  <div className="max-h-48 overflow-y-auto rounded-xl border border-[#D8E8E2] dark:border-[#16463D] bg-white dark:bg-[#06241F] divide-y divide-[#E8F1ED] dark:divide-[#10372F]">
                    {candidateRoster.map((candidate, idx) => (
                      <div
                        key={candidate.id}
                        className={`p-2.5 flex items-center justify-between gap-3 text-xs transition-colors ${
                          candidate.isAlreadyMember
                            ? "opacity-60 bg-gray-50/50 dark:bg-[#082A24]/30 cursor-not-allowed"
                            : "hover:bg-emerald-50/50 dark:hover:bg-[#0a352c] cursor-pointer"
                        }`}
                        onClick={() => {
                          if (!candidate.isAlreadyMember) {
                            handleAddTeamMember(candidate);
                          }
                        }}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative w-7 h-7 rounded-full overflow-hidden bg-emerald-100 shrink-0">
                            <Image
                              src={candidate.avatar || "/assets/events/avatars/avatar-1.jpg"}
                              alt={candidate.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                              {candidate.name}
                            </p>
                            <p className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate">
                              {candidate.username} • Roll: {candidate.rollNumber} •{" "}
                              {candidate.branch}
                            </p>
                          </div>
                        </div>

                        {candidate.isAlreadyMember ? (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 shrink-0">
                            Already Added
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#159B72] text-white hover:bg-[#0E825E] shrink-0"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    ))}
                    {candidateRoster.length === 0 && (
                      <div className="p-3 text-center text-xs text-[#658278]">
                        No matching campus students found.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Members List */}
              <div className="space-y-2">
                {formData.team.map((member, idx) => {
                  const isLead = Boolean(member.isLead);
                  return (
                    <div
                      key={member.id || idx}
                      className="p-3 rounded-2xl bg-[#F7FBF9] dark:bg-[#082A24] border border-[#E8F1ED] dark:border-[#10372F] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      {/* Member Info */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-emerald-100 shrink-0 ring-1 ring-emerald-300 dark:ring-emerald-700">
                          <Image
                            src={member.avatar || "/assets/layout/profile-avatar.jpg"}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                              {member.name}
                            </h4>
                            {isLead ? (
                              <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-[#159B72] dark:text-[#20D39B] border border-emerald-300/40">
                                Owner
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 dark:bg-[#0a352c] text-[#55786B] dark:text-[#8FAFA4]">
                                Contributor
                              </span>
                            )}
                          </div>
                          <p className="text-[10.5px] text-[#658278] dark:text-[#789991] truncate">
                            {member.username} {member.rollNumber ? `• ${member.rollNumber}` : ""}
                          </p>
                        </div>
                      </div>

                      {/* Role & Remove Action */}
                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        {isOwner ? (
                          <input
                            type="text"
                            placeholder="Role (e.g. Lead, Backend)"
                            value={member.role || ""}
                            onChange={(e) => handleUpdateMemberRole(idx, e.target.value)}
                            className="px-2.5 py-1 rounded-lg text-xs bg-white dark:bg-[#06241F] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72] w-36 sm:w-44"
                          />
                        ) : (
                          <span className="text-xs font-medium text-[#55786B] dark:text-[#8FAFA4]">
                            {member.role}
                          </span>
                        )}

                        {isOwner && !isLead && (
                          <button
                            type="button"
                            onClick={() => handleRemoveTeamMember(idx)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                            title="Remove collaborator"
                            aria-label={`Remove ${member.name} from project team`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: VISIBILITY & PERMISSIONS */}
          {activeTab === "visibility" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div>
                <h3 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] uppercase tracking-wider mb-1">
                  Project Visibility Settings
                </h3>
                <p className="text-[11px] text-[#658278] dark:text-[#789991] mb-3">
                  Control who can discover, view, and star your project on College OS.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Public Option */}
                  <label
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      formData.visibility === "Public"
                        ? "border-[#159B72] dark:border-[#20D39B] bg-emerald-50/40 dark:bg-emerald-950/30 ring-1 ring-[#159B72]/30"
                        : "border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#082A24] opacity-80"
                    }`}
                  >
                    <input
                      type="radio"
                      name="visibility"
                      value="Public"
                      checked={formData.visibility === "Public"}
                      onChange={(e) => handleChange("visibility", e.target.value)}
                      disabled={!isOwner}
                      className="mt-0.5 text-[#159B72] focus:ring-[#159B72]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#159B72]" />
                        <span>Public Showcase</span>
                      </h4>
                      <p className="text-[11px] text-[#55786B] dark:text-[#8FAFA4] mt-1 leading-relaxed">
                        Visible on your public profile, student search, campus feed, and
                        department showrooms. Open to stars and reviews.
                      </p>
                    </div>
                  </label>

                  {/* Private Option */}
                  <label
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      formData.visibility === "Private"
                        ? "border-[#159B72] dark:border-[#20D39B] bg-emerald-50/40 dark:bg-emerald-950/30 ring-1 ring-[#159B72]/30"
                        : "border-[#D8E8E2] dark:border-[#16463D] bg-[#F7FBF9] dark:bg-[#082A24] opacity-80"
                    }`}
                  >
                    <input
                      type="radio"
                      name="visibility"
                      value="Private"
                      checked={formData.visibility === "Private"}
                      onChange={(e) => handleChange("visibility", e.target.value)}
                      disabled={!isOwner}
                      className="mt-0.5 text-[#159B72] focus:ring-[#159B72]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-[#55786B]" />
                        <span>Private Workspace</span>
                      </h4>
                      <p className="text-[11px] text-[#55786B] dark:text-[#8FAFA4] mt-1 leading-relaxed">
                        Only accessible to you and designated team contributors. Hidden from
                        public searches and campus leaderboards.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* =================================================================== */}
        {/* Modal Sticky Footer Actions                                         */}
        {/* =================================================================== */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#082A24] flex items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-[#658278] dark:text-[#789991]">
            {isDirty ? (
              <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                Unsaved changes
              </span>
            ) : (
              <span>All changes saved</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleRequestClose}
              disabled={isSaving}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#55786B] dark:text-[#8FAFA4] hover:bg-gray-100 dark:hover:bg-[#0A2E27] transition-colors cursor-pointer"
            >
              Cancel
            </button>

            {isOwner && (
              <button
                type="submit"
                form="project-edit-form"
                disabled={isSaving || !isDirty}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer ${
                  isSaving || !isDirty
                    ? "bg-[#159B72]/60 text-white cursor-not-allowed"
                    : "bg-[#159B72] hover:bg-[#087A5B] text-white active:scale-95"
                }`}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Saving Changes...</span>
                  </>
                ) : saveSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* Unsaved Changes Discard Confirmation Overlay                        */}
        {/* =================================================================== */}
        {showDiscardConfirm && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-2xs animate-in fade-in duration-150">
            <div className="w-full max-w-sm p-5 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl space-y-3">
              <h4 className="text-sm font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Discard unsaved edits?
              </h4>
              <p className="text-xs text-[#658278] dark:text-[#789991] leading-relaxed">
                You have modified fields in this project. Discarding will revert to your
                currently saved project information.
              </p>
              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDiscardConfirm(false)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-[#55786B] dark:text-[#8FAFA4] hover:bg-gray-100 dark:hover:bg-[#082A24]"
                >
                  Keep Editing
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDiscard}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
                >
                  Discard Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
