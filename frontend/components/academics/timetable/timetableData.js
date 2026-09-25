// ─────────────────────────────────────────────────────────────────────────────
// timetableData.js
// Canonical dataset and utilities for Student Academic Timetable & Master Calendar
// ─────────────────────────────────────────────────────────────────────────────

export const SUBJECT_FILTER_OPTIONS = [
  { id: "all", label: "All Subjects", code: "ALL" },
  { id: "CSE-302-dsa", label: "Data Structures & Algorithms", code: "CSE-302" },
  { id: "CSE-101", label: "Web Development", code: "CSE-101" },
  { id: "CSE-302-dbms", label: "Database Management Systems", code: "CSE-302" },
  { id: "Lab-2", label: "Computer Networks Lab", code: "Lab-2" },
  { id: "Lab-1", label: "Web Development Lab", code: "Lab-1" },
  { id: "OEC-101", label: "AI & Ethics", code: "OEC-101" },
];

export const TYPE_FILTER_OPTIONS = [
  { id: "all", label: "All Items", icon: "Layers" },
  { id: "class", label: "Classes", icon: "BookOpen", color: "emerald" },
  { id: "exam", label: "Exams", icon: "GraduationCap", color: "amber" },
  { id: "assignment", label: "Assignments", icon: "FileText", color: "sky" },
  { id: "event", label: "Events", icon: "Calendar", color: "indigo" },
  { id: "notice", label: "Notices / Deadlines", icon: "Bell", color: "rose" },
  { id: "holiday", label: "Holidays", icon: "Sun", color: "emerald-alt" },
  { id: "reminder", label: "Reminders", icon: "Clock", color: "purple" },
];

