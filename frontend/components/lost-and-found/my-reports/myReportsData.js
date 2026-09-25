// =============================================================================
// College OS — My Reports & Claim Center Data Model & Persistence Store
// Private student workspace for tracking Lost & Found reports and claims.
// =============================================================================

export const MY_REPORTS_STORAGE_KEY = "collegeos_my_reports_tracker";

export const REPORT_STATUS_CONFIG = {
  "Report Submitted": {
    label: "Report Submitted",
    badgeBg: "bg-blue-50 dark:bg-blue-950/40",
    badgeText: "text-blue-700 dark:text-blue-400",
    badgeBorder: "border-blue-200 dark:border-blue-900/60",
    dot: "bg-blue-500",
    stepIndex: 1,
    isNeedsAction: false,
    isOpen: true,
  },
  "Searching": {
    label: "Searching",
    badgeBg: "bg-amber-50 dark:bg-amber-950/40",
    badgeText: "text-amber-700 dark:text-amber-400",
    badgeBorder: "border-amber-200 dark:border-amber-900/60",
    dot: "bg-amber-500",
    stepIndex: 2,
    isNeedsAction: false,
    isOpen: true,
  },
  "Possible Match Found": {
    label: "Possible Match Found",
    badgeBg: "bg-purple-50 dark:bg-purple-950/40",
    badgeText: "text-purple-700 dark:text-purple-300",
    badgeBorder: "border-purple-200 dark:border-purple-900/60",
    dot: "bg-purple-500",
    stepIndex: 3,
    isNeedsAction: true,
    isOpen: true,
  },
  "Claim Submitted": {
    label: "Claim Submitted",
    badgeBg: "bg-sky-50 dark:bg-sky-950/40",
    badgeText: "text-sky-700 dark:text-sky-400",
    badgeBorder: "border-sky-200 dark:border-sky-900/60",
    dot: "bg-sky-500",
    stepIndex: 2,
    isNeedsAction: false,
    isOpen: true,
  },
  "Verification Pending": {
    label: "Verification Pending",
    badgeBg: "bg-amber-50 dark:bg-amber-950/40",
    badgeText: "text-amber-700 dark:text-amber-400",
    badgeBorder: "border-amber-200 dark:border-amber-900/60",
    dot: "bg-amber-500",
    stepIndex: 3,
    isNeedsAction: true,
    isOpen: true,
  },
  "Verification In Progress": {
    label: "Verification In Progress",
    badgeBg: "bg-indigo-50 dark:bg-indigo-950/40",
    badgeText: "text-indigo-700 dark:text-indigo-400",
    badgeBorder: "border-indigo-200 dark:border-indigo-900/60",
    dot: "bg-indigo-500",
    stepIndex: 3,
    isNeedsAction: false,
    isOpen: true,
  },
  "Verified": {
    label: "Ownership Verified",
    badgeBg: "bg-emerald-50 dark:bg-emerald-950/40",
    badgeText: "text-emerald-700 dark:text-emerald-400",
    badgeBorder: "border-emerald-200 dark:border-emerald-900/60",
    dot: "bg-emerald-500",
    stepIndex: 4,
    isNeedsAction: true,
    isOpen: true,
  },
  "Rejected": {
    label: "Claim Not Verified",
    badgeBg: "bg-rose-50 dark:bg-rose-950/40",
    badgeText: "text-rose-700 dark:text-rose-400",
    badgeBorder: "border-rose-200 dark:border-rose-900/60",
    dot: "bg-rose-500",
    stepIndex: 4,
    isNeedsAction: false,
    isOpen: false,
  },
  "Resolved": {
    label: "Resolved",
    badgeBg: "bg-teal-50 dark:bg-teal-950/40",
    badgeText: "text-teal-700 dark:text-teal-400",
    badgeBorder: "border-teal-200 dark:border-teal-900/60",
    dot: "bg-teal-500",
    stepIndex: 5,
    isNeedsAction: false,
    isOpen: false,
  },
  "Cancelled": {
    label: "Cancelled",
    badgeBg: "bg-gray-100 dark:bg-gray-800/60",
    badgeText: "text-gray-600 dark:text-gray-400",
    badgeBorder: "border-gray-200 dark:border-gray-700",
    dot: "bg-gray-400",
    stepIndex: 0,
    isNeedsAction: false,
    isOpen: false,
  },
  "Expired": {
    label: "Expired",
    badgeBg: "bg-stone-100 dark:bg-stone-800/60",
    badgeText: "text-stone-600 dark:text-stone-400",
    badgeBorder: "border-stone-200 dark:border-stone-700",
    dot: "bg-stone-400",
    stepIndex: 0,
    isNeedsAction: false,
    isOpen: false,
  },
};

