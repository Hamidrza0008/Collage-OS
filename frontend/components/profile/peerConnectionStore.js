// =============================================================================
// College OS - Peer Connection & Messaging Store (MD-06)
// Provides canonical peer relationship state, demo direct messaging,
// and cross-component live reactive synchronization.
// =============================================================================

import { CANONICAL_STUDENT_ROSTER } from "../projects/projectsStore.js";
import { getPublicStudentProfile } from "./public/publicStudentProfileData.js";

export const CURRENT_STUDENT_ID = "student-1";
export const CURRENT_STUDENT_HANDLE = "@hamidrza";

export const PEER_CONNECTIONS_STORAGE_KEY = "college_os_peer_connections_v1";
export const PEER_MESSAGES_STORAGE_KEY = "college_os_peer_messages_v1";
export const PEER_CONNECTION_UPDATED_EVENT = "college_os_peer_connection_updated";
export const PEER_MESSAGE_SENT_EVENT = "college_os_peer_message_sent";

/**
 * Checks if target ID belongs to the active logged-in student.
 */
export function isSelfStudent(idOrSlug) {
  if (!idOrSlug) return false;
  const normalized = String(idOrSlug).trim().toLowerCase();
  return (
    normalized === CURRENT_STUDENT_ID ||
    normalized === "student-hamid" ||
    normalized === "hamid-rza" ||
    normalized === CURRENT_STUDENT_HANDLE
  );
}

/**
 * Resolves a student from canonical sources (CANONICAL_STUDENT_ROSTER and PUBLIC_STUDENT_PROFILES).
 * Returns null if the target ID is explicitly invalid or not found.
 */
export function resolveTargetStudent(studentOrId) {
  if (!studentOrId) return null;

  if (typeof studentOrId === "object") {
    const id = studentOrId.id || studentOrId.studentId;
    if (!id) return null;

    // Check if explicitly marked as invalid
    const normalizedId = String(id).trim().toLowerCase();
    if (
      normalizedId.startsWith("invalid") ||
      normalizedId.includes("not-found") ||
      normalizedId === "null" ||
      normalizedId === "undefined"
    ) {
      return null;
    }

    const publicProfile = getPublicStudentProfile(id);
    const rosterStudent = CANONICAL_STUDENT_ROSTER.find(
      (s) => s.id === id || s.studentId === id
    );

    return {
      id: id,
      name: studentOrId.name || publicProfile?.name || rosterStudent?.name || "Campus Student",
      username:
        studentOrId.username ||
        publicProfile?.username ||
        rosterStudent?.username ||
        `@student_${id.replace(/[^0-9]/g, "") || "peer"}`,
      avatar:
        studentOrId.avatar ||
        publicProfile?.avatar ||
        rosterStudent?.avatar ||
        "/assets/layout/profile-avatar.jpg",
      headline:
        studentOrId.headline ||
        publicProfile?.headline ||
        rosterStudent?.defaultRole ||
        "Engineering Student",
      department:
        studentOrId.department ||
        publicProfile?.department ||
        rosterStudent?.department ||
        "Computer Science",
      branch: studentOrId.branch || publicProfile?.branch || rosterStudent?.branch || "CSE",
      semester:
        studentOrId.semester ||
        publicProfile?.semester ||
        rosterStudent?.semester ||
        "7th Semester",
      isVerified: Boolean(studentOrId.isVerified ?? publicProfile?.isVerified ?? true),
      college:
        studentOrId.college ||
        publicProfile?.college ||
        "XYZ College of Engineering, Mumbai",
    };
  }

  const normalized = String(studentOrId).trim().toLowerCase();
  if (
    normalized.startsWith("invalid") ||
    normalized.includes("not-found") ||
    normalized === "null" ||
    normalized === "undefined"
  ) {
    return null;
  }

  // 1. Try public student profile resolver
  const publicProfile = getPublicStudentProfile(normalized);
  if (publicProfile) {
    return {
      id: publicProfile.id,
      name: publicProfile.name,
      username: publicProfile.username,
      avatar: publicProfile.avatar || "/assets/layout/profile-avatar.jpg",
      headline: publicProfile.headline,
      department: publicProfile.department,
      branch: publicProfile.branch,
      semester: publicProfile.semester,
      isVerified: Boolean(publicProfile.isVerified),
      college: publicProfile.college,
    };
  }

  // 2. Try canonical student roster
  const rosterStudent = CANONICAL_STUDENT_ROSTER.find(
    (s) => s.id === normalized || s.studentId === normalized
  );
  if (rosterStudent) {
    return {
      id: rosterStudent.id,
      name: rosterStudent.name,
      username: rosterStudent.username,
      avatar: rosterStudent.avatar || "/assets/layout/profile-avatar.jpg",
      headline: rosterStudent.defaultRole,
      department: rosterStudent.department,
      branch: rosterStudent.branch,
      semester: rosterStudent.semester,
      isVerified: true,
      college: "XYZ College of Engineering, Mumbai",
    };
  }

  return null;
}

/**
 * Reads all stored connections from localStorage.
 */
function readStoredConnections() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(PEER_CONNECTIONS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * Saves all connections to localStorage and dispatches an update.
 */
function writeStoredConnections(connections, changedTargetId, newStatus) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PEER_CONNECTIONS_STORAGE_KEY, JSON.stringify(connections));

    // Backwards compatibility with legacy key
    const legacyKey = `collegeos_conn_${changedTargetId}`;
    if (newStatus === "connected") {
      localStorage.setItem(legacyKey, "true");
    } else {
      localStorage.removeItem(legacyKey);
    }

    // Broadcast reactive custom event
    window.dispatchEvent(
      new CustomEvent(PEER_CONNECTION_UPDATED_EVENT, {
        detail: {
          targetStudentId: changedTargetId,
          status: newStatus,
          timestamp: new Date().toISOString(),
        },
      })
    );
  } catch (err) {
    console.error("Failed to persist peer connection:", err);
  }
}