// Recurring weekly timetable classes
// dayOfWeek: 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday, 0 = Sunday
export const RECURRING_CLASSES = [
  // MONDAY
  {
    id: "rec-mon-1",
    subjectCode: "CSE-302",
    subjectSlug: "CSE-302-dsa",
    subjectName: "Data Structures & Algorithms",
    shortName: "DSA",
    type: "Lecture",
    faculty: "Dr. Priya Sharma",
    room: "Room 301",
    building: "CS Block",
    dayOfWeek: 1,
    startTime: "09:00",
    endTime: "10:00",
    timeDisplay: "09:00 AM – 10:00 AM",
    color: "emerald",
  },
  {
    id: "rec-mon-2",
    subjectCode: "CSE-101",
    subjectSlug: "CSE-101",
    subjectName: "Web Development",
    shortName: "Web Dev",
    type: "Lecture",
    faculty: "Prof. Arjun Mehta",
    room: "Room 205",
    building: "CS Block",
    dayOfWeek: 1,
    startTime: "10:15",
    endTime: "11:15",
    timeDisplay: "10:15 AM – 11:15 AM",
    color: "sky",
  },
  {
    id: "rec-mon-3",
    subjectCode: "CSE-302",
    subjectSlug: "CSE-302-dbms",
    subjectName: "Database Management Systems",
    shortName: "DBMS",
    type: "Lecture",
    faculty: "Dr. Neha Kapoor",
    room: "Room 308",
    building: "CS Block",
    dayOfWeek: 1,
    startTime: "11:30",
    endTime: "12:45",
    timeDisplay: "11:30 AM – 12:45 PM",
    color: "purple",
  },
  {
    id: "rec-mon-4",
    subjectCode: "OEC-101",
    subjectSlug: "OEC-101",
    subjectName: "AI & Ethics",
    shortName: "AI & Ethics",
    type: "Lecture",
    faculty: "Dr. Rohan Desai",
    room: "Room A-05",
    building: "Main Academic Block",
    dayOfWeek: 1,
    startTime: "14:00",
    endTime: "15:30",
    timeDisplay: "02:00 PM – 03:30 PM",
    color: "amber",
  },

  // TUESDAY
  {
    id: "rec-tue-1",
    subjectCode: "CSE-302",
    subjectSlug: "CSE-302-dsa",
    subjectName: "Data Structures & Algorithms",
    shortName: "DSA Tutorial",
    type: "Tutorial",
    faculty: "Dr. Priya Sharma",
    room: "Room 301",
    building: "CS Block",
    dayOfWeek: 2,
    startTime: "09:00",
    endTime: "10:00",
    timeDisplay: "09:00 AM – 10:00 AM",
    color: "emerald",
  },
  {
    id: "rec-tue-2",
    subjectCode: "CSE-101",
    subjectSlug: "CSE-101",
    subjectName: "Web Development",
    shortName: "Web Dev",
    type: "Lecture",
    faculty: "Prof. Arjun Mehta",
    room: "Room 205",
    building: "CS Block",
    dayOfWeek: 2,
    startTime: "10:00",
    endTime: "11:30",
    timeDisplay: "10:00 AM – 11:30 AM",
    color: "sky",
  },
  {
    id: "rec-tue-3",
    subjectCode: "OEC-101",
    subjectSlug: "OEC-101",
    subjectName: "AI & Ethics",
    shortName: "AI & Ethics",
    type: "Lecture",
    faculty: "Dr. Rohan Desai",
    room: "Room A-05",
    building: "Main Academic Block",
    dayOfWeek: 2,
    startTime: "14:00",
    endTime: "15:30",
    timeDisplay: "02:00 PM – 03:30 PM",
    color: "amber",
  },

  // WEDNESDAY
  {
    id: "rec-wed-1",
    subjectCode: "CSE-302",
    subjectSlug: "CSE-302-dsa",
    subjectName: "Data Structures & Algorithms",
    shortName: "DSA",
    type: "Lecture",
    faculty: "Dr. Priya Sharma",
    room: "Room 301",
    building: "CS Block",
    dayOfWeek: 3,
    startTime: "09:00",
    endTime: "10:00",
    timeDisplay: "09:00 AM – 10:00 AM",
    color: "emerald",
  },
  {
    id: "rec-wed-2",
    subjectCode: "CSE-302",
    subjectSlug: "CSE-302-dbms",
    subjectName: "Database Management Systems",
    shortName: "DBMS",
    type: "Lecture",
    faculty: "Dr. Neha Kapoor",
    room: "Room 308",
    building: "CS Block",
    dayOfWeek: 3,
    startTime: "11:00",
    endTime: "12:30",
    timeDisplay: "11:00 AM – 12:30 PM",
    color: "purple",
  },
  {
    id: "rec-wed-3",
    subjectCode: "CSE-101",
    subjectSlug: "CSE-101",
    subjectName: "Web Development",
    shortName: "Web Dev",
    type: "Lecture",
    faculty: "Prof. Arjun Mehta",
    room: "Room 205",
    building: "CS Block",
    dayOfWeek: 3,
    startTime: "14:00",
    endTime: "15:30",
    timeDisplay: "02:00 PM – 03:30 PM",
    color: "sky",
  },

  // THURSDAY
  {
    id: "rec-thu-1",
    subjectCode: "CSE-101",
    subjectSlug: "CSE-101",
    subjectName: "Web Development",
    shortName: "Web Dev",
    type: "Lecture",
    faculty: "Prof. Arjun Mehta",
    room: "Room 205",
    building: "CS Block",
    dayOfWeek: 4,
    startTime: "10:00",
    endTime: "11:30",
    timeDisplay: "10:00 AM – 11:30 AM",
    color: "sky",
  },
  {
    id: "rec-thu-2",
    subjectCode: "Lab-2",
    subjectSlug: "Lab-2",
    subjectName: "Computer Networks Lab",
    shortName: "Networks Lab",
    type: "Lab",
    faculty: "Mr. Suresh Nair",
    room: "Room L-02",
    building: "Networks Lab — Block D",
    dayOfWeek: 4,
    startTime: "13:00",
    endTime: "16:00",
    timeDisplay: "01:00 PM – 04:00 PM",
    color: "teal",
  },

  // FRIDAY
  {
    id: "rec-fri-1",
    subjectCode: "CSE-302",
    subjectSlug: "CSE-302-dsa",
    subjectName: "Data Structures & Algorithms",
    shortName: "DSA",
    type: "Lecture",
    faculty: "Dr. Priya Sharma",
    room: "Room 301",
    building: "CS Block",
    dayOfWeek: 5,
    startTime: "09:00",
    endTime: "10:00",
    timeDisplay: "09:00 AM – 10:00 AM",
    color: "emerald",
  },
  {
    id: "rec-fri-2",
    subjectCode: "CSE-302",
    subjectSlug: "CSE-302-dbms",
    subjectName: "Database Management Systems",
    shortName: "DBMS",
    type: "Lecture",
    faculty: "Dr. Neha Kapoor",
    room: "Room 308",
    building: "CS Block",
    dayOfWeek: 5,
    startTime: "10:15",
    endTime: "11:15",
    timeDisplay: "10:15 AM – 11:15 AM",
    color: "purple",
  },
  {
    id: "rec-fri-3",
    subjectCode: "Lab-1",
    subjectSlug: "Lab-1",
    subjectName: "Web Development Lab",
    shortName: "Web Dev Lab",
    type: "Lab",
    faculty: "Ms. Pooja Iyer",
    room: "Room L-01",
    building: "Web Dev Lab — CS Block",
    dayOfWeek: 5,
    startTime: "13:00",
    endTime: "16:00",
    timeDisplay: "01:00 PM – 04:00 PM",
    color: "teal",
  },

  // SATURDAY
  {
    id: "rec-sat-1",
    subjectCode: "CSE-302",
    subjectSlug: "CSE-302-dbms",
    subjectName: "Database Management Systems",
    shortName: "DBMS Doubt Clearing",
    type: "Tutorial",
    faculty: "Dr. Neha Kapoor",
    room: "Room 308",
    building: "CS Block",
    dayOfWeek: 6,
    startTime: "10:00",
    endTime: "11:30",
    timeDisplay: "10:00 AM – 11:30 AM",
    color: "purple",
  },
  {
    id: "rec-sat-2",
    subjectCode: "OEC-101",
    subjectSlug: "OEC-101",
    subjectName: "AI & Ethics",
    shortName: "AI Ethics Seminar",
    type: "Tutorial",
    faculty: "Dr. Rohan Desai",
    room: "Room A-05",
    building: "Main Academic Block",
    dayOfWeek: 6,
    startTime: "14:00",
    endTime: "15:30",
    timeDisplay: "02:00 PM – 03:30 PM",
    color: "amber",
  },
];

