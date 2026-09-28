"use client";

import SavedItemCard from "./SavedItemCard";
import SavedEmptyState from "./SavedEmptyState";

export default function SavedItemsList({
  items = [],
  activeCategory,
  activeCollection,
  collections = [],
  searchQuery,
  onClearSearch,
  onSelectCategory,
  onResetFilters,
  isBulkMode,
  selectedItemIds,
  onToggleSelect,
  onRemove,
  onTogglePin,
  onAssignCollection,
}) {
  if (items.length === 0) {
    return (
      <SavedEmptyState
        activeCategory={activeCategory}
        activeCollection={activeCollection}
        collections={collections}
        searchQuery={searchQuery}
        onClearSearch={onClearSearch}
        onSelectCategory={onSelectCategory}
        onResetFilters={onResetFilters}
      />
    );
  }

  // 3-column grid for projects view; 2-column grid for mixed / others
  const isProjectsView = activeCategory === "projects";
  const gridClasses = isProjectsView
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4.5"
    : "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4.5";

  return (
    <div className={gridClasses}>
      {items.map((item) => (
        <SavedItemCard
          key={item.id}
          item={item}
          isBulkMode={isBulkMode}
          isSelected={selectedItemIds.has(`${item.entityType}:${item.entityId}`)}
          onToggleSelect={() => onToggleSelect(`${item.entityType}:${item.entityId}`)}
          onRemove={onRemove}
          onTogglePin={() => onTogglePin(item.entityType, item.entityId)}
          onAssignCollection={onAssignCollection}
          collections={collections}
        />
      ))}
    </div>
  );
}
