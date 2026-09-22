"use client";

import { useState, useEffect } from "react";
import { X, FolderPlus, Sparkles, Check } from "lucide-react";
import { PROJECT_CATEGORIES, BRANCH_OPTIONS } from "./projectsData";

export default function CreateProjectModal({
  isOpen,
  onClose,
  onSubmit,
  isIdeaMode = false,
}) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Web Development",
    branch: "CSE",
    type: "Team Project",
    membersCount: 3,
    techStack: "",
    description: "",
    githubUrl: "",
    demoUrl: "",
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;

    const techArray = formData.techStack
      ? formData.techStack.split(",").map((s) => s.trim()).filter(Boolean)
      : ["React", "Node.js"];

    const newProject = {
      id: `proj-${Date.now()}`,
      title: formData.title.trim(),
      category: formData.category,
      branch: formData.branch,
      type: formData.type,
      membersCount: parseInt(formData.membersCount, 10) || 1,
      tech: techArray,
      description: formData.description.trim(),
      githubUrl: formData.githubUrl.trim(),
      demoUrl: formData.demoUrl.trim(),
      likes: 1,
      commentsCount: 0,
      comments: [],
      updatedAt: "Just now",
      timestamp: Date.now(),
      author: "Hamid Rza",
      isMyProject: true,
      isTeamProject: formData.type === "Team Project",
      isLiked: true,
      isBookmarked: false,
      iconStyle: "leaf",
      members: [
        {
          name: "Hamid Rza",
          avatar: "/assets/layout/profile-avatar.jpg",
          role: "Lead Creator",
        },
      ],
    };

    onSubmit(newProject, isIdeaMode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl bg-[#FFFFFF] dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E8F1ED] dark:border-[#10372F] flex items-center justify-between bg-[#F7FBF9] dark:bg-[#082A24]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-[#159B72] dark:text-[#20D39B] flex items-center justify-center">
              {isIdeaMode ? <Sparkles className="w-4 h-4" /> : <FolderPlus className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                {isIdeaMode ? "Post a Project Idea" : "Create New Project"}
              </h3>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                {isIdeaMode
                  ? "Share your concept and invite collaborators from campus"
                  : "Showcase your work to students, faculty, and recruiters"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-gray-100 dark:hover:bg-[#082A24]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 max-h-[80vh] overflow-y-auto">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Project Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Campus Event Pulse"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
            />
          </div>

          {/* Category & Branch Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-2.5 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
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
                Target Branch
              </label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-2.5 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
              >
                {BRANCH_OPTIONS.filter((b) => b.value !== "all").map((b) => (
                  <option key={b.value} value={b.value} className="bg-white dark:bg-[#06241F]">
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Type & Members */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Team Format
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-2.5 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
              >
                <option value="Team Project">Team Project</option>
                <option value="Individual">Individual</option>
                <option value="Personal">Personal</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Members Needed
              </label>
              <input
                type="number"
                min="1"
                max="8"
                value={formData.membersCount}
                onChange={(e) => setFormData({ ...formData, membersCount: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
              />
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Tech Stack (Comma Separated)
            </label>
            <input
              type="text"
              placeholder="e.g. Next.js, Node.js, Tailwind, MongoDB"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
              Short Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Provide a 2-3 sentence overview of what your project aims to accomplish..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
            />
          </div>

          {/* GitHub & Demo URLs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Repository URL (optional)
              </label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] mb-1">
                Live Demo (optional)
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={formData.demoUrl}
                onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-[#F7FBF9] dark:bg-[#082A24] text-[#0B3024] dark:text-[#F1FAF6] border border-[#D8E8E2] dark:border-[#16463D] focus:outline-none focus:border-[#159B72]"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-[#E8F1ED] dark:border-[#10372F]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#55786B] dark:text-[#8FAFA4] hover:bg-gray-100 dark:hover:bg-[#082A24]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#159B72] hover:bg-[#087A5B] text-white flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isIdeaMode ? "Post Idea" : "Publish Project"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