export const INITIAL_MY_REPORTS = [
  {
    id: "rep-1",
    caseId: "LF-2026-0142",
    linkedItemId: "item-1",
    type: "Lost Report", // "Lost Report" | "Found Report" | "Claim Request"
    itemName: "MacBook Air (M2) – Space Grey",
    category: "Electronics",
    description:
      "Lost my MacBook Air (M2) 13-inch in Space Grey with a matte black hard case and a subtle sticker of 'Vite' on the bottom right palm rest. Last seen on the 2nd floor silent study table in Central Library.",
    location: "Central Library — 2nd Floor Silent Area",
    reportedAt: "18 Aug 2025, 01:30 PM",
    rawReportedAt: "2025-08-18T13:30:00",
    updatedAt: "24 Sep 2026, 03:15 PM",
    rawUpdatedAt: "2026-09-24T15:15:00",
    status: "Possible Match Found",
    claimStatus: "Not Claimed",
    image: "/assets/lost-and-found/items/macbook-air.jpg",
    hasImage: true,
    distinguishingFeatures:
      "Matte black protective shell, Vite sticker on palm rest, tiny scratch near left USB-C port.",
    serialOrReference: "C02G87XXMD6R",
    contactPreference: "College Email",
    canEdit: true,
    canCancel: true,
    needsAction: true,
    actionPrompt: {
      type: "review_match",
      title: "Potential match turned in at Security Desk",
      description: "A Space Grey Apple laptop was turned in at the Central Security Desk. Compare details.",
      actionLabel: "Review Match",
    },
    possibleMatch: {
      matchItemId: "match-item-01",
      publicTitle: "Apple Laptop in Black Sleeve",
      locationFound: "Central Library — Ground Circulation Desk",
      foundDate: "23 Sep 2026",
      custodian: "Campus Central Security",
      notes: "Device is stored locked in safe storage. Student must verify passcode or serial number to claim.",
    },
    timeline: [
      {
        id: "tl-1",
        date: "18 Aug 2025, 01:30 PM",
        title: "Lost Report Submitted",
        description: "Report filed by Hamid Rza for Space Grey MacBook Air (M2).",
        actor: "Hamid Rza (You)",
      },
      {
        id: "tl-2",
        date: "19 Aug 2025, 10:00 AM",
        title: "Report Verified by Desk",
        description: "Campus security acknowledged report and set status to Searching.",
        actor: "Campus Lost & Found Office",
      },
      {
        id: "tl-3",
        date: "24 Sep 2026, 03:15 PM",
        title: "Potential Match Detected",
        description: "A matching device was cataloged at Central Security Desk. Please review details.",
        actor: "Central Security Desk",
      },
    ],
  },
  {
    id: "rep-2",
    caseId: "LF-2026-0098",
    linkedItemId: "item-5",
    type: "Lost Report",
    itemName: "Casio fx-991EX Scientific Calculator",
    category: "Electronics",
    description:
      "Left my Casio fx-991EX ClassWiz calculator in Lecture Hall 3 after the Engineering Mathematics exam. Hand-inscribed 'HR' on back sliding cover with silver permanent marker.",
    location: "Academic Block — Lecture Hall 3",
    reportedAt: "14 Aug 2025, 11:15 AM",
    rawReportedAt: "2025-08-14T11:15:00",
    updatedAt: "20 Sep 2026, 09:30 AM",
    rawUpdatedAt: "2026-09-20T09:30:00",
    status: "Searching",
    claimStatus: "Not Claimed",
    image: "/assets/lost-and-found/items/calculator.jpg",
    hasImage: true,
    distinguishingFeatures: "Initials 'HR' inscribed with silver sharpie on rear protective cover.",
    serialOrReference: "fx-991EX-B0892",
    contactPreference: "College Email",
    canEdit: true,
    canCancel: true,
    needsAction: false,
    timeline: [
      {
        id: "tl-1",
        date: "14 Aug 2025, 11:15 AM",
        title: "Report Submitted",
        description: "Report logged for Casio fx-991EX calculator in Lecture Hall 3.",
        actor: "Hamid Rza (You)",
      },
      {
        id: "tl-2",
        date: "15 Aug 2025, 02:00 PM",
        title: "Classroom Sweep Completed",
        description: "Janitorial staff checked Hall 3 benches. No item recovered on floor sweep.",
        actor: "Facilities Management",
      },
      {
        id: "tl-3",
        date: "20 Sep 2026, 09:30 AM",
        title: "Search Active in Lost & Found Hub",
        description: "Alert set for Casio models logged in Academic Block.",
        actor: "Campus Lost & Found Office",
      },
    ],
  },
  {
    id: "rep-3",
    caseId: "LF-2026-0165",
    linkedItemId: "item-8",
    type: "Claim Request",
    itemName: "Sony Noise Cancelling Headphones",
    category: "Electronics",
    description:
      "Claim request submitted for matte black over-ear wireless headphones with zippered protective travel case found in Academic Block Computer Lab 2.",
    location: "Academic Block — Computer Lab 2",
    reportedAt: "11 Aug 2025, 04:10 PM",
    rawReportedAt: "2025-08-11T16:10:00",
    updatedAt: "23 Sep 2026, 11:45 AM",
    rawUpdatedAt: "2026-09-23T11:45:00",
    status: "Verification Pending",
    claimStatus: "Under Verification",
    claimId: "CLM-2026-0044",
    claimSubmittedAt: "22 Sep 2026, 06:15 PM",
    image: "/assets/lost-and-found/items/headphones.jpg",
    hasImage: true,
    distinguishingFeatures:
      "Custom teal 3.5mm braided aux cable stored inside the mesh pocket of the case, headband cushioned wrap.",
    serialOrReference: "SN: 50819284-WH",
    contactPreference: "College Phone & Email",
    canEdit: true,
    canCancel: true,
    needsAction: true,
    actionPrompt: {
      type: "provide_verification",
      title: "Additional Verification Required",
      description: "Lost & Found staff requested a photo of purchase invoice or Bluetooth device pairing screenshot.",
      actionLabel: "Provide Evidence",
    },
    verification: {
      requiredEvidence: "Bluetooth device MAC / serial or original digital invoice",
      submittedDetails: "Teal braided aux cable inside case pocket. Pairs to 'Hamid’s Phone'.",
      documentName: "invoice_sony_electronics.pdf",
      verifiedBy: null,
      verificationNote: "Review in progress by Custodian Office. Other claim activity exists for this item category.",
      otherClaimActivity: true,
    },
    timeline: [
      {
        id: "tl-1",
        date: "22 Sep 2026, 06:15 PM",
        title: "Claim Submitted",
        description: "Claim filed with proof of ownership details and purchase reference.",
        actor: "Hamid Rza (You)",
      },
      {
        id: "tl-2",
        date: "23 Sep 2026, 11:45 AM",
        title: "Verification Under Review",
        description: "Campus security team is verifying Bluetooth ID and serial number match.",
        actor: "Security Desk Officer",
      },
    ],
  },
  {
    id: "rep-4",
    caseId: "LF-2026-0074",
    linkedItemId: "item-6",
    type: "Claim Request",
    itemName: "Blue North Face Backpack",
    category: "Bags",
    description:
      "Claim request for navy blue backpack left on wooden bench outside Sports Ground complex.",
    location: "Sports Ground — Outdoor Wooden Bench",
    reportedAt: "13 Aug 2025, 05:30 PM",
    rawReportedAt: "2025-08-13T17:30:00",
    updatedAt: "21 Sep 2026, 04:00 PM",
    rawUpdatedAt: "2026-09-21T16:00:00",
    status: "Resolved",
    claimStatus: "Verified",
    claimId: "CLM-2026-0019",
    claimSubmittedAt: "14 Aug 2025, 09:00 AM",
    image: "/assets/lost-and-found/items/blue-backpack.jpg",
    hasImage: true,
    distinguishingFeatures: "Inside zipped pocket contains CS lab notebook with Hamid's student roll number.",
    contactPreference: "College Email",
    canEdit: false,
    canCancel: false,
    needsAction: false,
    resolution: {
      type: "Item Retrieved",
      resolvedAt: "21 Sep 2026, 04:00 PM",
      resolvedBy: "Sports Ground Security Officer",
      notes: "Student Hamid Rza presented valid College ID matching roll number inside notebook. Handed over successfully.",
    },
    timeline: [
      {
        id: "tl-1",
        date: "14 Aug 2025, 09:00 AM",
        title: "Claim Submitted",
        description: "Student filed claim referencing student notebook inside pocket.",
        actor: "Hamid Rza (You)",
      },
      {
        id: "tl-2",
        date: "14 Aug 2025, 01:30 PM",
        title: "Ownership Verified",
        description: "Roll number on notebook matched active college profile.",
        actor: "Security Custodian",
      },
      {
        id: "tl-3",
        date: "21 Sep 2026, 04:00 PM",
        title: "Item Retrieved & Case Resolved",
        description: "Backpack collected from Sports Ground security room.",
        actor: "Hamid Rza (You)",
      },
    ],
  },
  {
    id: "rep-5",
    caseId: "LF-2026-0112",
    linkedItemId: "item-13",
    type: "Found Report",
    itemName: "Black Leather Bi-fold Wallet",
    category: "Accessories",
    description:
      "Found a black leather wallet containing a student metro card, driving license, and campus library pass near Canteen Table 4.",
    location: "Campus Canteen — Table 4 Area",
    reportedAt: "06 Aug 2025, 01:00 PM",
    rawReportedAt: "2025-08-06T13:00:00",
    updatedAt: "19 Sep 2026, 12:00 PM",
    rawUpdatedAt: "2026-09-19T12:00:00",
    status: "Resolved",
    claimStatus: "Verified",
    image: "/assets/lost-and-found/items/black-wallet.jpg",
    hasImage: true,
    distinguishingFeatures: "Contains student metro card and driver's license. No cash disclosed publicly for security.",
    contactPreference: "College Email",
    canEdit: false,
    canCancel: false,
    needsAction: false,
    resolution: {
      type: "Item Returned",
      resolvedAt: "19 Sep 2026, 12:00 PM",
      resolvedBy: "Canteen Operations & Security",
      notes: "Owner verified identity and successfully claimed wallet from Security Counter.",
    },
    timeline: [
      {
        id: "tl-1",
        date: "06 Aug 2025, 01:00 PM",
        title: "Found Report Submitted",
        description: "Hamid Rza deposited wallet at Canteen Help Desk and logged campus report.",
        actor: "Hamid Rza (You)",
      },
      {
        id: "tl-2",
        date: "07 Aug 2025, 11:00 AM",
        title: "Item Surrendered to Central Security",
        description: "Wallet transferred to safe vault at Security Cabin A.",
        actor: "Campus Security Desk",
      },
      {
        id: "tl-3",
        date: "19 Sep 2026, 12:00 PM",
        title: "Owner Reunited & Marked Resolved",
        description: "Case closed after verified owner retrieved item.",
        actor: "Campus Security Desk",
      },
    ],
  },
  {
    id: "rep-6",
    caseId: "LF-2026-0180",
    linkedItemId: "item-9",
    type: "Lost Report",
    itemName: "Hydro Flask Olive Water Bottle (32oz)",
    category: "Others",
    description:
      "Lost my olive green 32oz vacuum insulated Hydro Flask bottle. Has a stainless steel flex cap and a minor dent at the bottom rim.",
    location: "Amphitheater Steps — Middle Tier",
    reportedAt: "10 Aug 2025, 06:00 PM",
    rawReportedAt: "2025-08-10T18:00:00",
    updatedAt: "18 Sep 2026, 02:40 PM",
    rawUpdatedAt: "2026-09-18T14:40:00",
    status: "Report Submitted",
    claimStatus: "Not Claimed",
    image: "/assets/lost-and-found/items/water-bottle.jpg",
    hasImage: true,
    distinguishingFeatures: "Small circular dent on bottom rim, black boot protector removed.",
    contactPreference: "College Email",
    canEdit: true,
    canCancel: true,
    needsAction: false,
    timeline: [
      {
        id: "tl-1",
        date: "10 Aug 2025, 06:00 PM",
        title: "Report Submitted",
        description: "Lost report logged for olive green Hydro Flask.",
        actor: "Hamid Rza (You)",
      },
      {
        id: "tl-2",
        date: "18 Sep 2026, 02:40 PM",
        title: "Automated Weekly Hub Scan",
        description: "No registered matches in canteen or amphitheater lost boxes.",
        actor: "Campus Lost & Found System",
      },
    ],
  },
  {
    id: "rep-7",
    caseId: "LF-2026-0051",
    linkedItemId: "item-10",
    type: "Lost Report",
    itemName: "Ray-Ban Aviator Sunglasses in Leather Case",
    category: "Accessories",
    description:
      "Lost classic gold-frame aviator sunglasses in a brown leather case. Thought I left it in the library reading room, but later found it in my gym locker.",
    location: "Central Library — 1st Floor Reading Room",
    reportedAt: "09 Aug 2025, 03:40 PM",
    rawReportedAt: "2025-08-09T15:40:00",
    updatedAt: "12 Aug 2025, 08:20 PM",
    rawUpdatedAt: "2025-08-12T20:20:00",
    status: "Cancelled",
    claimStatus: "Not Claimed",
    image: "/assets/lost-and-found/items/sunglasses.jpg",
    hasImage: true,
    distinguishingFeatures: "Gold metal frame, polarized green classic G-15 lenses.",
    contactPreference: "College Email",
    canEdit: false,
    canCancel: false,
    needsAction: false,
    resolution: {
      type: "Report Closed",
      resolvedAt: "12 Aug 2025, 08:20 PM",
      resolvedBy: "Hamid Rza (You)",
      notes: "Student located item in private storage and cancelled the report.",
    },
    timeline: [
      {
        id: "tl-1",
        date: "09 Aug 2025, 03:40 PM",
        title: "Lost Report Submitted",
        description: "Report filed for Ray-Ban sunglasses.",
        actor: "Hamid Rza (You)",
      },
      {
        id: "tl-2",
        date: "12 Aug 2025, 08:20 PM",
        title: "Report Cancelled by Student",
        description: "Item found at personal locker. Report closed.",
        actor: "Hamid Rza (You)",
      },
    ],
  },
  {
    id: "rep-8",
    caseId: "LF-2026-0199",
    linkedItemId: "item-11",
    type: "Found Report",
    itemName: "College ID Card & Keys with Green Lanyard",
    category: "Documents",
    description:
      "Found a set of brass room keys with a green college lanyard and a student smart ID card near the main entry security gate turnstiles.",
    location: "Main Gate — Turnstile Entry 2",
    reportedAt: "08 Aug 2025, 09:20 AM",
    rawReportedAt: "2025-08-08T09:20:00",
    updatedAt: "25 Sep 2026, 01:10 PM",
    rawUpdatedAt: "2026-09-25T13:10:00",
    status: "Verification In Progress",
    claimStatus: "Under Verification",
    image: "/assets/lost-and-found/items/id-card.jpg",
    hasImage: true,
    distinguishingFeatures: "Key ring has 2 brass Yale keys and 1 small bicycle lock key with green tape.",
    contactPreference: "College Email",
    canEdit: true,
    canCancel: false,
    needsAction: false,
    timeline: [
      {
        id: "tl-1",
        date: "08 Aug 2025, 09:20 AM",
        title: "Found Report Submitted",
        description: "Item found and surrendered to gate guard. Report logged.",
        actor: "Hamid Rza (You)",
      },
      {
        id: "tl-2",
        date: "25 Sep 2026, 01:10 PM",
        title: "Claim Submitted by Student",
        description: "A student submitted ownership proof. Security verification is underway.",
        actor: "Campus Security Desk",
      },
    ],
  },
];