// Dated master calendar items (Exams, Assignments, Events, Notices, Holidays)
export const MASTER_CALENDAR_ITEMS = [
  // ── EXAMS ──
  {
    id: "exam-mid-dsa",
    type: "exam",
    title: "DSA Mid-Sem Quiz & Assessment",
    subjectCode: "CSE-302",
    subjectSlug: "CSE-302-dsa",
    subjectName: "Data Structures & Algorithms",
    date: "2026-09-27",
    startTime: "11:00",
    endTime: "12:00",
    timeDisplay: "11:00 AM – 12:00 PM",
    venue: "CS Block — Room 301",
    room: "Room 301",
    examType: "Internal Assessment",
    duration: "60 mins",
    status: "Upcoming",
    description: "Units 1, 2 & 3 covering BST, AVL Trees, and Graph Traversal algorithms.",
  },
  {
    id: "exam-mid-dbms",
    type: "exam",
    title: "DBMS Mid-Sem Examination",
    subjectCode: "CSE-302",
    subjectSlug: "CSE-302-dbms",
    subjectName: "Database Management Systems",
    date: "2026-09-30",
    startTime: "11:00",
    endTime: "12:00",
    timeDisplay: "11:00 AM – 12:00 PM",
    venue: "Exam Hall B — Block C (Room B-204)",
    room: "Room B-204",
    examType: "Mid-Sem",
    duration: "60 mins",
    status: "Scheduled",
    description: "Formal Mid-Semester paper covering ER Modeling, SQL queries, and Normalization up to BCNF.",
  },
  {
    id: "exam-mid-webdev",
    type: "exam",
    title: "Web Development IA-2 Theory Test",
    subjectCode: "CSE-101",
    subjectSlug: "CSE-101",
    subjectName: "Web Development",
    date: "2026-10-05",
    startTime: "10:00",
    endTime: "11:30",
    timeDisplay: "10:00 AM – 11:30 AM",
    venue: "CS Block — Room 205",
    room: "Room 205",
    examType: "Internal Assessment",
    duration: "90 mins",
    status: "Upcoming",
    description: "React.js Hooks, Context API, Next.js routing, and modern CSS architecture.",
  },
  {
    id: "exam-prac-networks",
    type: "exam",
    title: "Computer Networks Lab Practical Exam",
    subjectCode: "Lab-2",
    subjectSlug: "Lab-2",
    subjectName: "Computer Networks Lab",
    date: "2026-10-08",
    startTime: "09:00",
    endTime: "12:00",
    timeDisplay: "09:00 AM – 12:00 PM",
    venue: "Networks Lab — Block D, Room L-02",
    room: "Room L-02",
    examType: "Practical Exam",
    duration: "3 hours",
    status: "Upcoming",
    description: "Hands-on Packet Tracer topology design, socket programming in C/Python, and viva voce.",
  },

  // ── ASSIGNMENTS ──
  {
    id: "asg-1",
    type: "assignment",
    title: "Build a Responsive Portfolio Website",
    subjectCode: "CSE-101",
    subjectSlug: "CSE-101",
    subjectName: "Web Development",
    date: "2026-09-25",
    startTime: "14:00",
    endTime: "23:59",
    timeDisplay: "02:00 PM (Due Today)",
    venue: "Online Submission Portal",
    room: "Portal",
    submissionStatus: "Pending",
    marks: 10,
    priority: "High Priority",
    description: "Next.js personal portfolio showcasing projects, GitHub integration, and contact form.",
  },
  {
    id: "asg-2",
    type: "assignment",
    title: "Implement Binary Search Tree & AVL Rotations",
    subjectCode: "CSE-302",
    subjectSlug: "CSE-302-dsa",
    subjectName: "Data Structures & Algorithms",
    date: "2026-09-28",
    startTime: "23:59",
    endTime: "23:59",
    timeDisplay: "11:59 PM",
    venue: "Online Submission Portal",
    room: "Portal",
    submissionStatus: "Pending",
    marks: 8,
    priority: "Medium Priority",
    description: "C++ implementation of self-balancing AVL trees with LL, RR, LR, RL rotation verification.",
  },
  {
    id: "asg-3",
    type: "assignment",
    title: "Design ER Diagram & 3NF Normalization",
    subjectCode: "CSE-302",
    subjectSlug: "CSE-302-dbms",
    subjectName: "Database Management Systems",
    date: "2026-10-02",
    startTime: "23:59",
    endTime: "23:59",
    timeDisplay: "11:59 PM",
    venue: "Online Submission Portal",
    room: "Portal",
    submissionStatus: "Upcoming",
    marks: 10,
    priority: "Medium Priority",
    description: "Hospital management schema design decomposed to Boyce-Codd Normal Form with SQL scripts.",
  },
  {
    id: "asg-4",
    type: "assignment",
    title: "Configure and Test Network Topology",
    subjectCode: "Lab-2",
    subjectSlug: "Lab-2",
    subjectName: "Computer Networks Lab",
    date: "2026-10-06",
    startTime: "23:59",
    endTime: "23:59",
    timeDisplay: "11:59 PM",
    venue: "Lab Journal Submission",
    room: "Room L-02",
    submissionStatus: "Upcoming",
    marks: 15,
    priority: "Normal",
    description: "Cisco Packet Tracer simulation with RIP routing, DHCP pool configuration, and Wireshark trace.",
  },

  // ── COLLEGE EVENTS ──
  {
    id: "event-1",
    type: "event",
    title: "College Hackathon 2026",
    subjectCode: "CAMPUS",
    subjectSlug: null,
    subjectName: "University Tech Council",
    date: "2026-09-28",
    startTime: "09:00",
    endTime: "18:00",
    timeDisplay: "09:00 AM – 06:00 PM",
    venue: "Main Auditorium & Innovation Labs",
    room: "Auditorium",
    category: "Hackathon",
    status: "Upcoming",
    description: "36-hour hackathon across AI, Web3, GreenTech and Smart Campus tracks with ₹1.5L prize pool.",
  },
  {
    id: "event-2",
    type: "event",
    title: "AI in Industry Workshop & Seminar",
    subjectCode: "OEC-101",
    subjectSlug: "OEC-101",
    subjectName: "AI & Ethics Department",
    date: "2026-10-03",
    startTime: "10:00",
    endTime: "13:00",
    timeDisplay: "10:00 AM – 01:00 PM",
    venue: "Seminar Hall A — Main Building",
    room: "Seminar Hall A",
    category: "Workshop",
    status: "Upcoming",
    description: "Keynote presentation by Google AI research team on Responsible LLMs and production RAG pipelines.",
  },
  {
    id: "event-3",
    type: "event",
    title: "GDSC Cloud Computing Bootcamp",
    subjectCode: "CAMPUS",
    subjectSlug: null,
    subjectName: "Google Developer Student Club",
    date: "2026-10-10",
    startTime: "09:30",
    endTime: "16:00",
    timeDisplay: "09:30 AM – 04:00 PM",
    venue: "CS Seminar Hall — Block B",
    room: "CS Hall",
    category: "Tech Talk",
    status: "Upcoming",
    description: "Hands-on labs on Google Cloud Platform, Kubernetes deployment, and microservices architecture.",
  },

  // ── NOTICES / DEADLINES ──
  {
    id: "not-1",
    type: "notice",
    title: "Mid-Semester Examination Registration Deadline",
    subjectCode: "ACAD",
    subjectSlug: null,
    subjectName: "Examination Cell",
    date: "2026-09-26",
    startTime: "17:00",
    endTime: "17:00",
    timeDisplay: "05:00 PM Strict Deadline",
    venue: "Exam Cell Portal",
    room: "Admin Block",
    category: "Exam Circular",
    status: "Action Required",
    description: "Last date to verify course exam enrollment, clear dues, and download Mid-Sem hall tickets.",
  },
  {
    id: "not-2",
    type: "notice",
    title: "Course Elective Drop/Add Deadline",
    subjectCode: "ACAD",
    subjectSlug: null,
    subjectName: "Dean Academic Office",
    date: "2026-09-29",
    startTime: "16:00",
    endTime: "16:00",
    timeDisplay: "04:00 PM Deadline",
    venue: "Student Academic ERP",
    room: "Admin Block",
    category: "Academic Policy",
    status: "Deadline",
    description: "Final cutoff to swap or drop open elective choices (OEC-101). No changes permitted afterwards.",
  },
  {
    id: "not-3",
    type: "notice",
    title: "Annual Hackathon Team Registration Closes",
    subjectCode: "CAMPUS",
    subjectSlug: null,
    subjectName: "Student Council",
    date: "2026-09-27",
    startTime: "23:59",
    endTime: "23:59",
    timeDisplay: "11:59 PM Deadline",
    venue: "Campus Connect Portal",
    room: "Online",
    category: "Competition",
    status: "Closing Soon",
    description: "Teams must finalize 4-member rosters with faculty mentor approval before midnight.",
  },

  // ── HOLIDAYS & NON-INSTRUCTION DAYS ──
  {
    id: "hol-prep-1",
    type: "holiday",
    title: "Reading & Exam Preparation Half-Day",
    subjectCode: "ACAD",
    subjectSlug: null,
    subjectName: "Academic Dean",
    date: "2026-09-29",
    startTime: "13:00",
    endTime: "18:00",
    timeDisplay: "Afternoon (No Classes)",
    venue: "Campus Library Open",
    room: "All Blocks",
    category: "Academic Break",
    status: "Holiday",
    description: "Afternoon instruction suspended to allow students to prepare for upcoming Mid-Sem examinations.",
  },
  {
    id: "hol-gandhi-jayanti",
    type: "holiday",
    title: "Gandhi Jayanti — Public Holiday",
    subjectCode: "HOLIDAY",
    subjectSlug: null,
    subjectName: "National Holiday",
    date: "2026-10-02",
    startTime: "00:00",
    endTime: "23:59",
    timeDisplay: "All Day — Campus Closed",
    venue: "University-wide",
    room: "No Classes",
    category: "Public Holiday",
    status: "Holiday",
    description: "College closed in observance of Gandhi Jayanti. No classes or academic activities scheduled.",
  },
  {
    id: "hol-break-1",
    type: "holiday",
    title: "Autumn Mid-Semester Break",
    subjectCode: "HOLIDAY",
    subjectSlug: null,
    subjectName: "College Academic Calendar",
    date: "2026-10-19",
    startTime: "00:00",
    endTime: "23:59",
    timeDisplay: "Oct 19 – Oct 24 (Vacation)",
    venue: "Campus Closed",
    room: "No Classes",
    category: "Vacation",
    status: "Holiday",
    description: "Mid-semester vacation. Regular academic lectures resume on Monday, October 26, 2026.",
  },
];

