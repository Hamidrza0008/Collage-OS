"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FolderGit2,
  Star,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Trash2,
  ExternalLink,
  Plus,
  X,
  AlertCircle,
  Check,
} from "lucide-react";

export default function EditProfilePortfolio({
  projects = [],
  onChangeProjects,
}) {
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    tagline: "",
    description: "",
    tags: "",
    githubUrl: "",
    liveUrl: "",
    visibility: "Public",
    isFeatured: false,
  });
  const [formError, setFormError] = useState("");

  const handleToggleFeatured = (projectId) => {
    const updated = projects.map((p) => ({
      ...p,
      isFeatured: p.id === projectId ? !p.isFeatured : false,
    }));
    onChangeProjects(updated);
  };

  const handleChangeVisibility = (projectId, visibility) => {
    const updated = projects.map((p) => {
      if (p.id === projectId) {
        return { ...p, visibility };
      }
      return p;
    });
    onChangeProjects(updated);
  };

  const handleMoveProject = (index, direction) => {
    const newIdx = direction === "up" ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= projects.length) return;

    const copy = [...projects];
    const temp = copy[index];
    copy[index] = copy[newIdx];
    copy[newIdx] = temp;
    onChangeProjects(copy);
  };

  const handleRemoveProject = (projectId) => {
    const updated = projects.filter((p) => p.id !== projectId);
    onChangeProjects(updated);
  };

  const handleSaveNewProject = () => {
    setFormError("");
    if (!newProject.title.trim()) {
      setFormError("Project title is required.");
      return;
    }

    const tagList = newProject.tags
      ? newProject.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : ["React", "JavaScript"];

    const created = {
      id: `proj-${Date.now()}`,
      title: newProject.title.trim(),
      tagline: newProject.tagline.trim() || newProject.title.trim(),
      description: newProject.description.trim() || newProject.tagline.trim(),
      tags: tagList,
      githubUrl: newProject.githubUrl.trim() || null,
      liveUrl: newProject.liveUrl.trim() || null,
      visibility: newProject.visibility || "Public",
      isFeatured: newProject.isFeatured,
      image: null,
    };

    let updated = [...projects];
    if (created.isFeatured) {
      updated = updated.map((p) => ({ ...p, isFeatured: false }));
    }
    updated.push(created);

    onChangeProjects(updated);
    setIsAddingProject(false);
    setNewProject({
      title: "",
      tagline: "",
      description: "",
      tags: "",
      githubUrl: "",
      liveUrl: "",
      visibility: "Public",
      isFeatured: false,
    });
  };

  return (
    <div id="section-portfolio" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-sm scroll-mt-28 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#06241F] dark:text-white">
            Projects & Showcase Portfolio
          </h2>
          <p className="text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 mt-0.5">
            Curate which engineering projects appear on your profile. Mark one project as Featured.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddingProject((prev) => !prev)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#128360] dark:bg-[#20D39B] dark:hover:bg-[#1bb886] text-white dark:text-[#021512] transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-xs"
        >
          {isAddingProject ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          <span>{isAddingProject ? "Cancel" : "Add Project"}</span>
        </button>
      </div>

      {/* Inline Add Project Card */}
      {isAddingProject && (
        <div className="p-4 sm:p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#159B72]/30 dark:border-[#20D39B]/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#06241F] dark:text-white flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
              New Portfolio Project Entry
            </h3>
            <button
              type="button"
              onClick={() => setIsAddingProject(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                Project Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                placeholder="e.g. Distributed Cache Engine"
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                One-Line Tagline
              </label>
              <input
                type="text"
                value={newProject.tagline}
                onChange={(e) => setNewProject({ ...newProject, tagline: e.target.value })}
                placeholder="e.g. In-memory key-value cache built with Go and Raft"
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                Short Description
              </label>
              <textarea
                rows={2}
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Outline what problem this project solves and core architectural highlights."
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                Technologies (comma separated)
              </label>
              <input
                type="text"
                value={newProject.tags}
                onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                placeholder="Go, Raft, Docker, gRPC"
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                Visibility
              </label>
              <select
                value={newProject.visibility}
                onChange={(e) => setNewProject({ ...newProject, visibility: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] cursor-pointer"
              >
                <option value="Public">Public (Visible to everyone)</option>
                <option value="Campus Only">Campus Only</option>
                <option value="Hidden">Hidden (Draft)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                Live Demo URL
              </label>
              <input
                type="url"
                value={newProject.liveUrl}
                onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72]"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <label className="inline-flex items-center gap-2 text-xs font-medium text-[#06241F] dark:text-[#D8E8E2] cursor-pointer">
              <input
                type="checkbox"
                checked={newProject.isFeatured}
                onChange={(e) => setNewProject({ ...newProject, isFeatured: e.target.checked })}
                className="rounded text-[#159B72] focus:ring-[#159B72]"
              />
              <span>Set as Featured Project on Profile</span>
            </label>
          </div>

          {formError && (
            <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {formError}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingProject(false)}
              className="px-3 py-1.5 rounded-xl text-xs text-[#06241F] dark:text-[#D8E8E2] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveNewProject}
              className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#128360] dark:bg-[#20D39B] dark:hover:bg-[#1bb886] text-white dark:text-[#021512] transition-colors cursor-pointer"
            >
              Add to Portfolio
            </button>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-3.5">
        {projects.length > 0 ? (
          projects.map((project, idx) => (
            <div
              key={project.id || idx}
              className={`p-4 rounded-xl border transition-all ${
                project.isFeatured
                  ? "bg-[#159B72]/5 dark:bg-[#20D39B]/5 border-[#159B72]/40 dark:border-[#20D39B]/40 ring-1 ring-[#159B72]/20"
                  : "bg-[#F8FAFC]/60 dark:bg-[#021512]/60 border-[#D8E8E2] dark:border-[#10372F]"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      href={`/student/projects/${project.id}`}
                      className="text-sm font-bold text-[#06241F] dark:text-white hover:text-[#159B72] dark:hover:text-[#20D39B] transition-colors inline-flex items-center gap-1 group"
                      title="View canonical project page"
                    >
                      <span>{project.title}</span>
                      <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                    </Link>

                    {project.isFeatured && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#159B72] text-white dark:bg-[#20D39B] dark:text-[#021512]">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        Featured
                      </span>
                    )}

                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                        project.visibility === "Public"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                          : project.visibility === "Campus Only"
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                          : "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20"
                      }`}
                    >
                      {project.visibility || "Public"}
                    </span>
                  </div>

                  <p className="text-xs text-[#06241F]/80 dark:text-[#D8E8E2]/80 line-clamp-2">
                    {project.description || project.tagline}
                  </p>

                  {/* Tech stack chips */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={`${tag}-${tIdx}`}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white dark:bg-[#06241F] text-[#06241F]/70 dark:text-[#D8E8E2]/70 border border-[#D8E8E2] dark:border-[#10372F]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Controls toolbar */}
                <div className="flex items-center gap-1.5 self-start sm:self-center shrink-0 pt-2 sm:pt-0">
                  {/* Featured Toggle Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(project.id)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                      project.isFeatured
                        ? "bg-[#159B72]/15 text-[#159B72] dark:text-[#20D39B] border-[#159B72]/30"
                        : "bg-white dark:bg-[#06241F] text-[#06241F]/70 dark:text-[#D8E8E2]/70 border-[#D8E8E2] dark:border-[#10372F] hover:text-[#159B72]"
                    }`}
                    title={project.isFeatured ? "Featured on public profile" : "Set as single featured project"}
                  >
                    <Star
                      className={`w-3 h-3 ${
                        project.isFeatured ? "fill-[#159B72] dark:fill-[#20D39B]" : ""
                      }`}
                    />
                    <span>{project.isFeatured ? "Featured" : "Feature"}</span>
                  </button>

                  {/* Visibility selector */}
                  <select
                    value={project.visibility || "Public"}
                    onChange={(e) => handleChangeVisibility(project.id, e.target.value)}
                    className="text-[11px] px-2 py-1 rounded-lg bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white cursor-pointer"
                  >
                    <option value="Public">Public</option>
                    <option value="Campus Only">Campus Only</option>
                    <option value="Hidden">Hidden</option>
                  </select>

                  {/* Reordering */}
                  <div className="flex items-center border border-[#D8E8E2] dark:border-[#10372F] rounded-lg bg-white dark:bg-[#06241F]">
                    <button
                      type="button"
                      onClick={() => handleMoveProject(idx, "up")}
                      disabled={idx === 0}
                      className="p-1 text-gray-400 hover:text-[#159B72] disabled:opacity-30 disabled:hover:text-gray-400 cursor-pointer"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveProject(idx, "down")}
                      disabled={idx === projects.length - 1}
                      className="p-1 text-gray-400 hover:text-[#159B72] disabled:opacity-30 disabled:hover:text-gray-400 cursor-pointer"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => handleRemoveProject(project.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    title="Remove from portfolio"
                    aria-label={`Remove project ${project.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-dashed border-[#D8E8E2] dark:border-[#10372F]">
            <FolderGit2 className="w-8 h-8 text-[#159B72] dark:text-[#20D39B] mx-auto mb-2 opacity-60" />
            <p className="text-xs font-semibold text-[#06241F] dark:text-white">
              No projects added yet.
            </p>
            <p className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 mt-0.5">
              Add your first project above to showcase your engineering work on your public profile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