// Load reports from LocalStorage or seed with INITIAL_MY_REPORTS
export function loadMyReports() {
  if (typeof window === "undefined") {
    return INITIAL_MY_REPORTS;
  }

  try {
    const saved = localStorage.getItem(MY_REPORTS_STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(MY_REPORTS_STORAGE_KEY, JSON.stringify(INITIAL_MY_REPORTS));
      return INITIAL_MY_REPORTS;
    }
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return INITIAL_MY_REPORTS;
    }
    return parsed;
  } catch (err) {
    console.error("Error reading my reports from localStorage:", err);
    return INITIAL_MY_REPORTS;
  }
}

// Save reports to LocalStorage
export function saveMyReports(reports) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(MY_REPORTS_STORAGE_KEY, JSON.stringify(reports));
  } catch (err) {
    console.error("Error saving my reports to localStorage:", err);
  }
}

// Compute dynamic summary metrics
export function computeMyReportsMetrics(reports = []) {
  const total = reports.length;
  const open = reports.filter((r) => {
    const cfg = REPORT_STATUS_CONFIG[r.status];
    return cfg?.isOpen && r.status !== "Resolved" && r.status !== "Cancelled";
  }).length;
  
  const claimsPending = reports.filter(
    (r) => r.type === "Claim Request" || r.claimStatus === "Under Verification" || r.status === "Verification Pending"
  ).length;

  const resolved = reports.filter((r) => r.status === "Resolved").length;

  const actionRequired = reports.filter(
    (r) => r.needsAction || r.status === "Possible Match Found" || r.status === "Verification Pending"
  ).length;

  return { total, open, claimsPending, resolved, actionRequired };
}

