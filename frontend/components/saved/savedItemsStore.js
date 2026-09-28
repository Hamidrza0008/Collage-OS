// ─────────────────────────────────────────────────────────────────────────────
// savedItemsStore.js
// Canonical Private Saved-Items & Bookmarks Persistence Store for College OS
// ─────────────────────────────────────────────────────────────────────────────

export const SAVED_STORAGE_KEY = "college_os_saved_items_v1";
export const COLLECTIONS_STORAGE_KEY = "college_os_saved_collections_v1";
export const SAVED_UPDATED_EVENT = "college_os_saved_items_updated";

// Default collections
export const DEFAULT_COLLECTIONS = [
  { id: "col-interview", name: "Interview Prep", icon: "Briefcase", createdAt: "2025-10-01T09:00:00.000Z" },
  { id: "col-hackathons", name: "Hackathons", icon: "Flame", createdAt: "2025-10-02T10:30:00.000Z" },
  { id: "col-projects", name: "Projects to Explore", icon: "FolderGit2", createdAt: "2025-10-03T14:15:00.000Z" },
  { id: "col-notices", name: "Important Notices", icon: "Bell", createdAt: "2025-10-04T16:00:00.000Z" },
];

// Realistic initial seeded saved items (10 items spanning all canonical types)
export const INITIAL_SAVED_ITEMS = [
  {
    id: "save-project-proj-1",
    entityType: "project",
    entityId: "proj-1",
    savedAt: "2025-10-24T10:15:00.000Z",
    updatedAt: "2025-10-24T10:15:00.000Z",
    isPinned: true,
    collectionId: "col-projects",
  },
  {
    id: "save-project-proj-4",
    entityType: "project",
    entityId: "proj-4",
    savedAt: "2025-10-22T14:20:00.000Z",
    updatedAt: "2025-10-22T14:20:00.000Z",
    isPinned: false,
    collectionId: "col-projects",
  },
  {
    id: "save-opportunity-opp-1",
    entityType: "opportunity",
    entityId: "opp-1",
    savedAt: "2025-10-25T08:30:00.000Z",
    updatedAt: "2025-10-25T08:30:00.000Z",
    isPinned: true,
    collectionId: "col-interview",
  },
  {
    id: "save-opportunity-hack-1",
    entityType: "opportunity",
    entityId: "hack-1",
    savedAt: "2025-10-23T11:45:00.000Z",
    updatedAt: "2025-10-23T11:45:00.000Z",
    isPinned: false,
    collectionId: "col-hackathons",
  },
  {
    id: "save-event-ev-1",
    entityType: "event",
    entityId: "ev-1",
    savedAt: "2025-10-26T09:00:00.000Z",
    updatedAt: "2025-10-26T09:00:00.000Z",
    isPinned: false,
    collectionId: "col-hackathons",
  },
  {
    id: "save-notice-not-1",
    entityType: "notice",
    entityId: "not-1",
    savedAt: "2025-10-23T16:30:00.000Z",
    updatedAt: "2025-10-23T16:30:00.000Z",
    isPinned: false,
    collectionId: "col-notices",
  },
  {
    id: "save-assignment-asg-1",
    entityType: "assignment",
    entityId: "asg-1",
    savedAt: "2025-10-24T12:00:00.000Z",
    updatedAt: "2025-10-24T12:00:00.000Z",
    isPinned: false,
    collectionId: null,
  },
  {
    id: "save-feedPost-post-1",
    entityType: "feedPost",
    entityId: "post-1",
    savedAt: "2025-10-26T11:10:00.000Z",
    updatedAt: "2025-10-26T11:10:00.000Z",
    isPinned: false,
    collectionId: null,
  },
  {
    id: "save-community-group-1",
    entityType: "community",
    entityId: "group-1",
    savedAt: "2025-10-20T15:00:00.000Z",
    updatedAt: "2025-10-20T15:00:00.000Z",
    isPinned: false,
    collectionId: null,
  },
  {
    id: "save-course-course-CSE-302",
    entityType: "course",
    entityId: "course-CSE-302",
    savedAt: "2025-10-19T17:40:00.000Z",
    updatedAt: "2025-10-19T17:40:00.000Z",
    isPinned: false,
    collectionId: null,
  },
];

// Helper to safely read from localStorage
function readStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    console.warn(`Error reading localStorage key "${key}":`, err);
    return fallback;
  }
}

