export const FACULTY_AI_QUICK_PROMPTS = [
  {
    id: "p1",
    text: "What is the attendance policy for students?",
    icon: "arrow",
  },
  {
    id: "p2",
    text: "Show me the latest notices",
    icon: "document",
  },
  {
    id: "p3",
    text: "Find students in Computer Science",
    icon: "users",
  },
  {
    id: "p4",
    text: "How to create an assignment?",
    icon: "document",
  },
  {
    id: "p5",
    text: "Show me college guidelines (PDF)",
    icon: "archive",
  },
  {
    id: "p6",
    text: "What are the upcoming events?",
    icon: "graduation",
  },
];

export const FACULTY_AI_EXAMPLES = [
  "Show me the latest announcements",
  "What is the project submission guideline?",
  "List all faculty members in CSE",
];

export const FACULTY_RECENT_QUERIES = [
  {
    id: "rq-1",
    query: "What is the attendance policy for students?",
    timeAgo: "2 hours ago",
    iconColor: "blue",
    iconType: "document",
  },
  {
    id: "rq-2",
    query: "Show me the latest notices",
    timeAgo: "4 hours ago",
    iconColor: "purple",
    iconType: "document",
  },
  {
    id: "rq-3",
    query: "List all faculty members in CSE",
    timeAgo: "Yesterday",
    iconColor: "blue",
    iconType: "users",
  },
  {
    id: "rq-4",
    query: "What are the upcoming events?",
    timeAgo: "Yesterday",
    iconColor: "orange",
    iconType: "calendar",
  },
  {
    id: "rq-5",
    query: "How to create an assignment?",
    timeAgo: "2 days ago",
    iconColor: "green",
    iconType: "document",
  },
];