// Filter and sort reports
export function filterAndSortMyReports(reports = [], {
  tab = "all", // "all" | "lost" | "found" | "claims" | "resolved" | "needs-action"
  search = "",
  category = "All",
  status = "All",
  sortBy = "recently-updated", // "recently-updated" | "newest" | "oldest" | "recently-resolved"
}) {
  let result = [...reports];

  // 1. Primary Tab Filter
  if (tab === "lost") {
    result = result.filter((r) => r.type === "Lost Report");
  } else if (tab === "found") {
    result = result.filter((r) => r.type === "Found Report");
  } else if (tab === "claims") {
    result = result.filter((r) => r.type === "Claim Request" || (r.claimId && r.claimStatus !== "Not Claimed"));
  } else if (tab === "resolved") {
    result = result.filter((r) => r.status === "Resolved");
  } else if (tab === "needs-action") {
    result = result.filter((r) => r.needsAction || r.status === "Possible Match Found" || r.status === "Verification Pending");
  }

  // 2. Category Filter
  if (category && category !== "All") {
    result = result.filter(
      (r) => r.category?.toLowerCase() === category.toLowerCase()
    );
  }

  // 3. Status Filter
  if (status && status !== "All") {
    if (status === "Open") {
      result = result.filter((r) => {
        const cfg = REPORT_STATUS_CONFIG[r.status];
        return cfg?.isOpen && r.status !== "Resolved" && r.status !== "Cancelled";
      });
    } else if (status === "Needs Action") {
      result = result.filter((r) => r.needsAction || r.status === "Possible Match Found" || r.status === "Verification Pending");
    } else if (status === "Resolved") {
      result = result.filter((r) => r.status === "Resolved");
    } else if (status === "Cancelled") {
      result = result.filter((r) => r.status === "Cancelled");
    } else {
      result = result.filter((r) => r.status?.toLowerCase() === status.toLowerCase());
    }
  }

  // 4. Search Query
  if (search && search.trim() !== "") {
    const q = search.toLowerCase().trim();
    result = result.filter((r) => {
      const matchName = r.itemName?.toLowerCase().includes(q);
      const matchCat = r.category?.toLowerCase().includes(q);
      const matchCase = r.caseId?.toLowerCase().includes(q);
      const matchLoc = r.location?.toLowerCase().includes(q);
      const matchType = r.type?.toLowerCase().includes(q);
      const matchDesc = r.description?.toLowerCase().includes(q);
      return matchName || matchCat || matchCase || matchLoc || matchType || matchDesc;
    });
  }

  // 5. Sorting
  result.sort((a, b) => {
    if (sortBy === "newest") {
      const dateA = new Date(a.rawReportedAt || a.reportedAt || 0).getTime();
      const dateB = new Date(b.rawReportedAt || b.reportedAt || 0).getTime();
      return dateB - dateA;
    }
    if (sortBy === "oldest") {
      const dateA = new Date(a.rawReportedAt || a.reportedAt || 0).getTime();
      const dateB = new Date(b.rawReportedAt || b.reportedAt || 0).getTime();
      return dateA - dateB;
    }
    if (sortBy === "recently-resolved") {
      const dateA = new Date(a.resolution?.resolvedAt || a.rawUpdatedAt || 0).getTime();
      const dateB = new Date(b.resolution?.resolvedAt || b.rawUpdatedAt || 0).getTime();
      return dateB - dateA;
    }
    // Default: "recently-updated"
    const dateA = new Date(a.rawUpdatedAt || a.rawReportedAt || 0).getTime();
    const dateB = new Date(b.rawUpdatedAt || b.rawReportedAt || 0).getTime();
    return dateB - dateA;
  });

  return result;
}
