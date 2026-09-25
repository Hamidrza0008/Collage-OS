"use client";

import { useState } from "react";
import { Users2, Plus, Trash2, Edit2, X, AlertCircle } from "lucide-react";

export default function EditProfileCampusContributions({
  contributions = [],
  onChangeContributions,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    period: "",
    description: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const resetForm = () => {
    setFormData({
      title: "",
      organization: "",
      period: "",
      description: "",
    });
    setErrorMsg("");
    setIsAdding(false);
    setEditingId(null);
  };

  const handleStartEdit = (item, index) => {
    setFormData({
      title: item.title || "",
      organization: item.organization || "",
      period: item.period || "",
      description: item.description || "",
    });
    setEditingId(item.id || index);
    setIsAdding(true);
  };

  const handleSave = () => {
    setErrorMsg("");
    if (!formData.title.trim()) {
      setErrorMsg("Role or contribution title is required.");
      return;
    }
    if (!formData.organization.trim()) {
      setErrorMsg("Club or organization name is required.");
      return;
    }

    if (editingId !== null) {
      const updated = contributions.map((item, idx) => {
        const idMatch = item.id ? item.id === editingId : idx === editingId;
        if (idMatch) {
          return {
            ...item,
            ...formData,
            title: formData.title.trim(),
            organization: formData.organization.trim(),
            period: formData.period.trim(),
            description: formData.description.trim(),
          };
        }
        return item;
      });
      onChangeContributions(updated);
    } else {
      const newEntry = {
        id: `contrib-${Date.now()}`,
        ...formData,
        title: formData.title.trim(),
        organization: formData.organization.trim(),
        period: formData.period.trim(),
        description: formData.description.trim(),
      };
      onChangeContributions([...contributions, newEntry]);
    }

    resetForm();
  };

  const handleRemove = (indexOrId) => {
    const updated = contributions.filter((item, idx) =>
      item.id ? item.id !== indexOrId : idx !== indexOrId
    );
    onChangeContributions(updated);
    resetForm();
  };

  return (
    <div id="section-contributions" className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] shadow-sm scroll-mt-28 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#D8E8E2]/60 dark:border-[#10372F]/60">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#06241F] dark:text-white">
            Campus Contributions & Leadership
          </h2>
          <p className="text-xs text-[#06241F]/70 dark:text-[#D8E8E2]/70 mt-0.5">
            Showcase your club roles, peer mentorship, volunteering, and event organization.
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
          <span>{isAdding ? "Cancel" : "Add Role"}</span>
        </button>
      </div>

      {/* Form */}
      {isAdding && (
        <div className="p-4 sm:p-5 rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-[#159B72]/30 dark:border-[#20D39B]/30 space-y-4">
          <h3 className="text-xs font-bold text-[#06241F] dark:text-white flex items-center gap-2">
            <Users2 className="w-4 h-4 text-[#159B72] dark:text-[#20D39B]" />
            {editingId !== null ? "Edit Contribution" : "Add Campus Role"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                Role / Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Technical Lead / Peer Mentor"
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                Club / Organization / Event <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. CSI Campus Chapter / Induction Mentorship"
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                Tenure / Period
              </label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                placeholder="e.g. 2023 – Present"
                className="w-full px-3 py-2 rounded-xl text-xs bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#10372F] text-[#06241F] dark:text-white focus:outline-hidden focus:border-[#159B72]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold text-[#06241F] dark:text-[#D8E8E2] mb-1">
                Impact & Key Activities
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Briefly explain what initiatives or workshops you coordinated."
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
              Save Contribution
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-3">
        {contributions.length > 0 ? (
          contributions.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-4 rounded-xl bg-[#F8FAFC]/60 dark:bg-[#021512]/60 border border-[#D8E8E2] dark:border-[#10372F] flex flex-col sm:flex-row sm:items-start justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-[#06241F] dark:text-white">
                    {item.title}
                  </span>
                  <span className="text-xs font-semibold text-[#159B72] dark:text-[#20D39B]">
                    • {item.organization}
                  </span>
                  {item.period && (
                    <span className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60">
                      ({item.period})
                    </span>
                  )}
                </div>

                {item.description && (
                  <p className="text-xs text-[#06241F]/80 dark:text-[#D8E8E2]/80 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1.5 self-start shrink-0 pt-1 sm:pt-0">
                <button
                  type="button"
                  onClick={() => handleStartEdit(item, idx)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-[#159B72] dark:hover:text-[#20D39B] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  title="Edit contribution"
                  aria-label={`Edit ${item.title}`}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id || idx)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                  title="Delete contribution"
                  aria-label={`Delete ${item.title}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center rounded-xl bg-[#F8FAFC] dark:bg-[#021512] border border-dashed border-[#D8E8E2] dark:border-[#10372F]">
            <Users2 className="w-8 h-8 text-[#159B72] dark:text-[#20D39B] mx-auto mb-2 opacity-60" />
            <p className="text-xs font-semibold text-[#06241F] dark:text-white">
              No campus contributions added.
            </p>
            <p className="text-[11px] text-[#06241F]/60 dark:text-[#D8E8E2]/60 mt-0.5">
              Highlight your club leadership, peer mentoring, or volunteer roles.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
