/**
 * Campus AI Data Store & Architecture Mock Services
 * 
 * Follows College OS Architecture Rules:
 * 1. MongoDB is the application source of truth for structured data (timetable, attendance, marks, assignments, events).
 * 2. Vector Search / RAG is used for unstructured documents, PDFs, college policies, and guidelines.
 * 3. MongoDB + RAG hybrid queries combine structured records with policy context.
 * 4. Genuinely general queries fallback to General AI knowledge.
 * 5. Unsupported college queries return an explicit Information Unavailable state (never hallucinate).
 * 6. Private/sensitive credentials (passwords, emails, private hashes) are strictly excluded.
 */

export const INITIAL_ASSISTANT_GREETING = {
  id: "msg_greeting",
  sender: "assistant",
  timestamp: "Just now",
  content: {
    salutation: "Hi Hamid! 👋",
    intro: "I'm your Campus AI assistant. I can help you with college-related queries using our official campus data, policies, guidelines and documents.",
    promptHelp: "You can ask about:",
    chips: [
      { label: "Timetable", query: "What is my timetable for today?" },
      { label: "Attendance", query: "What is my current attendance percentage?" },
      { label: "Marks", query: "Show me my latest exam marks and CGPA" },
      { label: "Notices", query: "What are the latest college notices?" },
      { label: "Assignments", query: "Show me my upcoming assignments" },
      { label: "Events", query: "Tell me about upcoming college events" },
      { label: "College Policies", query: "What is the college attendance policy?" },
      { label: "Faculty / Students Info", query: "Who is the HOD of Computer Science?" },
      { label: "And more...", query: "What campus amenities and lab facilities are open?" },
    ],
    generalNote: "Also, I can help with general queries (non-college related) using general AI knowledge.",
    closing: "What would you like to know today? 😊"
  }
};

export const QUICK_PROMPTS = [
  {
    id: "qp-1",
    title: "What is the attendance policy?",
    iconType: "calendar",
    sourceType: "rag",
    query: "What is the attendance policy?",
  },
  {
    id: "qp-2",
    title: "Show me my upcoming assignments",
    iconType: "document",
    sourceType: "mongodb",
    query: "Show me my upcoming assignments",
  },
  {
    id: "qp-3",
    title: "Tell me about college events",
    iconType: "events",
    sourceType: "mongodb",
    query: "Tell me about college events",
  },
  {
    id: "qp-4",
    title: "How to apply for an internship?",
    iconType: "briefcase",
    sourceType: "rag",
    query: "How can I apply for an internship?",
  },
];

export const SAMPLE_QUESTIONS = [
  {
    id: "sq-1",
    question: "What is the attendance policy?",
    category: "Policy • RAG",
  },
  {
    id: "sq-2",
    question: "When is the next college fest?",
    category: "Events • MongoDB",
  },
  {
    id: "sq-3",
    question: "How can I apply for an internship?",
    category: "Guidelines • RAG",
  },
  {
    id: "sq-4",
    question: "Show me the Computer Networks syllabus.",
    category: "Documents • RAG",
  },
  {
    id: "sq-5",
    question: "What are the rules for lost and found?",
    category: "Guidelines • RAG",
  },
];

export const INITIAL_RECENT_QUERIES = [
  {
    id: "rq-1",
    question: "What is the attendance policy?",
    timeAgo: "2 min ago",
    sourceType: "rag",
    sourceLabel: "College Policy • RAG",
  },
  {
    id: "rq-2",
    question: "Show me upcoming events",
    timeAgo: "8 min ago",
    sourceType: "mongodb",
    sourceLabel: "College Data",
  },
  {
    id: "rq-3",
    question: "Tell me about the web development course",
    timeAgo: "14 min ago",
    sourceType: "rag",
    sourceLabel: "Academic Syllabus • RAG",
  },
  {
    id: "rq-4",
    question: "How to update my profile?",
    timeAgo: "23 min ago",
    sourceType: "mongodb",
    sourceLabel: "Student Portal Guide",
  },
  {
    id: "rq-5",
    question: "What are the placement statistics?",
    timeAgo: "1 hour ago",
    sourceType: "hybrid",
    sourceLabel: "College Data + Policy",
  },
];