export function getFacultyAIResponse(query, mode = "college") {
  const q = query.toLowerCase().trim();

  if (q.includes("attendance policy") || q.includes("attendance")) {
    return {
      text: `### Student Attendance Policy & Guidelines (Academic Handbook §4.2)

According to university academic regulations and departmental policies:
1. **Minimum Attendance Threshold**: Students must maintain a minimum of **75% attendance** in each registered course to be eligible for end-semester examinations.
2. **Medical Condonation**: Between **65% and 75%**, condonation may be granted by the Head of Department on submission of verified medical certificates within 7 working days.
3. **Faculty Roll-Call Entry**: Faculty members are required to mark attendance on the Faculty Portal within 24 hours of each lecture or lab session.
4. **Attendance Alerts**: Students falling below 80% automatically receive automated warning notifications on their Student Portal dashboard.`,
      source: "Source: College MongoDB + Academic Regulations Handbook (RAG)",
      type: "policy",
    };
  }

  if (q.includes("latest notices") || q.includes("announcements") || q.includes("notices")) {
    return {
      text: `### Latest College Notices & Announcements (Updated Today)

1. **College Fest 2025 – Registrations Open** (Sep 14, 2025)
   - Cultural, technical, and sports events open for all students.
2. **Library Timings Updated** (Sep 12, 2025)
   - Open 8:00 AM to 7:00 PM (Mon–Sat) with extended exam hours.
3. **Internal Assessment Schedule** (Sep 10, 2025)
   - Mid-term exam timetable published for Sem 5 and Sem 3.
4. **Holiday on 17th Sep (Ganesh Chaturthi)** (Sep 8, 2025)
   - College campus and administrative offices closed.`,
      source: "Source: College MongoDB (Notices Collection)",
      type: "notices",
    };
  }

  if (q.includes("students in computer science") || q.includes("find students")) {
    return {
      text: `### Department of Computer Science & Engineering — Student Roster

- **Total Enrolled Students**: 480 across 4 years (Sem 1 to Sem 8).
- **Sem 5 (Class CSE-301 & CSE-302)**: 64 active students (e.g. Hamid Rza, Ananya Sharma, Rohit Verma).
- **Average Attendance**: 84.6% across department classes.
- **Top Academic Standing**: 18 students currently maintain CGPA > 9.0.

*You can filter and view complete student individual performance cards in the **Student Profiles** tab.*`,
      source: "Source: College MongoDB (Students & Enrollments Collection)",
      type: "students",
    };
  }

  if (q.includes("create an assignment") || q.includes("how to create an assignment")) {
    return {
      text: `### How to Create Coursework Assignments

As a faculty member, you can publish assignments in 3 steps:
1. Navigate to **Assignments** from the faculty sidebar.
2. Click the **Create New Assignment** button in the top right or Quick Actions.
3. Specify:
   - **Course Code & Title** (e.g., CSE-302 Web Development)
   - **Submission Deadline** & Maximum Marks
   - **Instructions & Attachments** (PDFs, reference repos)
4. Click **Publish Assignment** to instantly alert all enrolled students.`,
      source: "Source: Faculty Portal User Manual §2.4",
      type: "guidelines",
    };
  }

  if (q.includes("college guidelines") || q.includes("guidelines (pdf)")) {
    return {
      text: `### College OS Official Guidelines & Policies

The following official documents are indexed in the RAG knowledge repository:
- **Project Submission Guidelines (2025-26)** (PDF • 2.1 MB)
- **Examination & Grading Code of Conduct** (PDF • 1.4 MB)
- **Laboratory Safety & Protocol Manual** (PDF • 3.2 MB)
- **Anti-Ragging Compliance Guidelines** (PDF • 850 KB)

*All files can be accessed or downloaded from the **Resources** tab.*`,
      source: "Source: College Document Repository (Vector Search / RAG)",
      type: "documents",
    };
  }

  if (q.includes("upcoming events") || q.includes("events")) {
    return {
      text: `### Upcoming Campus Events (Autumn Semester 2025)

1. **Smart India Hackathon (SIH) Internal Round** — *Sep 20, 2025* (Auditorium 1)
2. **AICTE Cloud Computing Faculty Workshop** — *Sep 22–26, 2025* (Seminar Hall 2)
3. **Annual Sports & Athletics Trials** — *Sep 28, 2025* (Sports Complex)
4. **TCS & Infosys Campus Placement Drives** — *Oct 5, 2025* (Placement Cell)`,
      source: "Source: College Events Calendar (MongoDB)",
      type: "events",
    };
  }

  if (q.includes("faculty members in cse") || q.includes("faculty members")) {
    return {
      text: `### Faculty Members — Dept. of Computer Science & Engineering

- **Dr. S. K. Roy** — Head of Department (Distributed Systems)
- **Dr. Arjun Mehta** *(You)* — Associate Professor (Operating Systems & Algorithms)
- **Dr. Neha Sharma** — Assistant Professor (Machine Learning & AI)
- **Prof. Priya Verma** — Assistant Professor (Computer Graphics & Web Tech)
- **Dr. Rohan Patel** — Associate Professor (Computer Networks & Cyber Security)`,
      source: "Source: CSE Department Faculty Directory",
      type: "faculty",
    };
  }

  if (q.includes("project submission guideline") || q.includes("project submission")) {
    return {
      text: `### B.Tech Final & Minor Project Guidelines

- **Synopsis Deadline**: Approved by faculty mentor by August 28.
- **Mid-term Progress Presentation**: Scheduled for October 12–14 with working prototype.
- **Final Deliverables**: IEEE format project report, GitHub repository with clean README, and live cloud deployment URL.
- **Evaluation Weightage**: 30% Mid-term Review, 40% Final Defense & Demo, 30% Code Architecture & Testing.`,
      source: "Source: College RAG Repository (Project_Guidelines_v3.pdf)",
      type: "guidelines",
    };
  }

  // General fallback response
  return {
    text: `### Query Result for "${query}"

Based on the verified college database and official documentation:
- The requested information has been cross-referenced with your faculty access permissions.
- You can manage corresponding records in your **Dashboard**, **My Classes**, or **Resources** sections.
- If you need deeper data exports or administrative changes, please contact the Academic Cell.`,
    source: mode === "college" ? "Source: College MongoDB + RAG" : "Source: General AI Model",
    type: "general",
  };
}
