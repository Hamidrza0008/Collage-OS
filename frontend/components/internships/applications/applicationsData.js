// Comprehensive application data model and storage synchronization for Student Applications Tracker

export const APPLICATIONS_STORAGE_KEY = "collegeos_applications_tracker";

export const STATUS_TABS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "interviews", label: "Interviews" },
  { id: "selected", label: "Selected" },
  { id: "rejected", label: "Rejected" },
  { id: "withdrawn", label: "Withdrawn" },
];

export const STATUS_CONFIG = {
  "Draft": {
    label: "Draft",
    variant: "gray",
    bgLight: "bg-gray-100 text-gray-700 border-gray-300",
    bgDark: "dark:bg-gray-800/60 dark:text-gray-300 dark:border-gray-700",
    dot: "bg-gray-400",
    stageIndex: 0,
  },
  "Submitted": {
    label: "Submitted",
    variant: "blue",
    bgLight: "bg-blue-50 text-blue-700 border-blue-200",
    bgDark: "dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
    dot: "bg-blue-500",
    stageIndex: 1,
  },
  "Under Review": {
    label: "Under Review",
    variant: "blue",
    bgLight: "bg-sky-50 text-sky-700 border-sky-200",
    bgDark: "dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800",
    dot: "bg-sky-500",
    stageIndex: 1,
  },
  "Shortlisted": {
    label: "Shortlisted",
    variant: "teal",
    bgLight: "bg-teal-50 text-teal-700 border-teal-200",
    bgDark: "dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800",
    dot: "bg-teal-500",
    stageIndex: 2,
  },
  "Assessment Pending": {
    label: "Assessment Pending",
    variant: "amber",
    bgLight: "bg-amber-50 text-amber-700 border-amber-300",
    bgDark: "dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
    dot: "bg-amber-500",
    stageIndex: 2,
  },
  "Assessment Completed": {
    label: "Assessment Completed",
    variant: "teal",
    bgLight: "bg-teal-50 text-teal-700 border-teal-200",
    bgDark: "dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800",
    dot: "bg-teal-500",
    stageIndex: 2,
  },
  "Interview Scheduled": {
    label: "Interview Scheduled",
    variant: "purple",
    bgLight: "bg-purple-50 text-purple-700 border-purple-200",
    bgDark: "dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
    dot: "bg-purple-500",
    stageIndex: 3,
  },
  "Interview Completed": {
    label: "Interview Completed",
    variant: "purple",
    bgLight: "bg-purple-50 text-purple-700 border-purple-200",
    bgDark: "dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800",
    dot: "bg-purple-500",
    stageIndex: 3,
  },
  "Offer Received": {
    label: "Offer Received 🎉",
    variant: "emerald",
    bgLight: "bg-emerald-50 text-emerald-800 border-emerald-300",
    bgDark: "dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700",
    dot: "bg-emerald-500",
    stageIndex: 4,
  },
  "Selected": {
    label: "Selected 🎉",
    variant: "emerald",
    bgLight: "bg-emerald-50 text-emerald-800 border-emerald-300",
    bgDark: "dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700",
    dot: "bg-emerald-500",
    stageIndex: 4,
  },
  "Waitlisted": {
    label: "Waitlisted",
    variant: "amber",
    bgLight: "bg-amber-50 text-amber-700 border-amber-200",
    bgDark: "dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
    dot: "bg-amber-500",
    stageIndex: 3,
  },
  "Rejected": {
    label: "Closed / Not Selected",
    variant: "rose",
    bgLight: "bg-rose-50 text-rose-700 border-rose-200",
    bgDark: "dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900",
    dot: "bg-rose-500",
    stageIndex: 4,
  },
  "Withdrawn": {
    label: "Withdrawn",
    variant: "gray",
    bgLight: "bg-gray-100 text-gray-700 border-gray-300",
    bgDark: "dark:bg-gray-800/60 dark:text-gray-400 dark:border-gray-700",
    dot: "bg-gray-500",
    stageIndex: 4,
  },
  "Expired / Closed": {
    label: "Expired",
    variant: "gray",
    bgLight: "bg-gray-100 text-gray-600 border-gray-300",
    bgDark: "dark:bg-gray-800/60 dark:text-gray-400 dark:border-gray-700",
    dot: "bg-gray-400",
    stageIndex: 4,
  },
};