/**
 * Gets the current connection status with a target student:
 * 'not_connected' | 'request_sent' | 'connected' | 'incoming_request'
 */
export function getPeerConnectionStatus(targetStudentId) {
  if (!targetStudentId || isSelfStudent(targetStudentId)) {
    return "not_connected";
  }

  const connections = readStoredConnections();
  const entry = connections[targetStudentId];
  if (entry && entry.status) {
    return entry.status;
  }

  // Fallback to legacy single key if present
  if (typeof window !== "undefined") {
    try {
      const legacyVal = localStorage.getItem(`collegeos_conn_${targetStudentId}`);
      if (legacyVal === "true") {
        return "connected";
      }
    } catch {}
  }

  return "not_connected";
}

/**
 * Sends a connection request to a target peer.
 */
export function sendConnectionRequest(targetStudentId, note = "") {
  if (!targetStudentId || isSelfStudent(targetStudentId)) {
    return { success: false, error: "Cannot connect with yourself." };
  }

  const connections = readStoredConnections();
  connections[targetStudentId] = {
    targetStudentId,
    sourceStudentId: CURRENT_STUDENT_ID,
    status: "request_sent",
    note: String(note || "").trim().slice(0, 300),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  writeStoredConnections(connections, targetStudentId, "request_sent");
  return { success: true, status: "request_sent" };
}

/**
 * Cancels a pending outgoing connection request.
 */
export function cancelConnectionRequest(targetStudentId) {
  if (!targetStudentId) return { success: false };

  const connections = readStoredConnections();
  delete connections[targetStudentId];

  writeStoredConnections(connections, targetStudentId, "not_connected");
  return { success: true, status: "not_connected" };
}

/**
 * Removes an existing connection.
 */
export function removePeerConnection(targetStudentId) {
  if (!targetStudentId) return { success: false };

  const connections = readStoredConnections();
  delete connections[targetStudentId];

  writeStoredConnections(connections, targetStudentId, "not_connected");
  return { success: true, status: "not_connected" };
}

/**
 * Accepts an incoming connection request or instantly establishes connection (demo).
 */
export function acceptPeerConnection(targetStudentId) {
  if (!targetStudentId || isSelfStudent(targetStudentId)) return { success: false };

  const connections = readStoredConnections();
  connections[targetStudentId] = {
    targetStudentId,
    sourceStudentId: CURRENT_STUDENT_ID,
    status: "connected",
    updatedAt: new Date().toISOString(),
  };

  writeStoredConnections(connections, targetStudentId, "connected");
  return { success: true, status: "connected" };
}

/**
 * Subscribes to peer connection changes across the application.
 */
export function subscribeToPeerConnections(callback) {
  if (typeof window === "undefined") return () => {};

  const handleCustom = (e) => {
    callback(e.detail);
  };

  const handleStorage = (e) => {
    if (e.key === PEER_CONNECTIONS_STORAGE_KEY || e.key?.startsWith("collegeos_conn_")) {
      callback({ key: e.key, newValue: e.newValue });
    }
  };

  window.addEventListener(PEER_CONNECTION_UPDATED_EVENT, handleCustom);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(PEER_CONNECTION_UPDATED_EVENT, handleCustom);
    window.removeEventListener("storage", handleStorage);
  };
}

// =============================================================================
// Direct Messaging Store (Local / Demo Architecture)
// =============================================================================

/**
 * Reads all stored messages from localStorage.
 */
function readStoredMessages() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PEER_MESSAGES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Gets conversation messages between current user and target student.
 */
export function getPeerMessages(targetStudentId) {
  if (!targetStudentId) return [];
  const allMessages = readStoredMessages();
  return allMessages.filter(
    (m) =>
      (m.senderId === CURRENT_STUDENT_ID && m.recipientId === targetStudentId) ||
      (m.senderId === targetStudentId && m.recipientId === CURRENT_STUDENT_ID)
  );
}

/**
 * Sends a validated short direct message to a peer in demo mode.
 */
export function sendPeerMessage(targetStudentId, text) {
  if (!targetStudentId || isSelfStudent(targetStudentId)) {
    return { success: false, error: "Cannot message yourself." };
  }

  const trimmed = String(text || "").trim();
  if (!trimmed) {
    return { success: false, error: "Message cannot be empty." };
  }

  if (trimmed.length > 500) {
    return { success: false, error: "Message exceeds maximum length of 500 characters." };
  }

  const allMessages = readStoredMessages();
  const newMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    senderId: CURRENT_STUDENT_ID,
    recipientId: targetStudentId,
    text: trimmed,
    createdAt: new Date().toISOString(),
    isLocalDemo: true,
  };

  allMessages.push(newMessage);

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(PEER_MESSAGES_STORAGE_KEY, JSON.stringify(allMessages));
      window.dispatchEvent(
        new CustomEvent(PEER_MESSAGE_SENT_EVENT, {
          detail: newMessage,
        })
      );
    } catch (err) {
      console.error("Failed to save peer message:", err);
      return { success: false, error: "Could not save message to local storage." };
    }
  }

  return { success: true, message: newMessage };
}