export const HOW_IT_WORKS_RULES = [
  {
    id: "hw-1",
    title: "Direct MongoDB retrieval for structured data",
    detail: "(e.g., timetable, attendance, marks, assignments).",
    type: "mongodb",
  },
  {
    id: "hw-2",
    title: "RAG/vector search for policies, guidelines & PDFs.",
    detail: "Indexes college handbook, syllabus, hostel rules & notices.",
    type: "rag",
  },
  {
    id: "hw-3",
    title: "Combined MongoDB + RAG for complex queries.",
    detail: "Answers questions requiring both personal records and official guidelines.",
    type: "hybrid",
  },
  {
    id: "hw-4",
    title: "No relevant info? → Information unavailable.",
    detail: "Never hallucinates or fabricates unverified campus information.",
    type: "guardrail",
  },
  {
    id: "hw-5",
    title: "General non-college queries → General AI.",
    detail: "Seamlessly answers coding, science, and conceptual queries.",
    type: "general",
  },
  {
    id: "hw-6",
    title: "No private data (emails, passwords, etc.).",
    detail: "Strict security boundaries protect student privacy and credentials.",
    type: "security",
  },
];

/**
 * Knowledge Base Catalog for Knowledge, Documents, Guidelines, Policies tabs
 */
export const COLLEGE_KNOWLEDGE_ITEMS = [
  {
    id: "kb-1",
    category: "Academic",
    title: "Semester Attendance Regulations & Condonation Criteria",
    type: "Policies",
    fileSize: "1.4 MB",
    lastUpdated: "Sept 15, 2026",
    summary: "Mandates 75% minimum physical attendance per subject. Condonation permitted up to 65% strictly with sanctioned medical certificate.",
    tags: ["Attendance", "Academics", "Medical Leave"],
    ragIndexed: true,
  },
  {
    id: "kb-2",
    category: "Examination",
    title: "End Semester Grading & Re-evaluation Scheme",
    type: "Policies",
    fileSize: "2.1 MB",
    lastUpdated: "Aug 28, 2026",
    summary: "Comprehensive breakdown of relative grading, SGPA/CGPA calculation formulas, and fee structure for supplementary examinations.",
    tags: ["Grading", "Exams", "CGPA"],
    ragIndexed: true,
  },
  {
    id: "kb-3",
    category: "Career",
    title: "Campus Placement & Internship Cell (CPIC) Guidelines 2026-27",
    type: "Guidelines",
    fileSize: "3.5 MB",
    lastUpdated: "Sept 02, 2026",
    summary: "Eligibility criteria, NOC application process, 1-student-1-offer rule, and interview protocol for on-campus drives.",
    tags: ["Placements", "Internships", "NOC"],
    ragIndexed: true,
  },
  {
    id: "kb-4",
    category: "Campus Safety",
    title: "Campus Security, Lost & Found, and Property Recovery Protocol",
    type: "Guidelines",
    fileSize: "840 KB",
    lastUpdated: "July 20, 2026",
    summary: "Step-by-step reporting instructions at Chief Warden Office, mandatory 30-day locker retention, and digital claim verification.",
    tags: ["Lost & Found", "Security", "Campus"],
    ragIndexed: true,
  },
  {
    id: "kb-5",
    category: "Curriculum",
    title: "B.Tech Computer Science & Engineering Full Syllabus (Rev 2024)",
    type: "Documents",
    fileSize: "5.8 MB",
    lastUpdated: "June 10, 2026",
    summary: "Complete semester-wise course outlines, recommended textbooks, laboratory guidelines, and prerequisite trees.",
    tags: ["Syllabus", "CSE", "Curriculum"],
    ragIndexed: true,
  },
  {
    id: "kb-6",
    category: "Campus Life",
    title: "Hostel Rules, Curfew Timings & Mess Regulations",
    type: "Policies",
    fileSize: "1.2 MB",
    lastUpdated: "Aug 05, 2026",
    summary: "Official gate closure hours (9:30 PM for boys, 9:30 PM for girls), biometric verification rules, and guest overnight policies.",
    tags: ["Hostel", "Curfew", "Regulations"],
    ragIndexed: true,
  },
];

/**
 * Intelligent mock response simulator implementing the prompt's architectural rules
 */
