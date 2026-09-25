import { ALL_NOTICES } from "../noticesData";

export const DETAILED_NOTICES = {
  "not-1": {
    id: "not-1",
    referenceNumber: "COS/ADM/2025/0818",
    title: "College Reopens for Odd Semester 2025 – Comprehensive Academic Guidelines",
    subtitle: "Mandatory reporting, orientation schedule, laboratory slot allotment, and campus conduct regulations.",
    type: "Academic Circular",
    category: "Important",
    categoryType: "important",
    priority: "High",
    department: "Office of the Principal",
    publishedAt: "18 Aug 2025, 09:30 AM",
    effectiveFrom: "18 Aug 2025",
    deadline: "25 Aug 2025",
    audience: "All Undergraduate & Postgraduate Students, Faculty & Staff",
    requiresAcknowledgement: true,
    isRead: false,
    isAcknowledged: false,
    pinned: true,
    status: "Active",
    author: {
      name: "Dr. Alok Nath Mukherjee",
      designation: "Principal & Academic Dean",
      department: "Administrative Directorate",
      officeLocation: "Administrative Block, Room 101",
      email: "principal.office@collegeos.edu",
      phone: "+91 22 2654 3000 (Ext. 101)",
      officeHours: "Monday – Friday, 02:00 PM – 04:00 PM",
    },
    sections: [
      {
        heading: "1. Official Commencement & Reporting",
        content: `This is to formally notify all students of College OS University that the Odd Semester (Academic Year 2025–2026) officially commences on Monday, 18th August 2025. All academic divisions including Computer Engineering, Information Technology, Electronics, and Mechanical Engineering will initiate classroom instruction in according with the approved Master Timetable.`,
      },
      {
        heading: "2. Orientation & Laboratory Allocation",
        content: `Orientation sessions for new semester electives and honors minors will take place during the first three instructional days. Students are required to verify their batch allotments for software laboratories and specialized hardware workshops via the Academic Portal before Wednesday, 20th August 2025.`,
        bullets: [
          "Attendance in the inaugural week is strictly monitored (minimum 85% requirement applies from Day 1).",
          "Elective change requests must be submitted through the Department Academic Advisor before 22nd August 2025, 5:00 PM.",
          "Hostel residents must report to their respective block wardens and complete biometric check-in by Sunday, 17th August 2025.",
        ],
      },
      {
        heading: "3. Campus Entry & ID Card Protocols",
        content: `Physical or validated digital College OS Smart ID Cards are strictly mandatory at all campus transit gates (North Gate, South Gate, and Central Academic Atrium). Students failing to produce verified credentials will not be permitted into academic wings or library reading halls.`,
      },
    ],
    tableData: {
      title: "Key Milestone Dates – Odd Semester 2025",
      columns: ["Milestone Event", "Applicable Batches", "Date & Time", "Venue / Mode"],
      rows: [
        ["Classroom Instruction Begins", "All Semesters (3, 5, 7)", "18 Aug 2025, 09:00 AM", "Respective Lecture Halls"],
        ["Elective Slot Freezing", "Semesters 5 & 7", "22 Aug 2025, 05:00 PM", "Student ERP Portal"],
        ["First Attendance Review", "All Departments", "05 Sep 2025", "Department Notice Boards"],
        ["Mid-Semester Examination", "All B.Tech Programs", "15 Sep – 22 Sep 2025", "Examination Block A & B"],
      ],
    },
    callout: {
      type: "important",
      title: "Mandatory Student Acknowledgement",
      text: "Every registered student must submit an electronic acknowledgement verifying they have read and agreed to abide by the 2025–26 Academic Integrity Code and Attendance Policy.",
    },
    files: [
      {
        id: "f-101",
        name: "Academic_Calendar_Odd_Sem_2025.pdf",
        type: "PDF Document",
        size: "2.4 MB",
        uploadedAt: "18 Aug 2025",
        pageCount: 6,
        description: "Official 2025-2026 semester calendar with holiday lists, instructional periods, and exam weeks.",
      },
      {
        id: "f-102",
        name: "Orientation_Schedule_Notice.pdf",
        type: "PDF Document",
        size: "1.1 MB",
        uploadedAt: "18 Aug 2025",
        pageCount: 3,
        description: "Department-wise schedule of lab orientations and faculty advisor office hours.",
      },
    ],
    relatedNoticeIds: ["not-2", "not-5", "not-6"],
  },

  "not-2": {
    id: "not-2",
    referenceNumber: "COS/EXAM/2025/1104",
    title: "Mid-Semester Examination Schedule & Regulations – Autumn 2025",
    subtitle: "Complete timetable, seating arrangement protocols, hall ticket issuance, and examination hall code of conduct.",
    type: "Examination Circular",
    category: "Exam",
    categoryType: "exam",
    priority: "Urgent",
    department: "Examination Cell",
    publishedAt: "16 Aug 2025, 11:00 AM",
    effectiveFrom: "15 Sep 2025",
    deadline: "10 Sep 2025",
    audience: "B.Tech Semesters 5 & 7 Students (All Branches)",
    requiresAcknowledgement: true,
    isRead: false,
    isAcknowledged: false,
    pinned: true,
    status: "Active",
    author: {
      name: "Prof. Sudhir K. Raman",
      designation: "Controller of Examinations",
      department: "Central Examination Cell",
      officeLocation: "Admin Tower 2, 3rd Floor",
      email: "controller.exams@collegeos.edu",
      phone: "+91 22 2654 3420",
      officeHours: "Monday – Saturday, 10:00 AM – 01:00 PM",
    },
    sections: [
      {
        heading: "1. Schedule Overview & Timing",
        content: `The Central Examination Cell has officially notified that the Mid-Semester Examinations for Autumn 2025 will be held from 15th September to 22nd September 2025. Each examination session will have a duration of 2 Hours carrying 50 Marks, contributing 25% weightage towards the final continuous assessment grade.`,
      },
      {
        heading: "2. Mandatory Hall Ticket & Admit Card Download",
        content: `Admit cards will be generated on the student portal starting 1st September 2025. Students with attendance above the statutory minimum threshold (75%) will be permitted to download verified hall tickets. Printed copies bearing authorized student council stamps are mandatory for entry.`,
        bullets: [
          "Morning Session: 10:00 AM to 12:00 PM (Entry permitted up to 09:45 AM).",
          "Afternoon Session: 02:00 PM to 04:00 PM (Entry permitted up to 01:45 PM).",
          "No student will be permitted into the exam hall after the official commencement bell.",
        ],
      },
      {
        heading: "3. Prohibited Devices & Malpractice Warning",
        content: `Possession of programmable calculators, smart fitness bands, cell phones, or handwritten study sheets inside the examination enclosure constitutes Level-1 academic malpractice and will lead to instantaneous cancellation of the respective course paper.`,
      },
    ],
    tableData: {
      title: "Mid-Semester Examination Timetable (B.Tech CSE - Sem 7)",
      columns: ["Date", "Session", "Course Code & Name", "Exam Hall Block"],
      rows: [
        ["15 Sep 2025 (Mon)", "10:00 AM – 12:00 PM", "CS-701: Distributed Systems", "Hall Block A (Rooms 101–108)"],
        ["17 Sep 2025 (Wed)", "10:00 AM – 12:00 PM", "CS-702: Cloud Computing Architecture", "Hall Block A (Rooms 101–108)"],
        ["19 Sep 2025 (Fri)", "10:00 AM – 12:00 PM", "CS-703: Machine Learning & NLP", "Hall Block B (Rooms 201–206)"],
        ["22 Sep 2025 (Mon)", "10:00 AM – 12:00 PM", "CS-704: Cyber Security & Cryptography", "Hall Block B (Rooms 201–206)"],
      ],
    },
    callout: {
      type: "urgent",
      title: "Strict Deadline for Hall Ticket Discrepancies",
      text: "Any course registration errors or name spelling mismatches on admit cards must be reported to the Examination Helpdesk before 10th September 2025, 4:00 PM.",
    },
    files: [
      {
        id: "f-201",
        name: "MidSem_Exam_Timetable_Sem5_Sem7.pdf",
        type: "PDF Document",
        size: "1.8 MB",
        uploadedAt: "16 Aug 2025",
        pageCount: 5,
        description: "Official branch-wise Mid-Semester exam schedule with subject codes and room matrix.",
      },
      {
        id: "f-202",
        name: "Examination_Hall_Code_Of_Conduct.pdf",
        type: "PDF Document",
        size: "780 KB",
        uploadedAt: "16 Aug 2025",
        pageCount: 2,
        description: "Standard disciplinary rules, allowed stationary, and invigilator guidelines.",
      },
    ],
    relatedNoticeIds: ["not-1", "not-6", "not-3"],
  },

  "not-3": {
    id: "not-3",
    referenceNumber: "COS/TPO/2025/0421",
    title: "Campus Recruitment Drive 2026 Batch – Tata Consultancy Services (TCS Digital)",
    subtitle: "Registration process, eligibility criteria, CTC bands, and selection timeline for B.Tech students.",
    type: "Placement Notice",
    category: "Placement",
    categoryType: "placement",
    priority: "Important",
    department: "Training & Placement Cell",
    publishedAt: "14 Aug 2025, 02:15 PM",
    effectiveFrom: "14 Aug 2025",
    deadline: "20 Aug 2025",
    audience: "Graduating Batch 2026 (B.Tech CSE, IT, ECE)",
    requiresAcknowledgement: false,
    isRead: true,
    isAcknowledged: false,
    pinned: false,
    status: "Active",
    author: {
      name: "Ms. Neha Singhania",
      designation: "Head of Corporate Relations & TPO",
      department: "Training & Placement Cell",
      officeLocation: "Placement Cell, Career Center 2nd Floor",
      email: "placements@collegeos.edu",
      phone: "+91 22 2654 3880",
      officeHours: "Monday – Friday, 09:30 AM – 05:30 PM",
    },
    sections: [
      {
        heading: "1. Company & Role Profiles",
        content: `Tata Consultancy Services (TCS) will conduct its flagship on-campus recruitment for the graduating engineering batch of 2026. The drive offers positions across two prestigious premium development cadres: TCS Digital (₹7.5 LPA) and TCS Prime (₹9.0 – ₹11.5 LPA).`,
      },
      {
        heading: "2. Eligibility & Academic Benchmark",
        content: `Students must fulfill the following mandatory qualifications:`,
        bullets: [
          "Minimum 70% or 7.0 CGPA aggregate across all preceding semesters without any active backlogs.",
          "Maximum 1-year academic gap allowed between 12th standard and graduation commencement.",
          "Degrees: B.Tech / B.E in Computer Science, Information Technology, or Electronics & Communication.",
        ],
      },
      {
        heading: "3. Selection Process Timeline",
        content: `The National Qualifier Test (TCS NQT) will be administered online at designated institutional computer laboratories. Shortlisted candidates will be invited for Technical Interviews and Managerial/HR discussions.`,
      },
    ],
    tableData: {
      title: "Recruitment Milestones & Schedule",
      columns: ["Stage", "Activity", "Target Date", "Action Required"],
      rows: [
        ["Phase 1", "TCS NextStep Portal Application", "20 Aug 2025, 11:59 PM", "Submit Reference CT/DT Number"],
        ["Phase 2", "College TPO Portal Confirmation", "21 Aug 2025, 05:00 PM", "Verify Resume & CGPA record"],
        ["Phase 3", "Online NQT Assessment", "28 Aug 2025", "Report to Lab-3 & Lab-4 at 09:00 AM"],
        ["Phase 4", "Technical & HR Interviews", "04 Sep – 06 Sep 2025", "Placement Interview Suites"],
      ],
    },
    callout: {
      type: "info",
      title: "Mandatory Resume Freezing",
      text: "Uploaded resumes cannot be modified once registration is frozen on 20th August. Ensure all verified internship certificates and GitHub project links are updated.",
    },
    files: [
      {
        id: "f-301",
        name: "TCS_Digital_Job_Description_2026.pdf",
        type: "PDF Document",
        size: "850 KB",
        uploadedAt: "14 Aug 2025",
        pageCount: 4,
        description: "Job specification, required technical stack, compensation breakdown, and service terms.",
      },
      {
        id: "f-302",
        name: "TCS_Registration_Step_by_Step_Guide.pdf",
        type: "PDF Document",
        size: "1.4 MB",
        uploadedAt: "14 Aug 2025",
        pageCount: 7,
        description: "Visual walkthrough for TCS NextStep portal form filling and verification.",
      },
    ],
    relatedNoticeIds: ["not-1", "not-4", "not-2"],
  },

  "not-4": {
    id: "not-4",
    referenceNumber: "COS/EC/2025/0312",
    title: "Distinguished Lecture: Building Real World Startups by Rohan Mehta",
    subtitle: "Interactive session on software venture building, Y-Combinator insights, and seed fundraising.",
    type: "Event Notice",
    category: "Event",
    categoryType: "event",
    priority: "Normal",
    department: "Events Cell & E-Cell",
    publishedAt: "12 Aug 2025, 04:00 PM",
    effectiveFrom: "22 Aug 2025",
    deadline: "21 Aug 2025",
    audience: "All Students across Engineering, Design, and Management",
    requiresAcknowledgement: false,
    isRead: true,
    isAcknowledged: false,
    pinned: false,
    status: "Active",
    author: {
      name: "Prof. Varun Joshi",
      designation: "Faculty Convener, Entrepreneurship Cell",
      department: "Innovation & Incubation Hub",
      officeLocation: "E-Cell Hub, Building 4",
      email: "ecell@collegeos.edu",
      phone: "+91 22 2654 3912",
      officeHours: "Tuesday & Thursday, 03:00 PM – 05:00 PM",
    },
    sections: [
      {
        heading: "1. Session Synopsis",
        content: `The Department of Computer Science & E-Cell proudly hosts Mr. Rohan Mehta (Founder, DevSummit; Y-Combinator Alum) for an executive fireside session on converting hackathon prototypes into revenue-generating technological startups.`,
      },
      {
        heading: "2. Key Topics Covered",
        content: `Mr. Mehta will cover product market fit, bootstrapping versus venture capital, hiring early founding engineers, and navigating legal incorporation during undergraduate years.`,
        bullets: [
          "From Git Commit to First 10,000 Users.",
          "Lessons learned while scaling DevSummit infrastructure to 2M monthly active developers.",
          "Open Q&A with direct pitch feedback for top 3 student project teams.",
        ],
      },
    ],
    tableData: null,
    callout: null,
    files: [
      {
        id: "f-401",
        name: "TechTalk_Poster_DevSummit.jpg",
        type: "Image File",
        size: "3.2 MB",
        uploadedAt: "12 Aug 2025",
        pageCount: 1,
        description: "Official event poster with QR registration link and speaker profile.",
      },
    ],
    relatedNoticeIds: ["not-7", "not-1", "not-3"],
  },

  "not-5": {
    id: "not-5",
    referenceNumber: "COS/HST/2025/0199",
    title: "Hostel Mess Menu Revision & Dietary Standards Advisory – August 2025",
    subtitle: "Implemented based on joint recommendations from the Student Mess Committee and campus nutritionist.",
    type: "General Circular",
    category: "General",
    categoryType: "general",
    priority: "Normal",
    department: "Hostel Warden Office",
    publishedAt: "11 Aug 2025, 01:00 PM",
    effectiveFrom: "11 Aug 2025",
    deadline: null,
    audience: "All Hostellers (Boys Blocks A–D & Girls Blocks E–H)",
    requiresAcknowledgement: false,
    isRead: true,
    isAcknowledged: false,
    pinned: false,
    status: "Active",
    author: {
      name: "Dr. K. S. Verma",
      designation: "Chief Hostel Warden",
      department: "Hostel Administration",
      officeLocation: "Hostel Central Office, Boys Block B Ground Floor",
      email: "hostel.warden@collegeos.edu",
      phone: "+91 22 2654 3660",
      officeHours: "Daily, 05:00 PM – 07:00 PM",
    },
    sections: [
      {
        heading: "1. Menu Overhaul Details",
        content: `Following regular audit consultations with the elected Student Mess Advisory Board, significant improvements have been introduced across all hostel dining halls starting Monday, 11th August 2025.`,
      },
      {
        heading: "2. Key Additions & Hygenic Upgrades",
        content: `New breakfast inclusions feature fortified sprouts, seasonal fresh juices, and customized high-protein options for collegiate athletes. Special festive weekend dinners have been integrated into regular mess dues without additional surcharge.`,
      },
    ],
    tableData: null,
    callout: null,
    files: [
      {
        id: "f-501",
        name: "Weekly_Mess_Menu_August_2025.pdf",
        type: "PDF Document",
        size: "620 KB",
        uploadedAt: "11 Aug 2025",
        pageCount: 2,
        description: "Day-wise breakfast, lunch, high-tea, and dinner scheduled dishes.",
      },
    ],
    relatedNoticeIds: ["not-1", "not-6", "not-7"],
  },

  "not-6": {
    id: "not-6",
    referenceNumber: "COS/LIB/2025/0074",
    title: "Central Library Extended Night Reading Hours During Examination Term",
    subtitle: "24/7 digital hub access, reserved study cubicles, and overnight cafeteria services.",
    type: "Academic Notice",
    category: "Information",
    categoryType: "information",
    priority: "Normal",
    department: "Central University Library",
    publishedAt: "10 Aug 2025, 10:00 AM",
    effectiveFrom: "18 Aug 2025",
    deadline: "30 Aug 2025",
    audience: "All Registered Students & Research Scholars",
    requiresAcknowledgement: false,
    isRead: false,
    isAcknowledged: false,
    pinned: false,
    status: "Active",
    author: {
      name: "Smt. Jayashree Balan",
      designation: "Chief University Librarian",
      department: "Library Services",
      officeLocation: "Central Library, 1st Floor Admin Wing",
      email: "library@collegeos.edu",
      phone: "+91 22 2654 3500",
      officeHours: "Monday – Saturday, 09:00 AM – 06:00 PM",
    },
    sections: [
      {
        heading: "1. Extended Hours Schedule",
        content: `To accommodate students preparing for continuous evaluation tests, GATE, and campus placements, reading hall hours are extended: Monday through Saturday from 08:00 AM to 10:00 PM, and Sundays from 09:00 AM to 06:00 PM.`,
      },
      {
        heading: "2. Digital Kiosks & Wi-Fi Bandwidth",
        content: `High-speed 1 Gbps research terminals in Computer Center 2 will remain energized during all extended hours. Strict silence must be observed across Levels 2 and 3 reading zones.`,
      },
    ],
    tableData: null,
    callout: null,
    files: [
      {
        id: "f-601",
        name: "Library_Extended_Hours_Notification.pdf",
        type: "PDF Document",
        size: "450 KB",
        uploadedAt: "10 Aug 2025",
        pageCount: 1,
        description: "Official memo regarding late night reading room permissions and security protocol.",
      },
    ],
    relatedNoticeIds: ["not-2", "not-1", "not-5"],
  },

  "not-7": {
    id: "not-7",
    referenceNumber: "COS/EVT/2025/0890",
    title: "Annual Technical Symposium 'Innovate 2025' – Call for Student Organizers & Submissions",
    subtitle: "Theme: AI for Sustainable Communities • ₹5,00,000 in Prizes across Hackathons & Sprints.",
    type: "Event Circular",
    category: "Event",
    categoryType: "event",
    priority: "Important",
    department: "Central Events Directorate",
    publishedAt: "09 Aug 2025, 03:30 PM",
    effectiveFrom: "09 Aug 2025",
    deadline: "25 Aug 2025",
    audience: "All Engineering Branches & Inter-disciplinary Clubs",
    requiresAcknowledgement: false,
    isRead: false,
    isAcknowledged: false,
    pinned: false,
    status: "Active",
    author: {
      name: "Dr. Rajeshwar Rao",
      designation: "Dean of Student Affairs",
      department: "Student Affairs & Cultural Council",
      officeLocation: "Student Center, Room 204",
      email: "studentaffairs@collegeos.edu",
      phone: "+91 22 2654 3710",
      officeHours: "Monday – Friday, 11:00 AM – 01:00 PM",
    },
    sections: [
      {
        heading: "1. Festival Overview",
        content: `College OS will host its marquee inter-collegiate technical festival 'Innovate 2025' from October 12th through 14th, 2025. Over 3,000 delegates from top engineering institutions across the country will participate.`,
      },
      {
        heading: "2. Student Organizing Committee Callout",
        content: `Applications are invited for Core Committee leads in Web Development, Public Relations, Sponsorship, Logistics, and Event Curation. Selected student leads will receive university distinction certificates.`,
      },
    ],
    tableData: null,
    callout: null,
    files: [
      {
        id: "f-701",
        name: "Innovate2025_Brochure.pdf",
        type: "PDF Document",
        size: "4.5 MB",
        uploadedAt: "09 Aug 2025",
        pageCount: 8,
        description: "Complete festival brochure including track themes, sponsor details, and prize breakdown.",
      },
      {
        id: "f-702",
        name: "Organizing_Committee_Form.pdf",
        type: "PDF Document",
        size: "520 KB",
        uploadedAt: "09 Aug 2025",
        pageCount: 2,
        description: "Student coordinator nomination form.",
      },
    ],
    relatedNoticeIds: ["not-4", "not-1", "not-3"],
  },
};

