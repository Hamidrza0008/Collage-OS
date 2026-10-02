// Seed data and storage helpers for SP-07: Security & Connected Accounts (Strict Demo Simulation)

export const SECURITY_STORAGE_KEYS = {
  TWO_FACTOR: "college_os_security_settings_v1",
  CONNECTED_ACCOUNTS: "college_os_connected_accounts_v1",
  AUDIT_LOG: "college_os_security_audit_log_v1",
};

export const INITIAL_SECURITY_STATE = {
  twoFactor: {
    enabled: false,
    method: "authenticator", // simulated: "authenticator" | "sms"
    backupCodesGenerated: false,
  },
  password: {
    lastChanged: null,
    statusNotice: "Demo state — authentication backend not connected",
  },
  activeSessions: [
    {
      id: "demo-session-current",
      title: "Demo Session (This Device)",
      deviceType: "Desktop",
      browser: "Chrome",
      os: "Windows",
      status: "Active Demo Session",
      isCurrent: true,
      lastActive: "Active right now (Demo)",
    },
    {
      id: "demo-session-mobile",
      title: "Local Mobile Demo",
      deviceType: "Mobile",
      browser: "Mobile Safari",
      os: "iOS / Android",
      status: "Active Demo Session",
      isCurrent: false,
      lastActive: "Simulated preview",
    },
  ],
  connectedAccounts: [
    {
      id: "google",
      name: "Google Workspace",
      description: "Link for Single Sign-On and Google Classroom integration (Simulated)",
      icon: "google",
      status: "Not Connected",
      connectedAt: null,
      authProviderId: "google.com",
    },
    {
      id: "github",
      name: "GitHub",
      description: "Sync project repositories and developer portfolio (Simulated)",
      icon: "github",
      status: "Not Connected",
      connectedAt: null,
      authProviderId: "github.com",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "Connect professional profile for internship placements (Simulated)",
      icon: "linkedin",
      status: "Not Connected",
      connectedAt: null,
      authProviderId: "linkedin.com",
    },
    {
      id: "microsoft",
      name: "Microsoft 365",
      description: "Sync campus Teams, Outlook calendar, and OneDrive (Simulated)",
      icon: "microsoft",
      status: "Not Connected",
      connectedAt: null,
      authProviderId: "microsoft.com",
    },
  ],
  auditLog: [
    {
      id: "log-1",
      action: "Local demo session initialized",
      category: "Session",
      timestamp: "Today (Demo session start)",
      device: "Local Browser Preview",
      status: "Logged Locally",
    },
    {
      id: "log-2",
      action: "Security environment checked",
      category: "System",
      timestamp: "Simulated preview",
      device: "College OS Client",
      status: "No Backend Active",
    },
  ],
};

export const DEMO_BACKUP_CODES = [
  "COLLEGE-8492-9102",
  "COLLEGE-1934-8219",
  "COLLEGE-7501-4418",
  "COLLEGE-3129-9941",
  "COLLEGE-6402-1184",
  "COLLEGE-5521-3940",
  "COLLEGE-9083-2144",
  "COLLEGE-2481-6705",
];

// Helper to safely load local storage with fallback
export function loadSecurityLocalState() {
  if (typeof window === "undefined") {
    return INITIAL_SECURITY_STATE;
  }

  try {
    const stored2FA = localStorage.getItem(SECURITY_STORAGE_KEYS.TWO_FACTOR);
    const storedAccounts = localStorage.getItem(SECURITY_STORAGE_KEYS.CONNECTED_ACCOUNTS);
    const storedLogs = localStorage.getItem(SECURITY_STORAGE_KEYS.AUDIT_LOG);

    return {
      ...INITIAL_SECURITY_STATE,
      twoFactor: stored2FA ? JSON.parse(stored2FA) : INITIAL_SECURITY_STATE.twoFactor,
      connectedAccounts: storedAccounts
        ? JSON.parse(storedAccounts)
        : INITIAL_SECURITY_STATE.connectedAccounts,
      auditLog: storedLogs ? JSON.parse(storedLogs) : INITIAL_SECURITY_STATE.auditLog,
    };
  } catch (err) {
    console.warn("Failed to load security state from localStorage:", err);
    return INITIAL_SECURITY_STATE;
  }
}

// Helper to append a demo audit log item
export function recordDemoAuditLog(action, category = "Security") {
  if (typeof window === "undefined") return;
  try {
    const existingRaw = localStorage.getItem(SECURITY_STORAGE_KEYS.AUDIT_LOG);
    const existing = existingRaw ? JSON.parse(existingRaw) : INITIAL_SECURITY_STATE.auditLog;
    const newEntry = {
      id: `log-${Date.now()}`,
      action,
      category,
      timestamp: "Just now (Demo)",
      device: "Local Browser Preview",
      status: "Simulated Local Action",
    };
    const updated = [newEntry, ...existing].slice(0, 15);
    localStorage.setItem(SECURITY_STORAGE_KEYS.AUDIT_LOG, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.warn("Failed to persist demo audit log:", err);
    return null;
  }
}
