"use client";

import { useState } from "react";
import { Award, Plus, Trash2, Edit2, X, AlertCircle, ExternalLink } from "lucide-react";

const ACHIEVEMENT_CATEGORIES = [
  "Hackathon",
  "Certification",
  "Competition",
  "Open Source",
  "Academic",
  "Leadership",
];

export default function EditProfileAchievements({
  achievements = [],
  onChangeAchievements,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    date: "",
    category: "Hackathon",
    description: "",
    url: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const resetForm = () => {
    setFormData({
      title: "",
      issuer: "",
      date: "",
      category: "Hackathon",
      description: "",
      url: "",
    });
    setErrorMsg("");
    setIsAdding(false);
    setEditingId(null);
  };

  const handleStartEdit = (achievement) => {
    setFormData({
      title: achievement.title || "",
      issuer: achievement.issuer || "",
      date: achievement.date || "",
      category: achievement.category || "Hackathon",
      description: achievement.description || "",
      url: achievement.url || "",
    });
    setEditingId(achievement.id);
    setIsAdding(true);
    setErrorMsg("");
  };

  const handleSave = () => {
    setErrorMsg("");
    if (!formData.title.trim()) {
      setErrorMsg("Achievement title is required.");
      return;
    }

    if (editingId) {
      // Update existing
      const updated = achievements.map((ach) =>
        ach.id === editingId
          ? {
              ...ach,
              ...formData,
              title: formData.title.trim(),
              issuer: formData.issuer.trim(),
              date: formData.date.trim(),
              description: formData.description.trim(),
              url: formData.url.trim(),
            }
          : ach
      );
      onChangeAchievements(updated);
    } else {
      // Create new
      const newEntry = {
        id: `ach-${Date.now()}`,
        ...formData,
        title: formData.title.trim(),
        issuer: formData.issuer.trim(),
        date: formData.date.trim(),
        description: formData.description.trim(),
        url: formData.url.trim(),
      };
      onChangeAchievements([...achievements, newEntry]);
    }

    resetForm();
  };

  const handleRemove = (id) => {
    const updated = achievements.filter((ach) => ach.id !== id);
    onChangeAchievements(updated);
    if (editingId === id) resetForm();
  };

  return (
    <div id="section-achievements" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-sm scroll-mt-28 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#06241F] dark:text-white">
            Achievements & Recognition
          </h2>
          <p className="text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 mt-0.5">
            Highlight hackathon wins, professional certifications, and technical awards.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (isAdding) resetForm();
            else setIsAdding(true);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#128360] dark:bg-[#20D39B] dark:hover:bg-[#1bb886] text-white dark:text-[#021512] transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-xs"
        >
          {isAdding ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          <span>{isAdding ? "Cancel" : "Add Achievement"}</span>
        </button>
      </div>

      {/* Add / Edit Form */}
      {isAdding && (
        <div className="p-4 sm:p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#159B72]/30 dark:border-[#20D39B]/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#06241F] dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
              {editingId ? "Edit Achievement" : "Add New Achievement"}
            </h3>
            <button
              type="button"
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                Achievement Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. 1st Place Winner — Smart India Hackathon"
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                Issuer / Organizing Body
              </label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                placeholder="e.g. Ministry of Education / Google GDG"
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-2.5 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72] cursor-pointer"
                >
                  {ACHIEVEMENT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                  Date
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g. Dec 2024"
                  className="w-full px-2.5 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72]"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                Description / Impact
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Briefly describe what you built, criteria met, or certification details."
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                Certificate or Verification URL (optional)
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72]"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-[11px] text-rose-500 flex items-center gap-1 font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errorMsg}
            </p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-3 py-1.5 rounded-xl text-xs text-[#06241F] dark:text-[#D8E8E2] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-[#159B72] hover:bg-[#128360] dark:bg-[#20D39B] dark:hover:bg-[#1bb886] text-white dark:text-[#021512] transition-colors cursor-pointer"
            >
              {editingId ? "Update Achievement" : "Add Achievement"}
            </button>
          </div>
        </div>
      )}

      {/* Achievements List */}
      <div className="space-y-3">
        {achievements.length > 0 ? (
          achievements.map((ach) => (
            <div
              key={ach.id}
              className="p-4 rounded-xl bg-[#F8FAFC]/60 dark:bg-[#021512]/60 border border-[#D8E8E2] dark:border-[#10372F] flex flex-col sm:flex-row sm:items-start justify-between gap-3 group"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-[#06241F] dark:text-white">
                    {ach.title}
                  </span>
                  {ach.category && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#159B72]/10 dark:bg-[#20D39B]/10 text-[#159B72] dark:text-[#20D39B] border border-[#159B72]/20 dark:border-[#20D39B]/20">
                      {ach.category}
                    </span>
                  )}
                  {ach.date && (
                    <span className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60">
                      • {ach.date}
                    </span>
                  )}
                </div>

                {ach.issuer && (
                  <p className="text-[11px] font-medium text-[#159B72] dark:text-[#20D39B]">
                    {ach.issuer}
                  </p>
                )}

                {ach.description && (
                  <p className="text-xs text-[#06241F]/80 dark:text-[#D8E8E2]/80 leading-relaxed">
                    {ach.description}
                  </p>
                )}

                {ach.url && (
                  <a
                    href={ach.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-[#159B72] dark:text-[#20D39B] hover:underline pt-0.5"
                  >
                    <span>View Verification</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 self-start shrink-0 pt-1 sm:pt-0">
                <button
                  type="button"
                  onClick={() => handleStartEdit(ach)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-[#159B72] dark:hover:text-[#20D39B] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  title="Edit achievement"
                  aria-label={`Edit ${ach.title}`}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(ach.id)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Delete achievement"
                  aria-label={`Delete ${ach.title}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-dashed border-[#D8E8E2] dark:border-[#10372F]">
            <Award className="w-8 h-8 text-[#159B72] dark:text-[#20D39B] mx-auto mb-2 opacity-60" />
            <p className="text-xs font-semibold text-[#06241F] dark:text-white">
              No achievements listed yet.
            </p>
            <p className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 mt-0.5">
              Add your certifications and competition awards to highlight your achievements.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