export const INITIAL_APPLICATIONS = [
  {
    id: "app-1",
    applicationId: "APP-2026-1042",
    opportunityId: "intern-1",
    opportunityTitle: "Google STEP Internship – Summer 2026",
    type: "Internship",
    company: "Google",
    logoType: "google",
    location: "Bangalore / Hyderabad / Remote",
    workMode: "Hybrid",
    stipend: "₹65,000 / month",
    appliedAt: "15 Sep 2025",
    updatedAt: "24 Sep 2025",
    deadline: "15 Oct 2025",
    status: "Interview Scheduled",
    currentStage: "Interview Round 1",
    nextAction: "Technical Interview with Google Cloud Staff Engineer",
    nextActionDue: "28 Sep 2026 · 11:00 AM",
    withdrawable: true,
    resume: "Hamid_Rza_SWE_Resume_2025.pdf",
    portfolioUrl: "https://hamid.dev",
    githubUrl: "https://github.com/hamidrza0008",
    coverNote: "Passionate about distributed cloud systems, modern React tooling, and scalable campus platforms. Built College OS for 1,200+ students.",
    notes: "Review graph traversal, BST balancing, and system architecture tradeoffs before 28 Sep.",
    interview: {
      type: "Technical Round 1",
      date: "28 Sep 2026",
      time: "11:00 AM - 12:00 PM IST",
      format: "Google Meet",
      interviewer: "SDE III • Google Cloud India",
      prepNotes: "DSA: Graphs & Dynamic Programming. System Design principles.",
    },
    assessment: null,
    timeline: [
      { date: "15 Sep 2025", title: "Application Submitted", description: "Successfully submitted resume and academic transcript via College OS." },
      { date: "19 Sep 2025", title: "Resume Screened", description: "Application passed initial automated & recruiter screening." },
      { date: "24 Sep 2025", title: "Technical Interview Scheduled", description: "Invitation sent for Technical Interview Round 1 on 28 Sep." },
    ],
  },
  {
    id: "app-2",
    applicationId: "APP-2026-1188",
    opportunityId: "intern-2",
    opportunityTitle: "Frontend Engineering Intern",
    type: "Internship",
    company: "Microsoft",
    logoType: "microsoft",
    location: "Hyderabad / Noida",
    workMode: "Hybrid",
    stipend: "₹60,000 / month",
    appliedAt: "18 Sep 2025",
    updatedAt: "23 Sep 2025",
    deadline: "20 Oct 2025",
    status: "Assessment Pending",
    currentStage: "Online Coding Assessment",
    nextAction: "Complete Codility Frontend Coding Assessment",
    nextActionDue: "30 Sep 2026 · 11:59 PM",
    withdrawable: true,
    resume: "Hamid_Rza_SWE_Resume_2025.pdf",
    portfolioUrl: "https://hamid.dev",
    githubUrl: "https://github.com/hamidrza0008",
    coverNote: "Specializing in React, Next.js, and design system performance with accessible components.",
    notes: "Revise vanilla JavaScript event loop and DOM rendering optimization.",
    interview: null,
    assessment: {
      platform: "Codility",
      duration: "90 minutes",
      dueDate: "30 Sep 2026",
      status: "Pending",
      topics: "JavaScript ES6+, React Hooks, Algorithmic Problem Solving",
    },
    timeline: [
      { date: "18 Sep 2025", title: "Application Submitted", description: "Applied for Microsoft IDC University Hiring." },
      { date: "23 Sep 2025", title: "Assessment Link Generated", description: "Codility assessment invite dispatched to applicant email." },
    ],
  },
  {
    id: "app-3",
    applicationId: "APP-2026-1250",
    opportunityId: "intern-3",
    opportunityTitle: "Software Development Engineer Intern",
    type: "Internship",
    company: "Amazon",
    logoType: "amazon",
    location: "Bangalore / Chennai",
    workMode: "On-site",
    stipend: "₹55,000 / month",
    appliedAt: "12 Sep 2025",
    updatedAt: "21 Sep 2025",
    deadline: "05 Nov 2025",
    status: "Under Review",
    currentStage: "Recruiter Resume Review",
    nextAction: "Awaiting recruiter evaluation feedback",
    nextActionDue: "Expected update by 05 Oct",
    withdrawable: true,
    resume: "Hamid_Rza_SWE_Resume_2025.pdf",
    portfolioUrl: "https://hamid.dev",
    githubUrl: "https://github.com/hamidrza0008",
    coverNote: "Built high-performance microservices and API gateways for college management.",
    notes: "University campus drive referral from alumni.",
    interview: null,
    assessment: null,
    timeline: [
      { date: "12 Sep 2025", title: "Application Submitted", description: "Application registered under Student Career Portal." },
      { date: "21 Sep 2025", title: "Moved to University Recruiting Pod", description: "Assigned to India Student Programs hiring committee." },
    ],
  },
  {
    id: "app-4",
    applicationId: "HACK-2026-2041",
    opportunityId: "hack-1",
    opportunityTitle: "Smart India Hackathon 2026",
    type: "Hackathon",
    company: "Ministry of Education & AICTE",
    logoType: "aicte",
    location: "New Delhi / Hybrid",
    workMode: "Hybrid",
    stipend: "₹1,00,000 / Team Prize",
    appliedAt: "05 Sep 2025",
    updatedAt: "22 Sep 2025",
    deadline: "10 Oct 2025",
    status: "Shortlisted",
    currentStage: "Internal Round Qualified",
    nextAction: "Upload Grand Finale Architecture Deck & Prototype Video",
    nextActionDue: "10 Oct 2026 · 06:00 PM",
    withdrawable: false,
    resume: "Team_BinaryBuilders_Proposal.pdf",
    portfolioUrl: "https://college-os.dev",
    githubUrl: "https://github.com/hamidrza0008/collage-os",
    coverNote: "Team Lead for BinaryBuilders. Project: Digital Campus Incident Response & Resource Dispatch.",
    notes: "Finalize hardware simulation demo with team members before Friday.",
    interview: null,
    assessment: null,
    timeline: [
      { date: "05 Sep 2025", title: "Team Registration", description: "Team BinaryBuilders registered with 6 members." },
      { date: "15 Sep 2025", title: "College SPOC Verification", description: "Institutional approval granted by Faculty Mentor." },
      { date: "22 Sep 2025", title: "Nominated for National Grand Finale", description: "Selected among top 3 teams representing university." },
    ],
  },
  {
    id: "app-5",
    applicationId: "HACK-2025-0980",
    opportunityId: "hack-2",
    opportunityTitle: "ETHIndia 2025 Web3 Hackathon",
    type: "Hackathon",
    company: "Devfolio & Ethereum Foundation",
    logoType: "devfolio",
    location: "Bangalore",
    workMode: "On-site",
    stipend: "$50,000+ Prize Pool",
    appliedAt: "28 Aug 2025",
    updatedAt: "20 Sep 2025",
    deadline: "15 Nov 2025",
    status: "Selected",
    currentStage: "Staking & Travel Grant Approved",
    nextAction: "Complete in-person check-in RSVP and travel confirmation",
    nextActionDue: "RSVP due 15 Oct 2026",
    withdrawable: false,
    resume: "Hamid_Rza_Web3_Profile.pdf",
    portfolioUrl: "https://hamid.dev",
    githubUrl: "https://github.com/hamidrza0008",
    coverNote: "Building decentralized academic credential issuance and zero-knowledge proof verification.",
    notes: "Hotel accommodation covered near KTPO convention center.",
    interview: null,
    assessment: null,
    timeline: [
      { date: "28 Aug 2025", title: "Hacker Application Submitted", description: "Submitted proof of work and previous projects." },
      { date: "12 Sep 2025", title: "Peer Review Completed", description: "Review score: 9.4/10." },
      { date: "20 Sep 2025", title: "Acceptance & Hacker Badge Issued", description: "Congratulations! You've been accepted to ETHIndia 2025 with travel grant." },
    ],
  },
  {
    id: "app-6",
    applicationId: "APP-2026-1490",
    opportunityId: "intern-4",
    opportunityTitle: "Product Engineering Fellowship",
    type: "Fellowship",
    company: "Zomato",
    logoType: "zomato",
    location: "Gurugram / Hybrid",
    workMode: "Hybrid",
    stipend: "₹45,000 / month",
    appliedAt: "01 Sep 2025",
    updatedAt: "24 Sep 2025",
    deadline: "15 Sep 2025",
    status: "Offer Received",
    currentStage: "Offer Extended",
    nextAction: "Review and accept formal internship offer letter",
    nextActionDue: "Accept by 02 Oct 2026",
    withdrawable: false,
    resume: "Hamid_Rza_SWE_Resume_2025.pdf",
    portfolioUrl: "https://hamid.dev",
    githubUrl: "https://github.com/hamidrza0008",
    coverNote: "Experience in building consumer-grade responsive web apps and real-time order trackers.",
    notes: "Stipend ₹45,000/mo. Joining date: 15 Jan 2026. Includes cafeteria perks.",
    interview: {
      type: "Founder & VP Discussion",
      date: "22 Sep 2025",
      time: "04:30 PM",
      format: "Google Meet",
      interviewer: "Head of Core Logistics Engineering",
      prepNotes: "Discussion concluded successfully with unanimous offer recommendation.",
    },
    assessment: null,
    timeline: [
      { date: "01 Sep 2025", title: "Application Submitted", description: "Submitted under Fall 2025 Product Fellowship." },
      { date: "10 Sep 2025", title: "Take-home Task Passed", description: "Built dynamic order checkout interface." },
      { date: "22 Sep 2025", title: "Final Round Completed", description: "Technical + Culture fit interview." },
      { date: "24 Sep 2025", title: "Official Offer Letter Issued", description: "Offer letter generated. Valid until 02 Oct." },
    ],
  },
  {
    id: "app-7",
    applicationId: "APP-2026-1512",
    opportunityId: "intern-5",
    opportunityTitle: "Backend Infrastructure Intern",
    type: "Internship",
    company: "Razorpay",
    logoType: "razorpay",
    location: "Bangalore",
    workMode: "Hybrid",
    stipend: "₹50,000 / month",
    appliedAt: "22 Sep 2025",
    updatedAt: "22 Sep 2025",
    deadline: "30 Oct 2025",
    status: "Submitted",
    currentStage: "Application Received",
    nextAction: "No action required — awaiting recruiter review",
    nextActionDue: null,
    withdrawable: true,
    resume: "Hamid_Rza_SWE_Resume_2025.pdf",
    portfolioUrl: "https://hamid.dev",
    githubUrl: "https://github.com/hamidrza0008",
    coverNote: "Interested in payment processing pipelines, idempotent transactions, and Go microservices.",
    notes: "Applied directly through College OS university placement drive.",
    interview: null,
    assessment: null,
    timeline: [
      { date: "22 Sep 2025", title: "Application Submitted", description: "Application received and queued for talent team review." },
    ],
  },
  {
    id: "app-8",
    applicationId: "APP-2026-0810",
    opportunityId: "intern-6",
    opportunityTitle: "Software Engineering Intern – STAR",
    type: "Internship",
    company: "Uber",
    logoType: "uber",
    location: "Hyderabad / Bangalore",
    workMode: "Hybrid",
    stipend: "₹65,000 / month",
    appliedAt: "10 Aug 2025",
    updatedAt: "18 Sep 2025",
    deadline: "01 Sep 2025",
    status: "Rejected",
    currentStage: "Application Concluded",
    nextAction: "No action required — thank you for your application",
    nextActionDue: null,
    withdrawable: false,
    resume: "Hamid_Rza_SWE_Resume_2025.pdf",
    portfolioUrl: "https://hamid.dev",
    githubUrl: "https://github.com/hamidrza0008",
    coverNote: "Applied for Uber Maps & Routing engineering group.",
    notes: "Encouraged to reapply for full-time 2026-2027 batch.",
    interview: null,
    assessment: null,
    timeline: [
      { date: "10 Aug 2025", title: "Application Submitted", description: "Submitted via campus hiring portal." },
      { date: "25 Aug 2025", title: "Online Assessment Completed", description: "HackerRank assessment completed (Score: 82%)." },
      { date: "18 Sep 2025", title: "Application Concluded", description: "Candidate pool filled for this hiring cycle. Kept on file for future roles." },
    ],
  },
  {
    id: "app-9",
    applicationId: "COMP-2025-3310",
    opportunityId: "hack-3",
    opportunityTitle: "Flipkart GRiD 6.0 Challenge",
    type: "Competition",
    company: "Flipkart",
    logoType: "flipkart",
    location: "Virtual",
    workMode: "Remote",
    stipend: "₹3,00,000 / Winner Prize",
    appliedAt: "14 Aug 2025",
    updatedAt: "16 Sep 2025",
    deadline: "20 Sep 2025",
    status: "Assessment Completed",
    currentStage: "Round 1 Evaluation",
    nextAction: "Awaiting Level 2 evaluation results and shortlist announcement",
    nextActionDue: "Announcement on 02 Oct",
    withdrawable: false,
    resume: "Team_Algorithmics_Profile.pdf",
    portfolioUrl: "https://college-os.dev",
    githubUrl: "https://github.com/hamidrza0008",
    coverNote: "Robotics and smart supply-chain path optimization track.",
    notes: "Solved all 3 problem statements in Level 1 E-Commerce challenge.",
    interview: null,
    assessment: {
      platform: "Unstop",
      duration: "60 minutes",
      dueDate: "16 Sep 2025",
      status: "Completed",
      topics: "Algorithms, Graph Optimization, Inventory Management",
    },
    timeline: [
      { date: "14 Aug 2025", title: "Registered for GRiD 6.0", description: "Registered under Engineering Track." },
      { date: "16 Sep 2025", title: "Level 1 Quiz & Coding Completed", description: "Submitted all test cases successfully." },
    ],
  },
  {
    id: "app-10",
    applicationId: "APP-2026-0771",
    opportunityId: "intern-7",
    opportunityTitle: "Mobile Engineering Intern (React Native)",
    type: "Internship",
    company: "Swiggy",
    logoType: "swiggy",
    location: "Bangalore / Remote",
    workMode: "Remote",
    stipend: "₹40,000 / month",
    appliedAt: "20 Aug 2025",
    updatedAt: "15 Sep 2025",
    deadline: "30 Sep 2025",
    status: "Withdrawn",
    currentStage: "Withdrawn by Applicant",
    nextAction: "Application withdrawn — no further action required",
    nextActionDue: null,
    withdrawable: false,
    resume: "Hamid_Rza_Mobile_Resume.pdf",
    portfolioUrl: "https://hamid.dev",
    githubUrl: "https://github.com/hamidrza0008",
    coverNote: "Focused on cross-platform consumer apps.",
    notes: "Withdrawn due to schedule overlap with Google STEP & Zomato fellowship.",
    interview: null,
    assessment: null,
    timeline: [
      { date: "20 Aug 2025", title: "Application Submitted", description: "Submitted via Swiggy early talent careers." },
      { date: "15 Sep 2025", title: "Withdrawn by Candidate", description: "Applicant chose to withdraw this submission." },
    ],
  },
];

