"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import SavedItemsHeader from "./SavedItemsHeader";
import SavedSummaryCards from "./SavedSummaryCards";
import SavedCategoryTabs from "./SavedCategoryTabs";
import SavedFilterBar from "./SavedFilterBar";
import SavedItemsList from "./SavedItemsList";
import SavedSidebarRail from "./SavedSidebarRail";
import SavedPagination from "./SavedPagination";
import ManageCollectionsModal from "./ManageCollectionsModal";
import {
  getSavedItems,
  getSavedCollections,
  removeSavedItem,
  restoreSavedItem,
  togglePinSavedItem,
  moveItemToCollection,
  bulkRemoveSavedItems,
  bulkMoveToCollection,
  createCollection,
  renameCollection,
  deleteCollection,
  subscribeToSavedChanges,
  migrateLegacyBookmarks,
  resolveAllSavedItems,
  filterAndSortSavedItems,
  calculateSavedMetrics,
  SAVED_CATEGORIES,
} from "./savedItemData";
import { RotateCcw, X, CheckCircle2 } from "lucide-react";

export default function SavedItemsAssembler() {
  // 1. Raw storage states
  const [savedRecords, setSavedRecords] = useState([]);
  const [collections, setCollections] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 2. Filter & Navigation States
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recently-saved");
  const [activeCollection, setActiveCollection] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 3. Bulk Selection States
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState(new Set());

  // 4. Modals and Toast
  const [isManageCollectionsOpen, setIsManageCollectionsOpen] = useState(false);
  const [toast, setToast] = useState(null); // { message, undoItem }

  // Refresh saved items from local storage
  const refreshStore = useCallback(() => {
    const raw = getSavedItems();
    const cols = getSavedCollections();
    setSavedRecords(raw);
    setCollections(cols);
  }, []);

  // Initial Load and Cross-Page Subscription
  useEffect(() => {
    // 1. Run idempotent legacy migration
    migrateLegacyBookmarks();

    // 2. Initial state hydration
    refreshStore();
    setIsInitialized(true);

    // 3. Subscribe to custom event & window storage events
    const unsubscribe = subscribeToSavedChanges(() => {
      refreshStore();
    });

    return () => {
      unsubscribe();
    };
  }, [refreshStore]);

  // Resolve all raw stored items into rich models
  const resolvedItems = useMemo(() => {
    return resolveAllSavedItems(savedRecords);
  }, [savedRecords]);

  // Overall workspace dynamic metrics
  const metrics = useMemo(() => {
    return calculateSavedMetrics(resolvedItems);
  }, [resolvedItems]);

  // Category counts for tab badges
  const categoryCounts = useMemo(() => {
    const counts = { all: resolvedItems.length };
    SAVED_CATEGORIES.forEach((cat) => {
      if (cat.id !== "all" && cat.entityType) {
        counts[cat.id] = resolvedItems.filter((i) => i.entityType === cat.entityType).length;
      }
    });
    return counts;
  }, [resolvedItems]);

  // Collection counts for folder badges
  const collectionCounts = useMemo(() => {
    const counts = {};
    collections.forEach((col) => {
      counts[col.id] = resolvedItems.filter((i) => i.collectionId === col.id).length;
    });
    return counts;
  }, [resolvedItems, collections]);

  // Filtered & Sorted items
  const filteredItems = useMemo(() => {
    return filterAndSortSavedItems(resolvedItems, {
      category: activeCategory,
      searchQuery,
      collectionId: activeCollection,
      sortBy,
    });
  }, [resolvedItems, activeCategory, searchQuery, activeCollection, sortBy]);

  // Recently saved items for right rail (sorted newest first)
  const recentItems = useMemo(() => {
    const copy = [...resolvedItems];
    copy.sort((a, b) => new Date(b.savedAt || 0) - new Date(a.savedAt || 0));
    return copy.slice(0, 4);
  }, [resolvedItems]);

  // Pagination parameters
  // Projects view uses 9 items/page (3-column grid); others use 6 items/page
  const pageSize = activeCategory === "projects" ? 9 : 6;
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));

  // Current page sliced items
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  // Auto-reset page 1 when filters change
  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    setCurrentPage(1);
    setIsBulkMode(false);
    setSelectedItemIds(new Set());
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleCollectionChange = (colId) => {
    setActiveCollection(colId);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setActiveCollection(null);
    setCurrentPage(1);
  };

  // Toast Helper
  const showToast = (message, undoItem = null) => {
    setToast({ message, undoItem });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  // Remove / Unsave Item with Undo
  const handleRemoveItem = (item) => {
    const removed = removeSavedItem(item.entityType, item.entityId);
    refreshStore();
    showToast(`Removed "${item.title}" from saved items`, removed);
  };

  // Undo Remove Action
  const handleUndo = () => {
    if (toast?.undoItem) {
      restoreSavedItem(toast.undoItem);
      refreshStore();
      showToast(`Restored "${toast.undoItem.title}" to saved items`, null);
    }
  };

  // Pin Toggle
  const handleTogglePin = (entityType, entityId) => {
    togglePinSavedItem(entityType, entityId);
    refreshStore();
  };

  // Assign Collection to single item
  const handleAssignCollection = (item, collectionId) => {
    moveItemToCollection(item.entityType, item.entityId, collectionId);
    refreshStore();
    const colName = collections.find((c) => c.id === collectionId)?.name;
    showToast(colName ? `Moved to "${colName}"` : "Removed from collection");
  };

  // Bulk Selection Handlers
  const handleToggleSelect = (itemKey) => {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(itemKey)) {
        next.delete(itemKey);
      } else {
        next.add(itemKey);
      }
      return next;
    });
  };

  const isAllSelected =
    paginatedItems.length > 0 &&
    paginatedItems.every((item) => selectedItemIds.has(`${item.entityType}:${item.entityId}`));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedItemIds(new Set());
    } else {
      const allKeys = new Set(paginatedItems.map((item) => `${item.entityType}:${item.entityId}`));
      setSelectedItemIds(allKeys);
    }
  };

  const handleBulkRemove = () => {
    const keysArray = Array.from(selectedItemIds);
    bulkRemoveSavedItems(keysArray);
    refreshStore();
    setSelectedItemIds(new Set());
    setIsBulkMode(false);
    showToast(`Removed ${keysArray.length} items from saved`);
  };

  const handleBulkMoveToCollection = (colId) => {
    const keysArray = Array.from(selectedItemIds);
    bulkMoveToCollection(keysArray, colId);
    refreshStore();
    setSelectedItemIds(new Set());
    setIsBulkMode(false);
    const colName = collections.find((c) => c.id === colId)?.name;
    showToast(colName ? `Moved ${keysArray.length} items to "${colName}"` : `Unfiled ${keysArray.length} items`);
  };

  // Collections CRUD Handlers
  const handleCreateCollection = (name) => {
    const newCol = createCollection(name);
    refreshStore();
    showToast(`Created collection "${newCol.name}"`);
  };

  const handleRenameCollection = (id, newName) => {
    renameCollection(id, newName);
    refreshStore();
    showToast("Collection renamed");
  };

  const handleDeleteCollection = (id) => {
    const col = collections.find((c) => c.id === id);
    deleteCollection(id);
    if (activeCollection === id) setActiveCollection(null);
    refreshStore();
    showToast(`Folder "${col ? col.name : ""}" deleted. Saved items remain in your hub.`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* 1. Page Header */}
      <SavedItemsHeader
        totalCount={metrics.total}
        isBulkMode={isBulkMode}
        setIsBulkMode={setIsBulkMode}
        selectedCount={selectedItemIds.size}
        onSelectAll={handleSelectAll}
        isAllSelected={isAllSelected}
        onBulkRemove={handleBulkRemove}
        onBulkMoveToCollection={handleBulkMoveToCollection}
        collections={collections}
        onOpenManageCollections={() => setIsManageCollectionsOpen(true)}
        onClearSearch={() => handleSearchChange("")}
        hasActiveSearch={Boolean(searchQuery)}
      />

      {/* 2. Summary Metric Cards */}
      <SavedSummaryCards
        metrics={metrics}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Category Filter Tabs */}
      <SavedCategoryTabs
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        categoryCounts={categoryCounts}
      />

      {/* 4. Desktop Main (2/3) + Sidebar (1/3) Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Main Content Area (≈ 2/3) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Local Filter Bar */}
          <SavedFilterBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            activeCollection={activeCollection}
            onCollectionChange={handleCollectionChange}
            collections={collections}
            filteredCount={filteredItems.length}
          />

          {/* Saved Items List / Grid */}
          <SavedItemsList
            items={paginatedItems}
            activeCategory={activeCategory}
            activeCollection={activeCollection}
            collections={collections}
            searchQuery={searchQuery}
            onClearSearch={() => handleSearchChange("")}
            onSelectCategory={handleSelectCategory}
            onResetFilters={handleResetFilters}
            isBulkMode={isBulkMode}
            selectedItemIds={selectedItemIds}
            onToggleSelect={handleToggleSelect}
            onRemove={handleRemoveItem}
            onTogglePin={handleTogglePin}
            onAssignCollection={handleAssignCollection}
          />

          {/* Pagination */}
          <SavedPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredItems.length}
            pageSize={pageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>

        {/* Right Sidebar Rail (≈ 1/3) */}
        <div className="lg:col-span-4">
          <SavedSidebarRail
            metrics={metrics}
            recentItems={recentItems}
            collections={collections}
            activeCollection={activeCollection}
            onSelectCollection={handleCollectionChange}
            onOpenManageCollections={() => setIsManageCollectionsOpen(true)}
            collectionCounts={collectionCounts}
            onSelectCategory={handleSelectCategory}
          />
        </div>
      </div>

      {/* Manage Collections Modal */}
      <ManageCollectionsModal
        isOpen={isManageCollectionsOpen}
        onClose={() => setIsManageCollectionsOpen(false)}
        collections={collections}
        onCreateCollection={handleCreateCollection}
        onRenameCollection={handleRenameCollection}
        onDeleteCollection={handleDeleteCollection}
        collectionCounts={collectionCounts}
      />

      {/* Action Toast with Undo Capability */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#0B3024] text-white shadow-2xl border border-emerald-600/40 text-xs animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#20D39B] shrink-0" />
          <span className="font-semibold">{toast.message}</span>
          {toast.undoItem && (
            <button
              type="button"
              onClick={handleUndo}
              className="inline-flex items-center gap-1 font-bold text-[#20D39B] hover:text-white px-2 py-0.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 transition-colors cursor-pointer ml-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Undo</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setToast(null)}
            className="p-0.5 text-gray-400 hover:text-white cursor-pointer ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