/**
 * Resolves a notice by ID or alias.
 * Supports: "not-1", "notice-1", "1", etc.
 */
export function getNoticeDetails(idOrSlug) {
  if (!idOrSlug) return null;

  const rawId = String(idOrSlug).trim().toLowerCase();

  // Direct lookup
  if (DETAILED_NOTICES[rawId]) {
    return DETAILED_NOTICES[rawId];
  }

  // "notice-1" -> "not-1"
  if (rawId.startsWith("notice-")) {
    const num = rawId.replace("notice-", "");
    const alias = `not-${num}`;
    if (DETAILED_NOTICES[alias]) return DETAILED_NOTICES[alias];
  }

  // Pure digit: "1" -> "not-1"
  if (/^\d+$/.test(rawId)) {
    const alias = `not-${rawId}`;
    if (DETAILED_NOTICES[alias]) return DETAILED_NOTICES[alias];
  }

  // Search in ALL_NOTICES from noticesData.js
  const fallbackNotice = ALL_NOTICES.find(
    (n) =>
      n.id.toLowerCase() === rawId ||
      n.id.toLowerCase() === `not-${rawId}` ||
      (rawId.startsWith("notice-") && n.id.toLowerCase() === `not-${rawId.replace("notice-", "")}`)
  );

  if (fallbackNotice) {
    return synthesizeNotice(fallbackNotice);
  }

  return null;
}

