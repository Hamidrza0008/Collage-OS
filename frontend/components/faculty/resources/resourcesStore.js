"use client";

import {
  INITIAL_RECENT_UPLOADS,
  INITIAL_FOLDERS,
} from "./facultyResourcesData";

const STORAGE_KEY = "college_os_faculty_resources_v1";

const DEFAULT_STATE = {
  uploads: INITIAL_RECENT_UPLOADS,
  folders: INITIAL_FOLDERS,
  downloads: [
    {
      id: "dl-init-1",
      title: "Data Structures & Algorithms - Full Course Notes",
      size: "2.4 MB",
      format: "PDF",
      timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
      category: "study-material",
    },
    {
      id: "dl-init-2",
      title: "Operating System Notes",
      size: "3.4 MB",
      format: "PDF",
      timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
      category: "study-material",
    },
  ],
};

/**
 * Safely reads the persistent resources state from localStorage.
 * Validates and provides fallback defaults if absent or malformed.
 */
export function getStoredResourcesState() {
  if (typeof window === "undefined") {
    return DEFAULT_STATE;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_STATE;
    }

    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) {
      return DEFAULT_STATE;
    }

    return {
      uploads: Array.isArray(parsed.uploads) && parsed.uploads.length > 0 ? parsed.uploads : DEFAULT_STATE.uploads,
      folders: Array.isArray(parsed.folders) && parsed.folders.length > 0 ? parsed.folders : DEFAULT_STATE.folders,
      downloads: Array.isArray(parsed.downloads) ? parsed.downloads : DEFAULT_STATE.downloads,
    };
  } catch (error) {
    console.warn("Error reading College OS faculty resources from localStorage:", error);
    return DEFAULT_STATE;
  }
}

/**
 * Safely persists demo metadata to localStorage.
 * Never stores binary content or unsafe data.
 */
export function saveStoredResourcesState(state) {
  if (typeof window === "undefined") return;

  try {
    const safeData = {
      uploads: Array.isArray(state.uploads) ? state.uploads : [],
      folders: Array.isArray(state.folders) ? state.folders : [],
      downloads: Array.isArray(state.downloads) ? state.downloads.slice(0, 50) : [],
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeData));
  } catch (error) {
    console.warn("Error saving College OS faculty resources to localStorage:", error);
  }
}

/**
 * Helper to record a download event in the demo activity log.
 */
export function recordDemoDownload(resource) {
  const current = getStoredResourcesState();
  const newDownload = {
    id: `dl-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    title: resource.title || "Unknown Resource",
    size: resource.size || "1.0 MB",
    format: resource.format || "PDF",
    category: resource.category || "study-material",
    timestamp: new Date().toISOString(),
  };

  const updatedDownloads = [newDownload, ...current.downloads];
  const newState = {
    ...current,
    downloads: updatedDownloads,
  };

  saveStoredResourcesState(newState);
  return newDownload;
}
