"use client";

import { useState } from "react";
import { X, Folder, Plus, Trash2, Edit2, Check, FolderHeart } from "lucide-react";

export default function SavedCollectionsModal({
  isOpen = false,
  onClose,
  collections = [],
  collectionCounts = {},
  onCreateCollection,
  onRenameCollection,
  onDeleteCollection,
}) {
  const [newCollectionName, setNewCollectionName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  if (!isOpen) return null;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    onCreateCollection(newCollectionName.trim());
    setNewCollectionName("");
  };

  const handleStartRename = (col) => {
    setEditingId(col.id);
    setEditingName(col.name);
  };

  const handleSaveRename = (id) => {
    if (editingName.trim()) {
      onRenameCollection(id, editingName.trim());
    }
    setEditingId(null);
    setEditingName("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#FFFFFF] dark:bg-[#06241F] rounded-2xl border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl p-5 space-y-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <FolderHeart className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Manage Collections
              </h2>
              <p className="text-xs text-[#55786B] dark:text-[#8FAFA4]">
                Organize your bookmarks into custom folders
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Create Collection Form */}
        <form onSubmit={handleCreate} className="flex gap-2">
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="New collection name (e.g. Hackathons 2026)"
            className="flex-1 h-9 px-3 rounded-xl bg-[#F0F6F3] dark:bg-[#031B17] border border-[#D8E8E2] dark:border-[#10372F] text-xs text-[#0B3024] dark:text-[#F1FAF6] placeholder:text-[#658278] focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={!newCollectionName.trim()}
            className="inline-flex items-center gap-1 px-3 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create</span>
          </button>
        </form>

        {/* Collections List */}
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {collections.length === 0 ? (
            <p className="text-xs text-center py-6 text-[#55786B] dark:text-[#8FAFA4]">
              No custom collections yet. Create one above!
            </p>
          ) : (
            collections.map((col) => {
              const count = collectionCounts[col.id] || 0;
              const isEditing = editingId === col.id;

              return (
                <div
                  key={col.id}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-[#F9FCFA] dark:bg-[#072F27] border border-[#D8E8E2]/60 dark:border-[#16463D]/60"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <Folder className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={editingName}
                        onChange={(e) => setEditingName(e.target.value)}
                        className="flex-1 h-7 px-2 rounded-lg bg-white dark:bg-[#021512] border border-emerald-500 text-xs text-[#0B3024] dark:text-[#F1FAF6] focus:outline-none"
                        autoFocus
                      />
                    ) : (
                      <div className="min-w-0">
                        <span className="text-xs font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate block">
                          {col.name}
                        </span>
                        <span className="text-[10px] text-[#658278] dark:text-[#789991]">
                          {count} {count === 1 ? "item" : "items"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    {isEditing ? (
                      <button
                        type="button"
                        onClick={() => handleSaveRename(col.id)}
                        className="p-1 rounded-lg text-emerald-600 hover:bg-emerald-500/10 cursor-pointer"
                        title="Save rename"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleStartRename(col)}
                        className="p-1 rounded-lg text-[#658278] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                        title="Rename collection"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => onDeleteCollection(col.id)}
                      className="p-1 rounded-lg text-[#658278] hover:text-rose-600 hover:bg-rose-500/10 cursor-pointer"
                      title="Delete collection (items will remain in saved)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Note */}
        <p className="text-[11px] text-[#658278] dark:text-[#789991] pt-1 border-t border-[#D8E8E2]/60 dark:border-[#16463D]/60 leading-normal">
          * Deleting a collection unlinks its tags but keeps all original saved items safe in your library.
        </p>
      </div>
    </div>
  );
}