export function generateCampusAIResponse(userQuery, { collegeKnowledgeEnabled = true, generalAIEnabled = true }) {
  const q = userQuery.toLowerCase().trim();

  // 1. Check for specific College structured queries (MongoDB)
  if (q.includes("attendance") && (q.includes("my") || q.includes("current") || q.includes("percentage") || q.includes("how much"))) {
    return {
      type: "mongodb",
      sourceLabel: "College Data",
      sourceBadge: "MongoDB Direct Retrieval",
      text: "Based on your verified student record in College OS (Hamid Rza • B.Tech 7th Sem):\n\n• **Overall Aggregate Attendance:** 84.6%\n• **Computer Networks (CSE-401):** 88% (22/25 classes attended)\n• **Machine Learning (CSE-403):** 79% (19/24 classes attended)\n• **Cloud Computing (CSE-405):** 91% (21/23 classes attended)\n• **Cybersecurity Lab (CSE-407):** 80% (8/10 sessions attended)\n\n✅ You are currently above the mandatory 75% threshold in all enrolled subjects.",
      chips: ["View Detailed Attendance", "Check Attendance Policy"],
    };
  }

  // 2. Check for combined query: Attendance + Shortage Policy (MongoDB + RAG)
  if (q.includes("attendance") && (q.includes("policy") || q.includes("shortage") || q.includes("rules"))) {
    return {
      type: "hybrid",
      sourceLabel: "College Data + Policy",
      sourceBadge: "MongoDB + RAG Vector Search",
      text: "According to the **Academic Regulations (Doc #AR-2026-B)** & your personal MongoDB attendance record:\n\n1. **College Attendance Policy:**\n   • Mandatory minimum attendance is **75%** in each registered theory and lab course.\n   • Shortage up to **65%** may be condoned by the Dean of Academic Affairs exclusively on medical grounds or university sports representation with approved documents submitted within 7 working days.\n   • Students below 65% are strictly **debarred** from writing the End-Semester Examination and receive an 'I' (Incomplete) grade.\n\n2. **Your Current Status:**\n   • Your aggregate attendance is **84.6%** — you are in good standing across all subjects with no condonation needed.",
      chips: ["Download Medical Leave Form", "View Subject Breakdown"],
    };
  }

  // 3. Structured MongoDB retrieval: Upcoming Assignments
  if (q.includes("assignment") || q.includes("assignments") || q.includes("homework")) {
    return {
      type: "mongodb",
      sourceLabel: "College Data",
      sourceBadge: "MongoDB Direct Retrieval",
      text: "Here are your active assignments retrieved directly from your College OS database:\n\n1. **Computer Networks Lab Report #4**\n   • Due: Tomorrow, 11:59 PM (Sept 25, 2026)\n   • Status: In Progress • Weight: 15 marks\n\n2. **Distributed Systems Case Study**\n   • Due: Sunday, Sept 28, 2026\n   • Status: Not Started • Weight: 20 marks\n\n3. **ML Term Project Milestone 2**\n   • Due: Oct 04, 2026\n   • Status: Submitted (Pending Review)",
      chips: ["Go to Assignments", "Upload Submission"],
    };
  }

  // 4. Structured MongoDB retrieval: Events / Fest
  if (q.includes("event") || q.includes("events") || q.includes("fest") || q.includes("hackathon")) {
    return {
      type: "mongodb",
      sourceLabel: "College Data",
      sourceBadge: "MongoDB Direct Retrieval",
      text: "Here are the upcoming college events scheduled on campus:\n\n• 🎪 **Annual Cultural Fest: 'Sanskriti 2026'**\n  Dates: Oct 14 - Oct 16, 2026 | Main Amphitheatre & Ground\n\n• 💻 **Campus Hackathon: 'Hack-the-Campus 3.0'**\n  Dates: Oct 22 - Oct 23, 2026 | CSE Innovation Hub\n  Registration Deadline: Oct 10, 2026\n\n• 🎓 **Tech Alumni Career Mentorship Summit**\n  Date: Saturday, Oct 03, 2026 (10:00 AM) | Seminar Hall B",
      chips: ["View Events Calendar", "Register for Hackathon"],
    };
  }

  // 5. RAG Policy retrieval: Internship application
  if (q.includes("internship") || q.includes("cpic") || q.includes("placement")) {
    return {
      type: "rag",
      sourceLabel: "College Policy • RAG",
      sourceBadge: "Vector Knowledge Search",
      text: "From the **Campus Placement & Internship Cell (CPIC) Guidelines 2026-27**:\n\n1. **Eligibility Criteria:** Minimum CGPA of 6.5 with no active backlogs for 7th & 8th-semester students.\n2. **NOC Application:** Apply via College OS > 'Internships & Hackathons' portal at least 14 days before your start date.\n3. **Documents Required:**\n   • Company Offer Letter with stipend details\n   • Department HOD Recommendation\n   • Signed Parent Consent Form\n4. **Attendance Exemption:** Up to 3 days/week attendance relaxation is granted for approved 6-month industry internships.",
      chips: ["Apply for Internship NOC", "Explore Open Opportunities"],
    };
  }

  // 6. RAG Document retrieval: Lost & Found
  if (q.includes("lost") || q.includes("found")) {
    return {
      type: "rag",
      sourceLabel: "College Policy • RAG",
      sourceBadge: "Vector Knowledge Search",
      text: "According to the **Campus Security & Lost Property Protocol**:\n\n• **Reporting Lost Items:** Submit a ticket in the College OS 'Lost & Found' section with a photo/description and approximate loss location.\n• **Retrieval Point:** All recovered physical items (IDs, electronics, notebooks) are cataloged at the **Chief Security Control Room (Block A, Ground Floor)**.\n• **Retention Period:** Found items are retained for 30 calendar days before being transferred to campus administrative custody.",
      chips: ["Report Lost Item", "Check Recovered Items"],
    };
  }

  // 7. RAG Document retrieval: Syllabus
  if (q.includes("syllabus") || q.includes("networks") || q.includes("curriculum")) {
    return {
      type: "rag",
      sourceLabel: "College Policy • RAG",
      sourceBadge: "Vector Knowledge Search",
      text: "From the **B.Tech CSE 7th Sem Curriculum Document (Rev 2024)**:\n\n**CSE-401: Advanced Computer Networks**\n• **Unit 1:** Transport Layer Protocols (TCP BBR, QUIC, Congestion Control)\n• **Unit 2:** Software Defined Networking (SDN) & OpenFlow Architecture\n• **Unit 3:** Network Security, TLS 1.3 Handshake & Zero-Trust Architecture\n• **Unit 4:** Wireless Mesh Networks & 5G Core Network Fundamentals\n• **Recommended Textbook:** *Computer Networking: A Top-Down Approach* (Kurose & Ross, 8th Edition).",
      chips: ["Download Full Syllabus PDF", "View Lab Manual"],
    };
  }

  // 8. General AI Knowledge queries (e.g., recursion, algorithms, science)
  if (
    q.includes("recursion") ||
    q.includes("python") ||
    q.includes("javascript") ||
    q.includes("react") ||
    q.includes("explain") ||
    q.includes("photosynthesis") ||
    q.includes("binary search")
  ) {
    if (!generalAIEnabled) {
      return {
        type: "error",
        sourceLabel: "General AI Disabled",
        sourceBadge: "Settings Warning",
        text: "General AI mode is currently toggled off. Please switch on **General AI** at the bottom of the composer to query topics outside verified campus databases.",
        chips: ["Enable General AI"],
      };
    }

    return {
      type: "general",
      sourceLabel: "General AI",
      sourceBadge: "General Model Knowledge",
      text: "**Recursion** is a programming technique where a function solves a problem by calling a smaller instance of itself.\n\nEvery recursive solution has two key components:\n1. **Base Case:** The terminating condition that stops recursion (e.g., `if (n <= 1) return 1`). Without it, you get a stack overflow.\n2. **Recursive Step:** Where the function calls itself with a reduced input (e.g., `return n * factorial(n - 1)`).\n\n**Visual Metaphor:** Russian nesting dolls. You open each doll until you reach the smallest solid doll (base case), then put them all back together.",
      chips: ["Show Code Example", "Recursion vs Iteration"],
    };
  }

  // 9. Sensitive / Private data safety guardrail
  if (q.includes("password") || q.includes("credential") || q.includes("hash") || q.includes("secret key") || q.includes("private key")) {
    return {
      type: "security",
      sourceLabel: "Security Guardrail",
      sourceBadge: "Privacy Protocol Active",
      text: "⚠️ **Security Policy Notice:** Campus AI strictly adheres to College OS data privacy rules. Passwords, auth tokens, private credentials, and personal financial records are never accessed or exposed.",
      chips: ["Reset College Password", "View Security Guidelines"],
    };
  }

  // 10. Information Unavailable State (For unsupported college queries - never hallucinate!)
  return {
    type: "unavailable",
    sourceLabel: "Information Unavailable",
    sourceBadge: "Verified Knowledge Boundary",
    text: "I couldn't find this information in the available college data or documents.",
    supportingText: "Try asking about another college topic or check the official college source.",
    chips: ["Ask another question", "Browse College Knowledge", "View Campus Notices"],
    isUnavailable: true,
  };
}
