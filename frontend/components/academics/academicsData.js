export const ACADEMIC_OVERVIEW = {
  cgpa: 8.24,
  currentSem: 7,
  totalCreditsCompleted: 142,
  totalCreditsRequired: 160,
  attendancePercentage: 78,
  backlogs: 3,
};

export const PERFORMANCE_TREND = [
  { semester: "Sem 1", gpa: 7.1 },
  { semester: "Sem 2", gpa: 7.4 },
  { semester: "Sem 3", gpa: 7.8 },
  { semester: "Sem 4", gpa: 8.0 },
  { semester: "Sem 5", gpa: 8.2 },
  { semester: "Sem 6", gpa: 8.1 },
  { semester: "Sem 7", gpa: 8.24 },
];

export const CURRENT_SEMESTER_SUBJECTS = [
  {
    id: "sub-1",
    name: "Data Structures & Algorithms",
    code: "CSE-302",
    credits: 4,
    progress: 92,
    grade: "A",
    icon: "code",
  },
  {
    id: "sub-2",
    name: "Web Development",
    code: "CSE-101",
    credits: 4,
    progress: 86,
    grade: "A-",
    icon: "globe",
  },
  {
    id: "sub-3",
    name: "Database Management Systems",
    code: "CSE-302",
    credits: 4,
    progress: 82,
    grade: "B+",
    icon: "database",
  },
  {
    id: "sub-4",
    name: "Computer Networks Lab",
    code: "Lab-2",
    credits: 2,
    progress: 95,
    grade: "A",
    icon: "flask",
  },
  {
    id: "sub-5",
    name: "Web Development Lab",
    code: "Lab-1",
    credits: 2,
    progress: 90,
    grade: "A-",
    icon: "laptop",
  },
  {
    id: "sub-6",
    name: "Elective / Open Elective",
    code: "OEC-101",
    credits: 3,
    progress: 78,
    grade: "B+",
    icon: "star",
  },
];

export const SEMESTER_GRADES = [
  { id: "sg-1", subject: "DSA", credits: 4, grade: "A", status: "Completed" },
  { id: "sg-2", subject: "Web Development", credits: 4, grade: "A-", status: "Completed" },
  { id: "sg-3", subject: "DBMS", credits: 4, grade: "B+", status: "Completed" },
  { id: "sg-4", subject: "CN Lab", credits: 2, grade: "A", status: "Completed" },
  { id: "sg-5", subject: "Web Dev Lab", credits: 2, grade: "A-", status: "Completed" },
  { id: "sg-6", subject: "Elective", credits: 3, grade: "B+", status: "Completed" },
];

export const RESULTS_AND_GRADE_CARD = [
  { semester: "Sem 1", status: "Completed", cgpa: 7.1, downloadable: true },
  { semester: "Sem 2", status: "Completed", cgpa: 7.4, downloadable: true },
  { semester: "Sem 3", status: "Completed", cgpa: 7.8, downloadable: true },
  { semester: "Sem 4", status: "Completed", cgpa: 8.0, downloadable: true },
  { semester: "Sem 5", status: "Completed", cgpa: 8.2, downloadable: true },
  { semester: "Sem 6", status: "Completed", cgpa: 8.1, downloadable: true },
  { semester: "Sem 7", status: "In Progress", cgpa: 8.24, downloadable: false },
];

export const UPCOMING_EXAMS = [
  {
    id: "exam-1",
    day: "20",
    month: "AUG",
    name: "Data Structures & Algorithms",
    code: "CSE-302",
    time: "10:00 AM - 01:00 PM",
    type: "Theory",
  },
  {
    id: "exam-2",
    day: "24",
    month: "AUG",
    name: "Web Development",
    code: "CSE-101",
    time: "10:00 AM - 01:00 PM",
    type: "Theory",
  },
  {
    id: "exam-3",
    day: "28",
    month: "AUG",
    name: "Database Management Systems",
    code: "CSE-302",
    time: "10:00 AM - 01:00 PM",
    type: "Theory",
  },
  {
    id: "exam-4",
    day: "02",
    month: "SEP",
    name: "Computer Networks",
    code: "Lab-2",
    time: "09:00 AM - 12:00 PM",
    type: "Practical",
  },
];

export const ACADEMIC_NOTICES = [
  {
    id: "not-1",
    title: "Final Year Project Guidelines Released",
    date: "18 Aug 2025",
  },
  {
    id: "not-2",
    title: "Revised Exam Schedule (Odd Semester)",
    date: "16 Aug 2025",
  },
  {
    id: "not-3",
    title: "Library Timings Extended",
    date: "12 Aug 2025",
  },
  {
    id: "not-4",
    title: "College Fest Registration is Live",
    date: "10 Aug 2025",
  },
];

export const QUICK_ACTIONS = [
  { id: "qa-1", label: "View Marks", icon: "marks", target: "academics-marks" },
  { id: "qa-2", label: "View Attendance", icon: "attendance", target: "academics-attendance" },
  { id: "qa-3", label: "Download Grade Card", icon: "download", target: "download-grade-card" },
  { id: "qa-4", label: "Apply for Revaluation", icon: "revaluation", target: "revaluation-modal" },
  { id: "qa-5", label: "Academic Calendar", icon: "calendar", target: "academics-calendar" },
];

export const CAMPUS_AI_PROMPTS = [
  "What's the attendance policy?",
  "When is the next assignment due?",
  "Tell me about placement opportunities?",
];