// Initial starter personal reminders
export const INITIAL_REMINDERS = [
  {
    id: "rem-1",
    title: "Revise DBMS Unit 3 — Normalization & BCNF",
    date: "2026-09-28",
    time: "20:00",
    timeDisplay: "08:00 PM",
    note: "Prepare 5 normalization numericals for Prof. Kapoor's mid-sem paper.",
    completed: false,
    createdAt: "2026-09-24T10:00:00.000Z",
  },
  {
    id: "rem-2",
    title: "Review Graph Shortest Path — Dijkstra & Bellman-Ford",
    date: "2026-09-25",
    time: "18:30",
    timeDisplay: "06:30 PM",
    note: "Run sample code test on Dijkstra priority queue edge cases.",
    completed: false,
    createdAt: "2026-09-23T14:30:00.000Z",
  },
  {
    id: "rem-3",
    title: "Print Admit Card for Mid-Sem Exams",
    date: "2026-09-26",
    time: "11:00",
    timeDisplay: "11:00 AM",
    note: "Collect physical stamp from Academic Department Room 102.",
    completed: true,
    createdAt: "2026-09-22T09:15:00.000Z",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DATE & SCHEDULE HELPER UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

// Format Date object to YYYY-MM-DD
export function formatDateKey(dateObj) {
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Parse YYYY-MM-DD safely into Date
export function parseDateKey(dateStr) {
  if (!dateStr) return new Date();
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Get the Monday of the week for a given date
export function getMondayOfWeek(d) {
  const date = new Date(d);
  const day = date.getDay();
  // If Sunday (0), distance is -6 days to get to previous Monday
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

// Get array of 6 days (Mon-Sat) or 7 days (Mon-Sun) starting from Monday
export function getWeekDates(mondayDate, includeSunday = true) {
  const days = [];
  const count = includeSunday ? 7 : 6;
  for (let i = 0; i < count; i++) {
    const nextDay = new Date(mondayDate);
    nextDay.setDate(mondayDate.getDate() + i);
    days.push(nextDay);
  }
  return days;
}

// Human readable date range label: "Sep 21 – Sep 27, 2026"
export function formatWeekRangeLabel(mondayDate) {
  const sundayDate = new Date(mondayDate);
  sundayDate.setDate(mondayDate.getDate() + 6);

  const startMonth = mondayDate.toLocaleString("en-US", { month: "short" });
  const endMonth = sundayDate.toLocaleString("en-US", { month: "short" });
  const startDay = mondayDate.getDate();
  const endDay = sundayDate.getDate();
  const startYear = mondayDate.getFullYear();
  const endYear = sundayDate.getFullYear();

  if (startMonth === endMonth && startYear === endYear) {
    return `${startMonth} ${startDay} – ${endDay}, ${startYear}`;
  }
  if (startYear === endYear) {
    return `${startMonth} ${startDay} – ${endMonth} ${endDay}, ${startYear}`;
  }
  return `${startMonth} ${startDay}, ${startYear} – ${endMonth} ${endDay}, ${endYear}`;
}

// Format Month label: "September 2026"
export function formatMonthLabel(dateObj) {
  return dateObj.toLocaleString("en-US", { month: "long", year: "numeric" });
}

// Format Day label: "Friday, Sep 25, 2026"
export function formatDayLabel(dateObj) {
  return dateObj.toLocaleString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Return all items that apply to a given dateKey (YYYY-MM-DD)
// Combines recurring classes for that day of week + dated master items + reminders
export function getItemsForDate(dateKey, reminders = []) {
  const dateObj = parseDateKey(dateKey);
  const dayOfWeek = dateObj.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat

  // Check if date has a full holiday
  const holidayItem = MASTER_CALENDAR_ITEMS.find(
    (item) => item.type === "holiday" && item.date === dateKey && item.status === "Holiday" && !item.title.includes("Half-Day")
  );

  const items = [];

  // If not a full-day campus closed holiday, generate recurring classes
  if (!holidayItem) {
    const dailyClasses = RECURRING_CLASSES.filter((c) => c.dayOfWeek === dayOfWeek).map((c) => ({
      ...c,
      id: `${c.id}-${dateKey}`,
      type: "class",
      date: dateKey,
      venue: `${c.building} — ${c.room}`,
    }));
    items.push(...dailyClasses);
  }

  // Add dated master items for this date
  const datedItems = MASTER_CALENDAR_ITEMS.filter((item) => item.date === dateKey);
  items.push(...datedItems);

  // Add active personal reminders for this date
  const dateReminders = reminders
    .filter((r) => r.date === dateKey)
    .map((r) => ({
      id: r.id,
      type: "reminder",
      title: r.title,
      subjectCode: "PERSONAL",
      subjectSlug: null,
      subjectName: "Personal Reminder",
      date: r.date,
      startTime: r.time,
      endTime: r.time,
      timeDisplay: r.timeDisplay || r.time,
      venue: "Student Notes",
      room: "Reminder",
      description: r.note,
      completed: r.completed,
    }));
  items.push(...dateReminders);

  // Sort chronologically by startTime
  items.sort((a, b) => (a.startTime || "00:00").localeCompare(b.startTime || "00:00"));

  return items;
}

// Check for timetable conflicts (classes that overlap in time on same date)
export function detectConflicts(items) {
  const classItems = items.filter((i) => i.type === "class");
  const conflicts = [];
  for (let i = 0; i < classItems.length; i++) {
    for (let j = i + 1; j < classItems.length; j++) {
      const a = classItems[i];
      const b = classItems[j];
      if (a.startTime < b.endTime && b.startTime < a.endTime) {
        conflicts.push({ itemA: a, itemB: b });
      }
    }
  }
  return conflicts;
}

// Detect busy pressure (2+ deadlines or exams on the same date)
export function getPressureForDate(items) {
  const highPriorityItems = items.filter(
    (i) => i.type === "exam" || i.type === "assignment" || (i.type === "notice" && i.status === "Deadline")
  );
  if (highPriorityItems.length >= 2) {
    return {
      isBusy: true,
      count: highPriorityItems.length,
      label: `${highPriorityItems.length} deadlines & exams`,
    };
  }
  return { isBusy: false, count: highPriorityItems.length, label: null };
}

// Given a list of items for today and current time (HH:MM), compute next class and ongoing class
export function computeClassStatus(todayClasses, currentTimeStr = "10:30") {
  if (!todayClasses || todayClasses.length === 0) {
    return { currentClass: null, nextClass: null, statusText: "No classes scheduled today." };
  }

  let currentClass = null;
  let nextClass = null;

  for (const item of todayClasses) {
    if (currentTimeStr >= item.startTime && currentTimeStr < item.endTime) {
      currentClass = item;
    } else if (currentTimeStr < item.startTime) {
      if (!nextClass) {
        nextClass = item;
      }
    }
  }

  let statusText = "No more classes today.";
  if (currentClass) {
    statusText = `Currently in class: ${currentClass.shortName || currentClass.subjectCode}`;
  } else if (nextClass) {
    statusText = `Next class at ${nextClass.timeDisplay || nextClass.startTime}`;
  }

  return { currentClass, nextClass, statusText };
}