/**
 * Fallback synthesizer for any notice in ALL_NOTICES
 */
function synthesizeNotice(base) {
  return {
    id: base.id,
    referenceNumber: `COS/${base.categoryType?.toUpperCase() || "GEN"}/2025/${base.id.replace(/\D/g, "").padStart(4, "0")}`,
    title: base.title,
    subtitle: base.description,
    type: base.type === "announcement" ? "Campus Announcement" : "Official Notice",
    category: base.category,
    categoryType: base.categoryType || "general",
    priority: base.categoryType === "exam" || base.categoryType === "important" ? "High" : "Normal",
    department: base.department || "Academic Affairs",
    publishedAt: base.date ? `${base.date}, 10:00 AM` : "18 Aug 2025",
    effectiveFrom: base.date || "18 Aug 2025",
    deadline: null,
    audience: "All Students, Faculty & Staff",
    requiresAcknowledgement: base.categoryType === "important" || base.categoryType === "exam",
    isRead: !base.unread,
    isAcknowledged: false,
    pinned: Boolean(base.pinned),
    status: "Active",
    author: {
      name: "Office of the Dean",
      designation: "Academic Administration",
      department: base.department || "General Administration",
      officeLocation: "Administrative Block",
      email: "info@collegeos.edu",
      phone: "+91 22 2654 3000",
      officeHours: "Monday – Friday, 10:00 AM – 04:00 PM",
    },
    sections: [
      {
        heading: "Official Communication Notice",
        content: base.fullContent || base.description,
      },
    ],
    tableData: null,
    callout: null,
    files: base.files && base.files.length > 0
      ? base.files.map((f, i) => ({
          id: `f-syn-${i}`,
          name: f.name,
          type: "PDF Document",
          size: f.size || "1.2 MB",
          uploadedAt: base.date || "18 Aug 2025",
          pageCount: 3,
          description: "Official attached document for review and reference.",
        }))
      : [
          {
            id: "f-syn-0",
            name: `${base.title.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 30)}_Circular.pdf`,
            type: "PDF Document",
            size: "1.5 MB",
            uploadedAt: base.date || "18 Aug 2025",
            pageCount: 4,
            description: "Official authenticated circular issued by the department.",
          },
        ],
    relatedNoticeIds: ALL_NOTICES.filter((n) => n.id !== base.id).slice(0, 3).map((n) => n.id),
  };
}

/**
 * Returns related notices array
 */
export function getRelatedNotices(currentNoticeId) {
  const current = getNoticeDetails(currentNoticeId);
  const relatedIds = current?.relatedNoticeIds || [];

  const list = [];
  for (const id of relatedIds) {
    const item = getNoticeDetails(id);
    if (item && item.id !== currentNoticeId) {
      list.push(item);
    }
  }

  // If fewer than 3, pad with others
  if (list.length < 3) {
    for (const key of Object.keys(DETAILED_NOTICES)) {
      if (key !== currentNoticeId && !list.find((x) => x.id === key)) {
        list.push(DETAILED_NOTICES[key]);
        if (list.length >= 4) break;
      }
    }
  }

  return list.slice(0, 4);
}
