"use client";

import { useState, useEffect, useRef } from "react";
import { Folder, FolderPlus, Trash2, Edit2, Check, X, AlertCircle } from "lucide-react";

export default function ManageCollectionsModal({
  isOpen,
  onClose,
  collections = [],
  onCreateCollection,
  onRenameCollection,
  onDeleteCollection,
  collectionCounts = {},
}) {
  const [newCollectionName, setNewCollectionName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  // Close on Escape & Outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newCollectionName.trim()) {
      setError("Please enter a collection name.");
      return;
    }
    onCreateCollection(newCollectionName.trim());
    setNewCollectionName("");
    setError("");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-2xl bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#082A24]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#159B72] dark:text-[#20D39B]">
              <Folder className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#0B3024] dark:text-[#F1FAF6]">
                Manage Collections
              </h3>
              <p className="text-[11px] text-[#658278] dark:text-[#789991]">
                Organize your bookmarks into personal folders
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* Create New Collection Form */}
          <form onSubmit={handleCreate} className="space-y-2">
            <label className="block text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6]">
              Create New Folder
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newCollectionName}
                onChange={(e) => {
                  setNewCollectionName(e.target.value);
                  setError("");
                }}
                placeholder="e.g. System Design, Placement 2026..."
                className="flex-1 px-3 py-2 text-xs sm:text-sm bg-white dark:bg-[#041D18] border border-[#D8E8E2] dark:border-[#16463D] rounded-xl text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-[#159B72] hover:bg-emerald-700 text-white rounded-xl transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span>Create</span>
              </button>
            </div>
            {error && (
              <p className="text-[11px] text-rose-500 font-medium">{error}</p>
            )}
          </form>

          {/* Existing Collections List */}
          <div>
            <label className="block text-xs font-bold text-[#5C786E] dark:text-[#8AA89F] mb-2 uppercase tracking-wider">
              Existing Folders ({collections.length})
            </label>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {collections.length === 0 ? (
                <p className="text-xs text-[#658278] dark:text-[#789991] py-4 text-center">
                  No custom collections created yet.
                </p>
              ) : (
                collections.map((col) => {
                  const isEditing = editingId === col.id;
                  const count = collectionCounts[col.id] || 0;

                  return (
                    <div
                      key={col.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-[#041D18] border border-[#E8F1ED] dark:border-[#10372F] text-xs"
                    >
                      {isEditing ? (
                        <div className="flex items-center gap-1.5 flex-1 pr-2">
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            className="flex-1 px-2 py-1 text-xs bg-white dark:bg-[#06241F] border border-emerald-400 rounded-lg text-[#0B3024] dark:text-[#F1FAF6] focus:outline-hidden"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveRename(col.id)}
                            className="p-1 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="p-1 text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
                          <Folder className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0" />
                          <span className="font-semibold text-[#0B3024] dark:text-[#F1FAF6] truncate">
                            {col.name}
                          </span>
                          <span className="text-[10.5px] text-[#658278] dark:text-[#789991] shrink-0 bg-white dark:bg-[#06241F] px-1.5 py-0.2 rounded border border-[#D8E8E2] dark:border-[#16463D]">
                            {count} items
                          </span>
                        </div>
                      )}

                      {!isEditing && (
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleStartRename(col)}
                            title="Rename Folder"
                            className="p-1 rounded text-[#658278] dark:text-[#789991] hover:text-[#0B3024] dark:hover:text-[#F1FAF6] hover:bg-white dark:hover:bg-[#06241F] transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteCollection(col.id)}
                            title="Delete Folder (items will be unfiled, not deleted)"
                            className="p-1 rounded text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Safety Notice */}
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-[11px] text-[#5C786E] dark:text-[#8AA89F]">
            <AlertCircle className="w-3.5 h-3.5 text-[#159B72] dark:text-[#20D39B] shrink-0 mt-0.5" />
            <p>
              Deleting a collection removes the folder organization. Your underlying saved items will remain safely in your Saved Hub.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-[#E8F1ED] dark:border-[#10372F] bg-[#F7FBF9] dark:bg-[#082A24] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-[#0B3024] dark:text-[#F1FAF6] bg-white dark:bg-[#06241F] border border-[#D8E8E2] dark:border-[#16463D] rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer shadow-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