/**
 * Load applications from localStorage with sync for applications submitted from /student/internships/[id]
 */
export function loadApplicationsState() {
  if (typeof window === "undefined") {
    return INITIAL_APPLICATIONS;
  }

  try {
    let applications = [...INITIAL_APPLICATIONS];

    // Check main tracker key
    const rawTracker = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    if (rawTracker) {
      const parsedTracker = JSON.parse(rawTracker);
      if (Array.isArray(parsedTracker) && parsedTracker.length > 0) {
        applications = parsedTracker;
      }
    }

    // Check individual `collegeos_app_${id}` keys created from Opportunity Details page
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("collegeos_app_")) {
        const oppId = key.replace("collegeos_app_", "");
        const appRaw = localStorage.getItem(key);
        if (appRaw) {
          try {
            const appData = JSON.parse(appRaw);
            const existingIdx = applications.findIndex(
              (a) => a.opportunityId === oppId || a.id === `app-${oppId}`
            );

            if (existingIdx >= 0) {
              // Update status if modified locally
              if (appData.status && appData.status !== applications[existingIdx].status) {
                applications[existingIdx] = {
                  ...applications[existingIdx],
                  status: appData.status,
                  updatedAt: "Just now",
                };
              }
            } else {
              // Prepend newly submitted opportunity application
              const newApp = {
                id: `app-custom-${oppId}-${Date.now()}`,
                applicationId: appData.applicationId || `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                opportunityId: oppId,
                opportunityTitle: appData.opportunityTitle || "Opportunity Application",
                type: "Internship",
                company: appData.company || "Campus Partner",
                logoType: "default",
                location: "Campus / Remote",
                workMode: "Hybrid",
                stipend: "Competitive",
                appliedAt: appData.submittedAt || "Recently",
                updatedAt: "Just now",
                deadline: "Open",
                status: appData.status || "Submitted",
                currentStage: "Application Under Review",
                nextAction: "Awaiting recruiter response",
                nextActionDue: null,
                withdrawable: true,
                resume: appData.resume || "Hamid_Rza_Resume.pdf",
                portfolioUrl: "https://hamid.dev",
                githubUrl: "https://github.com/hamidrza0008",
                coverNote: appData.coverNote || "Submitted through College OS Opportunity Details.",
                notes: "",
                interview: null,
                assessment: null,
                timeline: [
                  {
                    date: appData.submittedAt || "Recently",
                    title: "Application Submitted",
                    description: "Applied directly through Opportunity Details workspace.",
                  },
                ],
              };
              applications.unshift(newApp);
            }
          } catch {
            // Ignore parse errors on individual keys
          }
        }
      }
    }

    return applications;
  } catch {
    return INITIAL_APPLICATIONS;
  }
}

/**
 * Persist applications list to localStorage and sync corresponding individual keys
 */
export function saveApplicationsState(applications) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(applications));

    // Sync any individual keys for opportunity details page
    applications.forEach((app) => {
      if (app.opportunityId) {
        try {
          const key = `collegeos_app_${app.opportunityId}`;
          const current = localStorage.getItem(key);
          const parsed = current ? JSON.parse(current) : {};
          localStorage.setItem(
            key,
            JSON.stringify({
              ...parsed,
              applicationId: app.applicationId,
              status: app.status,
              submittedAt: app.appliedAt,
            })
          );
        } catch {}
      }
    });
  } catch (err) {
    console.error("Failed to save applications state", err);
  }
}

/**
 * Compute summary statistics from current application list
 */
export function calculateApplicationMetrics(applications = []) {
  const total = applications.length;

  const active = applications.filter((app) =>
    [
      "Submitted",
      "Under Review",
      "Shortlisted",
      "Assessment Pending",
      "Assessment Completed",
      "Interview Scheduled",
      "Interview Completed",
      "Waitlisted",
    ].includes(app.status)
  ).length;

  const interviews = applications.filter((app) =>
    ["Interview Scheduled", "Interview Completed"].includes(app.status)
  ).length;

  const selected = applications.filter((app) =>
    ["Offer Received", "Selected"].includes(app.status)
  ).length;

  const closed = applications.filter((app) =>
    ["Rejected", "Withdrawn", "Expired / Closed"].includes(app.status)
  ).length;

  return {
    total,
    active,
    interviews,
    selected,
    closed,
  };
}

/**
 * Pipeline stages configuration
 */
export function getPipelineStages(application) {
  const isHackathon = application.type === "Hackathon" || application.type === "Competition";

  if (isHackathon) {
    const stages = [
      { name: "Registered", key: "registered" },
      { name: "Team Verified", key: "verified" },
      { name: "Assessment / Screening", key: "screening" },
      { name: "Shortlisted", key: "shortlisted" },
      { name: "Grand Finale", key: "finale" },
    ];

    let currentStep = 0;
    if (application.status === "Selected") currentStep = 4;
    else if (application.status === "Shortlisted") currentStep = 3;
    else if (application.status.includes("Assessment")) currentStep = 2;
    else if (application.status === "Under Review") currentStep = 1;

    return { stages, currentStep, isConcluded: application.status === "Selected" || application.status === "Rejected" };
  }

  const stages = [
    { name: "Submitted", key: "submitted" },
    { name: "Screening", key: "screening" },
    { name: "Assessment", key: "assessment" },
    { name: "Interview", key: "interview" },
    { name: "Decision", key: "decision" },
  ];

  let currentStep = 0;
  if (application.status === "Offer Received" || application.status === "Selected" || application.status === "Rejected") {
    currentStep = 4;
  } else if (application.status.includes("Interview")) {
    currentStep = 3;
  } else if (application.status.includes("Assessment") || application.status === "Shortlisted") {
    currentStep = 2;
  } else if (application.status === "Under Review") {
    currentStep = 1;
  }

  return {
    stages,
    currentStep,
    isConcluded: ["Offer Received", "Selected", "Rejected", "Withdrawn"].includes(application.status),
  };
}