// Helper to safely write to localStorage
function writeStorage(key, data) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Error writing to localStorage key "${key}":`, err);
  }
}

// Dispatch event across windows and components
function notifySavedUpdated(detail = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new CustomEvent(SAVED_UPDATED_EVENT, { detail }));
  } catch {
    // ignore
  }
}

/**
 * Perform idempotent legacy migration from existing fragmented keys into canonical store
 */
export function migrateLegacyBookmarks() {
  if (typeof window === "undefined") return;

  const currentItems = getSavedItems();
  const existingSet = new Set(currentItems.map((item) => `${item.entityType}:${item.entityId}`));
  let hasNew = false;
  const migrated = [...currentItems];

  try {
    // 1. Check Opportunity detail saved items: collegeos_saved_opp_${id}
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("collegeos_saved_opp_")) {
        const val = localStorage.getItem(key);
        if (val === "true") {
          const oppId = key.replace("collegeos_saved_opp_", "");
          if (!existingSet.has(`opportunity:${oppId}`)) {
            existingSet.add(`opportunity:${oppId}`);
            migrated.push({
              id: `save-opportunity-${oppId}`,
              entityType: "opportunity",
              entityId: oppId,
              savedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isPinned: false,
              collectionId: null,
            });
            hasNew = true;
          }
        }
      }
    }

    // 2. Check feed interactions: college_os_feed_interactions_v1
    const rawFeed = localStorage.getItem("college_os_feed_interactions_v1");
    if (rawFeed) {
      try {
        const feedInteractions = JSON.parse(rawFeed);
        Object.entries(feedInteractions).forEach(([postId, data]) => {
          if (data && data.isSaved && !existingSet.has(`feedPost:${postId}`)) {
            existingSet.add(`feedPost:${postId}`);
            migrated.push({
              id: `save-feedPost-${postId}`,
              entityType: "feedPost",
              entityId: postId,
              savedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              isPinned: false,
              collectionId: null,
            });
            hasNew = true;
          }
        });
      } catch {
        // ignore
      }
    }

    if (hasNew) {
      writeStorage(SAVED_STORAGE_KEY, migrated);
      notifySavedUpdated({ action: "migration" });
    }
  } catch (err) {
    console.warn("Legacy bookmark migration notice:", err);
  }
}

/**
 * Retrieve all saved items from store (seeded if empty)
 */
export function getSavedItems() {
  if (typeof window === "undefined") return INITIAL_SAVED_ITEMS;

  const raw = localStorage.getItem(SAVED_STORAGE_KEY);
  if (!raw) {
    // Seed initial items on first access
    writeStorage(SAVED_STORAGE_KEY, INITIAL_SAVED_ITEMS);
    return INITIAL_SAVED_ITEMS;
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_SAVED_ITEMS;
  } catch {
    return INITIAL_SAVED_ITEMS;
  }
}

/**
 * Check whether a specific entity is saved
 */
export function isSaved(entityType, entityId) {
  if (!entityType || !entityId) return false;
  // Normalize course ID check
  const normalizedId = entityType === "course" && !entityId.startsWith("course-") 
    ? `course-${entityId}` 
    : entityId;
  const items = getSavedItems();
  return items.some((item) => item.entityType === entityType && item.entityId === normalizedId);
}

/**
 * Save an entity
 */
export function saveItem(entityType, entityId, options = {}) {
  if (!entityType || !entityId) return null;
  const normalizedId = entityType === "course" && !entityId.startsWith("course-") 
    ? `course-${entityId}` 
    : entityId;

  const items = getSavedItems();
  const existingIdx = items.findIndex(
    (item) => item.entityType === entityType && item.entityId === normalizedId
  );

  const now = new Date().toISOString();

  if (existingIdx >= 0) {
    // Already saved, optionally update collection/pinned
    const updated = [...items];
    updated[existingIdx] = {
      ...updated[existingIdx],
      updatedAt: now,
      ...(options.collectionId !== undefined ? { collectionId: options.collectionId } : {}),
      ...(options.isPinned !== undefined ? { isPinned: options.isPinned } : {}),
    };
    writeStorage(SAVED_STORAGE_KEY, updated);
    syncLegacyKey(entityType, normalizedId, true);
    notifySavedUpdated({ entityType, entityId: normalizedId, isSaved: true });
    return updated[existingIdx];
  }

  const newItem = {
    id: `save-${entityType}-${normalizedId}`,
    entityType,
    entityId: normalizedId,
    savedAt: now,
    updatedAt: now,
    isPinned: Boolean(options.isPinned),
    collectionId: options.collectionId || null,
  };

  const updated = [newItem, ...items];
  writeStorage(SAVED_STORAGE_KEY, updated);
  syncLegacyKey(entityType, normalizedId, true);
  notifySavedUpdated({ entityType, entityId: normalizedId, isSaved: true });
  return newItem;
}

/**
 * Remove an entity from saved items
 */
export function removeSavedItem(entityType, entityId) {
  if (!entityType || !entityId) return null;
  const normalizedId = entityType === "course" && !entityId.startsWith("course-") 
    ? `course-${entityId}` 
    : entityId;

  const items = getSavedItems();
  const removedItem = items.find(
    (item) => item.entityType === entityType && item.entityId === normalizedId
  );
  if (!removedItem) return null;

  const updated = items.filter(
    (item) => !(item.entityType === entityType && item.entityId === normalizedId)
  );

  writeStorage(SAVED_STORAGE_KEY, updated);
  syncLegacyKey(entityType, normalizedId, false);
  notifySavedUpdated({ entityType, entityId: normalizedId, isSaved: false, removedItem });
  return removedItem;
}

/**
 * Toggle saved status for an entity
 */
export function toggleSavedItem(entityType, entityId, options = {}) {
  if (isSaved(entityType, entityId)) {
    const removed = removeSavedItem(entityType, entityId);
    return { isSaved: false, item: removed };
  } else {
    const added = saveItem(entityType, entityId, options);
    return { isSaved: true, item: added };
  }
}

/**
 * Toggle pinned status of an existing saved item
 */
export function togglePinSavedItem(entityType, entityId) {
  const normalizedId = entityType === "course" && !entityId.startsWith("course-") 
    ? `course-${entityId}` 
    : entityId;

  const items = getSavedItems();
  const updated = items.map((item) => {
    if (item.entityType === entityType && item.entityId === normalizedId) {
      return { ...item, isPinned: !item.isPinned, updatedAt: new Date().toISOString() };
    }
    return item;
  });
  writeStorage(SAVED_STORAGE_KEY, updated);
  notifySavedUpdated({ entityType, entityId: normalizedId });
}

/**
 * Move or assign an item to a collection
 */
export function moveItemToCollection(entityType, entityId, collectionId) {
  const normalizedId = entityType === "course" && !entityId.startsWith("course-") 
    ? `course-${entityId}` 
    : entityId;

  const items = getSavedItems();
  const updated = items.map((item) => {
    if (item.entityType === entityType && item.entityId === normalizedId) {
      return { ...item, collectionId: collectionId || null, updatedAt: new Date().toISOString() };
    }
    return item;
  });
  writeStorage(SAVED_STORAGE_KEY, updated);
  notifySavedUpdated({ entityType, entityId: normalizedId, collectionId });
}

/**
 * Bulk remove saved items
 */
export function bulkRemoveSavedItems(itemKeys) {
  // itemKeys: Array of `${entityType}:${entityId}`
  if (!Array.isArray(itemKeys) || itemKeys.length === 0) return [];
  const keySet = new Set(itemKeys);
  const items = getSavedItems();

  const removedItems = items.filter((item) => keySet.has(`${item.entityType}:${item.entityId}`));
  const remainingItems = items.filter((item) => !keySet.has(`${item.entityType}:${item.entityId}`));

  writeStorage(SAVED_STORAGE_KEY, remainingItems);

  removedItems.forEach((item) => {
    syncLegacyKey(item.entityType, item.entityId, false);
  });

  notifySavedUpdated({ action: "bulkRemove", count: removedItems.length });
  return removedItems;
}

/**
 * Bulk move items to collection
 */
export function bulkMoveToCollection(itemKeys, collectionId) {
  if (!Array.isArray(itemKeys) || itemKeys.length === 0) return;
  const keySet = new Set(itemKeys);
  const items = getSavedItems();

  const updated = items.map((item) => {
    if (keySet.has(`${item.entityType}:${item.entityId}`)) {
      return { ...item, collectionId: collectionId || null, updatedAt: new Date().toISOString() };
    }
    return item;
  });

  writeStorage(SAVED_STORAGE_KEY, updated);
  notifySavedUpdated({ action: "bulkMove", collectionId });
}

/**
 * Restore an item (used by Undo)
 */
export function restoreSavedItem(item) {
  if (!item || !item.entityType || !item.entityId) return;
  const items = getSavedItems();
  const exists = items.some(
    (existing) => existing.entityType === item.entityType && existing.entityId === item.entityId
  );
  if (!exists) {
    const updated = [item, ...items];
    writeStorage(SAVED_STORAGE_KEY, updated);
    syncLegacyKey(item.entityType, item.entityId, true);
    notifySavedUpdated({ entityType: item.entityType, entityId: item.entityId, isSaved: true });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// COLLECTIONS / FOLDERS API
// ─────────────────────────────────────────────────────────────────────────────

export function getSavedCollections() {
  if (typeof window === "undefined") return DEFAULT_COLLECTIONS;
  const raw = localStorage.getItem(COLLECTIONS_STORAGE_KEY);
  if (!raw) {
    writeStorage(COLLECTIONS_STORAGE_KEY, DEFAULT_COLLECTIONS);
    return DEFAULT_COLLECTIONS;
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_COLLECTIONS;
  } catch {
    return DEFAULT_COLLECTIONS;
  }
}

export function createCollection(name) {
  if (!name || !name.trim()) return null;
  const cleanName = name.trim();
  const collections = getSavedCollections();
  const id = `col-${Date.now()}`;
  const newCol = {
    id,
    name: cleanName,
    icon: "Folder",
    createdAt: new Date().toISOString(),
  };
  const updated = [...collections, newCol];
  writeStorage(COLLECTIONS_STORAGE_KEY, updated);
  notifySavedUpdated({ action: "collectionCreated", collection: newCol });
  return newCol;
}

export function renameCollection(id, newName) {
  if (!id || !newName || !newName.trim()) return;
  const collections = getSavedCollections();
  const updated = collections.map((col) =>
    col.id === id ? { ...col, name: newName.trim() } : col
  );
  writeStorage(COLLECTIONS_STORAGE_KEY, updated);
  notifySavedUpdated({ action: "collectionRenamed", id, newName });
}

export function deleteCollection(id) {
  if (!id) return;
  const collections = getSavedCollections();
  const remaining = collections.filter((col) => col.id !== id);
  writeStorage(COLLECTIONS_STORAGE_KEY, remaining);

  // Deleting a collection removes the association, but does NOT delete the saved items
  const items = getSavedItems();
  const updatedItems = items.map((item) =>
    item.collectionId === id ? { ...item, collectionId: null } : item
  );
  writeStorage(SAVED_STORAGE_KEY, updatedItems);
  notifySavedUpdated({ action: "collectionDeleted", id });
}

// ─────────────────────────────────────────────────────────────────────────────
// SYNCHRONIZATION & LISTENER HELPERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Synchronize legacy localStorage keys for backward compatibility
 */
function syncLegacyKey(entityType, entityId, isSavedBool) {
  if (typeof window === "undefined") return;
  try {
    if (entityType === "opportunity") {
      const legacyKey = `collegeos_saved_opp_${entityId}`;
      if (isSavedBool) {
        localStorage.setItem(legacyKey, "true");
      } else {
        localStorage.removeItem(legacyKey);
      }
    } else if (entityType === "feedPost") {
      const raw = localStorage.getItem("college_os_feed_interactions_v1");
      const interactions = raw ? JSON.parse(raw) : {};
      interactions[entityId] = { ...(interactions[entityId] || {}), isSaved: isSavedBool };
      localStorage.setItem("college_os_feed_interactions_v1", JSON.stringify(interactions));
    }
  } catch {
    // Ignore legacy sync failures
  }
}

/**
 * Subscribe to saved state changes across components and browser windows
 */
export function subscribeToSavedChanges(callback) {
  if (typeof window === "undefined") return () => {};

  const handleCustomEvent = (e) => {
    callback(e.detail);
  };

  const handleStorageEvent = (e) => {
    if (e.key === SAVED_STORAGE_KEY || e.key === COLLECTIONS_STORAGE_KEY) {
      callback({ action: "storageSync" });
    }
  };

  window.addEventListener(SAVED_UPDATED_EVENT, handleCustomEvent);
  window.addEventListener("storage", handleStorageEvent);

  return () => {
    window.removeEventListener(SAVED_UPDATED_EVENT, handleCustomEvent);
    window.removeEventListener("storage", handleStorageEvent);
  };
}
