/**
 * Faculty Teaching Timetable Data & Business Logic
 * Bounded strictly to Dr. Arjun Mehta's assigned courses, labs, and batches.
 * Synchronized with AttendanceTodayClasses.jsx, ClassesSidebarToday.jsx, and Faculty SOT.
 */

export const FACULTY_PROFILE = {
  name: "Dr. Arjun Mehta",
  role: "Associate Professor",
  department: "Department of Computer Science & Engineering",
  shortDept: "Dept. of CSE",
  employeeId: "EMP-CS-2018-04",
  email: "arjun.mehta@csmu.ac.in",
  cabin: "Room 214, A-Block (2nd Floor)",
  avatar: "/assets/profile/dr-arjun-mehta.jpg",
  academicYear: "2026–2027",
  semester: "Odd Semester (Autumn)",
  currentWeekNumber: 8,
  weekDateRange: "Oct 20 – Oct 25, 2026",
};

export const WEEK_DAYS = [
  { id: "Monday", short: "Mon", full: "Monday", index: 0 },
  { id: "Tuesday", short: "Tue", full: "Tuesday", index: 1 },
  { id: "Wednesday", short: "Wed", full: "Wednesday", index: 2 },
  { id: "Thursday", short: "Thu", full: "Thursday", index: 3 },
  { id: "Friday", short: "Fri", full: "Friday", index: 4 },
  { id: "Saturday", short: "Sat", full: "Saturday", index: 5 },
];

export const SUBJECT_FILTERS = [
  { id: "all", label: "All Subjects", code: "ALL" },
  { id: "CSE-301", label: "Data Structures & Algorithms", code: "CSE-301", short: "DSA" },
  { id: "CSE-302", label: "Web Development & Frameworks", code: "CSE-302", short: "Web Dev" },
  { id: "CSE-303", label: "Database Management Systems", code: "CSE-303", short: "DBMS" },
  { id: "CSE-304", label: "Computer Networks", code: "CSE-304", short: "CN" },
];

export const BATCH_FILTERS = [
  { id: "all", label: "All Batches" },
  { id: "CSE-5A", label: "B.Tech CSE 5th Sem (Batch A)" },
  { id: "CSE-5B", label: "B.Tech CSE 5th Sem (Batch B)" },
  { id: "CSE-7A", label: "B.Tech CSE 7th Sem (Batch A)" },
];

export const SESSION_TYPES = [
  { id: "all", label: "All Session Types" },
  { id: "Lecture", label: "Lecture" },
  { id: "Lab", label: "Lab / Practical" },
  { id: "Tutorial", label: "Tutorial" },
  { id: "Review", label: "Mentorship & Review" },
];

export const MASTER_SCHEDULE = [
  // --- MONDAY ---
  {
    id: "sch-mon-1",
    day: "Monday",
    dayIndex: 0,
    startTime: "09:00",
    endTime: "10:00",
    timeDisplay: "09:00 AM - 10:00 AM",
    durationMinutes: 60,
    durationHours: 1.0,
    courseCode: "CSE-301",
    subjectName: "Data Structures & Algorithms",
    shortSubject: "DSA",
    batch: "CSE-5A",
    semester: "5th Sem",
    sessionType: "Lecture",
    location: "Room 301, A-Block",
    roomShort: "A-301",
    roomType: "Smart Classroom",
    enrolledStudents: 64,
    syllabusUnit: "Unit 3: Balanced Search Trees",
    lectureTopic: "Binary Search Trees, AVL Trees & Self-Balancing Rotations",
    attendanceStatus: "Completed",
    attendanceRate: 95,
    notes: "Review AVL tree balance factor proofs; assign practice set 3.",
    colorTheme: "emerald",
  },
  {
    id: "sch-mon-2",
    day: "Monday",
    dayIndex: 0,
    startTime: "11:30",
    endTime: "12:30",
    timeDisplay: "11:30 AM - 12:30 PM",
    durationMinutes: 60,
    durationHours: 1.0,
    courseCode: "CSE-302",
    subjectName: "Web Development & Frameworks",
    shortSubject: "Web Dev",
    batch: "CSE-5B",
    semester: "5th Sem",
    sessionType: "Lecture",
    location: "Room 204, B-Block",
    roomShort: "B-204",
    roomType: "Smart Classroom",
    enrolledStudents: 58,
    syllabusUnit: "Unit 2: Modern Frontend Architecture",
    lectureTopic: "State Management Paradigms: Context API vs Global Stores",
    attendanceStatus: "Completed",
    attendanceRate: 91,
    notes: "Live code walkthrough of useReducer and custom hook patterns.",
    colorTheme: "blue",
  },
  {
    id: "sch-mon-3",
    day: "Monday",
    dayIndex: 0,
    startTime: "14:00",
    endTime: "15:00",
    timeDisplay: "02:00 PM - 03:00 PM",
    durationMinutes: 60,
    durationHours: 1.0,
    courseCode: "CSE-303",
    subjectName: "Database Management Systems",
    shortSubject: "DBMS",
    batch: "CSE-5A",
    semester: "5th Sem",
    sessionType: "Lecture",
    location: "Room 402, A-Block",
    roomShort: "A-402",
    roomType: "Lecture Theatre",
    enrolledStudents: 62,
    syllabusUnit: "Unit 3: Relational Database Design",
    lectureTopic: "Normalization: 2NF, 3NF and Boyce-Codd Normal Form (BCNF)",
    attendanceStatus: "Completed",
    attendanceRate: 89,
    notes: "Solve functional dependency decomposition problems on board.",
    colorTheme: "purple",
  },

  // --- TUESDAY ---
  {
    id: "sch-tue-1",
    day: "Tuesday",
    dayIndex: 1,
    startTime: "10:15",
    endTime: "11:15",
    timeDisplay: "10:15 AM - 11:15 AM",
    durationMinutes: 60,
    durationHours: 1.0,
    courseCode: "CSE-304",
    subjectName: "Computer Networks",
    shortSubject: "CN",
    batch: "CSE-5B",
    semester: "5th Sem",
    sessionType: "Lecture",
    location: "Room 405, B-Block",
    roomShort: "B-405",
    roomType: "Smart Classroom",
    enrolledStudents: 60,
    syllabusUnit: "Unit 3: Transport Layer Protocols",
    lectureTopic: "TCP 3-Way Handshake, Flow Control & Congestion Avoidance",
    attendanceStatus: "Completed",
    attendanceRate: 93,
    notes: "Wireshark packet capture demonstration of TCP SYN/ACK flags.",
    colorTheme: "amber",
  },
  {
    id: "sch-tue-2",
    day: "Tuesday",
    dayIndex: 1,
    startTime: "11:30",
    endTime: "13:30",
    timeDisplay: "11:30 AM - 01:30 PM",
    durationMinutes: 120,
    durationHours: 2.0,
    courseCode: "CSE-301",
    subjectName: "Data Structures & Algorithms",
    shortSubject: "DSA Lab",
    batch: "CSE-5A",
    semester: "5th Sem",
    sessionType: "Lab",
    location: "Turing Computing Lab, Ground Floor",
    roomShort: "Turing Lab",
    roomType: "Advanced Computing Lab",
    enrolledStudents: 32,
    syllabusUnit: "Lab Assignment #4: Heap Implementations",
    lectureTopic: "Min-Heap & Max-Heap Construction and Priority Queue in C++",
    attendanceStatus: "Completed",
    attendanceRate: 97,
    notes: "Inspect git commits and evaluate runtime complexity benchmarks.",
    colorTheme: "emerald",
  },
  {
    id: "sch-tue-3",
    day: "Tuesday",
    dayIndex: 1,
    startTime: "15:15",
    endTime: "16:15",
    timeDisplay: "03:15 PM - 04:15 PM",
    durationMinutes: 60,
    durationHours: 1.0,
    courseCode: "CSE-302",
    subjectName: "Web Development & Frameworks",
    shortSubject: "Web Dev",
    batch: "CSE-5B",
    semester: "5th Sem",
    sessionType: "Tutorial",
    location: "Room 204, B-Block",
    roomShort: "B-204",
    roomType: "Seminar Room",
    enrolledStudents: 58,
    syllabusUnit: "Unit 2: Tutorial Problems",
    lectureTopic: "Asynchronous JavaScript, Promise Chaining & Async/Await Debugging",
    attendanceStatus: "Completed",
    attendanceRate: 88,
    notes: "Small-group code peer-reviews and troubleshooting async race conditions.",
    colorTheme: "blue",
  },

  // --- WEDNESDAY ---
  {
    id: "sch-wed-1",
    day: "Wednesday",
    dayIndex: 2,
    startTime: "09:00",
    endTime: "10:00",
    timeDisplay: "09:00 AM - 10:00 AM",
    durationMinutes: 60,
    durationHours: 1.0,
    courseCode: "CSE-301",
    subjectName: "Data Structures & Algorithms",
    shortSubject: "DSA",
    batch: "CSE-5A",
    semester: "5th Sem",
    sessionType: "Lecture",
    location: "Room 301, A-Block",
    roomShort: "A-301",
    roomType: "Smart Classroom",
    enrolledStudents: 64,
    syllabusUnit: "Unit 4: Graph Data Structures",
    lectureTopic: "Graph Representations, Adjacency List & Matrix, BFS vs DFS",
    attendanceStatus: "Completed",
    attendanceRate: 92,
    notes: "Demonstrate cycle detection in directed graphs using Tarjan's algorithm.",
    colorTheme: "emerald",
  },
  {
    id: "sch-wed-2",
    day: "Wednesday",
    dayIndex: 2,
    startTime: "11:30",
    endTime: "12:30",
    timeDisplay: "11:30 AM - 12:30 PM",
    durationMinutes: 60,
    durationHours: 1.0,
    courseCode: "CSE-303",
    subjectName: "Database Management Systems",
    shortSubject: "DBMS",
    batch: "CSE-5A",
    semester: "5th Sem",
    sessionType: "Lecture",
    location: "Room 402, A-Block",
    roomShort: "A-402",
    roomType: "Lecture Theatre",
    enrolledStudents: 62,
    syllabusUnit: "Unit 4: Query Processing & Optimization",
    lectureTopic: "Relational Algebra Expressions & Heuristic Query Tree Optimization",
    attendanceStatus: "Completed",
    attendanceRate: 90,
    notes: "Analyze EXPLAIN ANALYZE query plans on PostgreSQL.",
    colorTheme: "purple",
  },
  {
    id: "sch-wed-3",
    day: "Wednesday",
    dayIndex: 2,
    startTime: "14:00",
    endTime: "16:00",
    timeDisplay: "02:00 PM - 04:00 PM",
    durationMinutes: 120,
    durationHours: 2.0,
    courseCode: "CSE-303",
    subjectName: "Database Management Systems",
    shortSubject: "DBMS Lab",
    batch: "CSE-5A",
    semester: "5th Sem",
    sessionType: "Lab",
    location: "Database Systems Lab 2, A-Block",
    roomShort: "DB Lab 2",
    roomType: "Specialized Laboratory",
    enrolledStudents: 32,
    syllabusUnit: "Lab Assignment #5: Triggers & PL/SQL",
    lectureTopic: "Row-Level Before/After Triggers and Stored Procedures with Cursors",
    attendanceStatus: "Completed",
    attendanceRate: 96,
    notes: "Evaluate individual student script execution and constraints audit.",
    colorTheme: "purple",
  },

  // --- THURSDAY (Matches AttendanceTodayClasses.jsx and ClassesSidebarToday.jsx!) ---
  {
    id: "sch-thu-1",
    day: "Thursday",
    dayIndex: 3,
    startTime: "09:00",
    endTime: "10:00",
    timeDisplay: "09:00 AM - 10:00 AM",
    durationMinutes: 60,
    durationHours: 1.0,
    courseCode: "CSE-301",
    subjectName: "Data Structures & Algorithms",
    shortSubject: "DSA",
    batch: "CSE-5A",
    semester: "5th Sem",
    sessionType: "Lecture",
    location: "Lab 2, A-Block",
    roomShort: "Lab 2",
    roomType: "Interactive Lab Classroom",
    enrolledStudents: 64,
    syllabusUnit: "Unit 4: Shortest Path Algorithms",
    lectureTopic: "Dijkstra’s Single Source Shortest Path & Priority Queue Optimization",
    attendanceStatus: "Ongoing",
    attendanceRate: 94,
    notes: "In-class live quiz on graph path relaxation; roll call in progress.",
    colorTheme: "emerald",
  },
  {
    id: "sch-thu-2",
    day: "Thursday",
    dayIndex: 3,
    startTime: "11:00",
    endTime: "12:00",
    timeDisplay: "11:00 AM - 12:00 PM",
    durationMinutes: 60,
    durationHours: 1.0,
    courseCode: "CSE-302",
    subjectName: "Web Development & Frameworks",
    shortSubject: "Web Dev",
    batch: "CSE-5B",
    semester: "5th Sem",
    sessionType: "Lecture",
    location: "Room 204, B-Block",
    roomShort: "B-204",
    roomType: "Smart Classroom",
    enrolledStudents: 58,
    syllabusUnit: "Unit 3: Fullstack Auth & Security",
    lectureTopic: "JSON Web Tokens (JWT), Refresh Token Rotation & HTTP-Only Cookies",
    attendanceStatus: "Upcoming",
    attendanceRate: null,
    notes: "Security demonstration on cross-site scripting (XSS) prevention.",
    colorTheme: "blue",
  },
  {
    id: "sch-thu-3",
    day: "Thursday",
    dayIndex: 3,
    startTime: "14:00",
    endTime: "15:00",
    timeDisplay: "02:00 PM - 03:00 PM",
    durationMinutes: 60,
    durationHours: 1.0,
    courseCode: "CSE-303",
    subjectName: "Database Management Systems",
    shortSubject: "DBMS",
    batch: "CSE-5A",
    semester: "5th Sem",
    sessionType: "Lecture",
    location: "Room 402, A-Block",
    roomShort: "A-402",
    roomType: "Lecture Theatre",
    enrolledStudents: 62,
    syllabusUnit: "Unit 5: Transaction Management & Concurrency",
    lectureTopic: "ACID Properties, Serializability Schedules & Two-Phase Locking (2PL)",
    attendanceStatus: "Upcoming",
    attendanceRate: null,
    notes: "Explain deadlocks, wait-die and wound-wait schemes.",
    colorTheme: "purple",
  },
  {
    id: "sch-thu-4",
    day: "Thursday",
    dayIndex: 3,
    startTime: "16:00",
    endTime: "17:00",
    timeDisplay: "04:00 PM - 05:00 PM",
    durationMinutes: 60,
    durationHours: 1.0,
    courseCode: "CSE-304",
    subjectName: "Computer Networks",
    shortSubject: "CN",
    batch: "CSE-5B",
    semester: "5th Sem",
    sessionType: "Lecture",
    location: "Room 405, B-Block",
    roomShort: "B-405",
    roomType: "Smart Classroom",
    enrolledStudents: 60,
    syllabusUnit: "Unit 4: Network Layer Addressing",
    lectureTopic: "IPv4 Addressing, Classless Inter-Domain Routing (CIDR) & Subnetting",
    attendanceStatus: "Upcoming",
    attendanceRate: null,
    notes: "Interactive subnet calculation exercise; collect homework #2.",
    colorTheme: "amber",
  },

  // --- FRIDAY ---
  {
    id: "sch-fri-1",
    day: "Friday",
    dayIndex: 4,
    startTime: "10:15",
    endTime: "11:15",
    timeDisplay: "10:15 AM - 11:15 AM",
    durationMinutes: 60,
    durationHours: 1.0,
    courseCode: "CSE-304",
    subjectName: "Computer Networks",
    shortSubject: "CN",
    batch: "CSE-5B",
    semester: "5th Sem",
    sessionType: "Lecture",
    location: "Room 405, B-Block",
    roomShort: "B-405",
    roomType: "Smart Classroom",
    enrolledStudents: 60,
    syllabusUnit: "Unit 5: Application Layer Protocols",
    lectureTopic: "Domain Name System (DNS), HTTP/2 vs HTTP/3, and TLS Cryptography",
    attendanceStatus: "Upcoming",
    attendanceRate: null,
    notes: "Inspect TLS 1.3 handshake packet exchange.",
    colorTheme: "amber",
  },
  {
    id: "sch-fri-2",
    day: "Friday",
    dayIndex: 4,
    startTime: "11:30",
    endTime: "12:30",
    timeDisplay: "11:30 AM - 12:30 PM",
    durationMinutes: 60,
    durationHours: 1.0,
    courseCode: "CSE-302",
    subjectName: "Web Development & Frameworks",
    shortSubject: "Web Dev",
    batch: "CSE-5B",
    semester: "5th Sem",
    sessionType: "Lecture",
    location: "Room 204, B-Block",
    roomShort: "B-204",
    roomType: "Smart Classroom",
    enrolledStudents: 58,
    syllabusUnit: "Unit 4: Production Deployment & Cloud",
    lectureTopic: "Containerization with Docker, Environment Configs & CI/CD Pipelines",
    attendanceStatus: "Upcoming",
    attendanceRate: null,
    notes: "Demonstrate multistage Dockerfile build for Next.js web application.",
    colorTheme: "blue",
  },
  {
    id: "sch-fri-3",
    day: "Friday",
    dayIndex: 4,
    startTime: "14:00",
    endTime: "16:00",
    timeDisplay: "02:00 PM - 04:00 PM",
    durationMinutes: 120,
    durationHours: 2.0,
    courseCode: "CSE-302",
    subjectName: "Web Development & Frameworks",
    shortSubject: "Web Dev Lab",
    batch: "CSE-5B",
    semester: "5th Sem",
    sessionType: "Lab",
    location: "Web Technologies Lab 4, B-Block",
    roomShort: "Web Lab 4",
    roomType: "Fullstack Development Lab",
    enrolledStudents: 29,
    syllabusUnit: "Lab Assignment #6: SSR & Database Integration",
    lectureTopic: "Server-Side Rendering (SSR) with Tailwind CSS and Mock API Endpoints",
    attendanceStatus: "Upcoming",
    attendanceRate: null,
    notes: "Evaluate group sprint deliverables and code standards compliance.",
    colorTheme: "blue",
  },

  // --- SATURDAY ---
  {
    id: "sch-sat-1",
    day: "Saturday",
    dayIndex: 5,
    startTime: "09:30",
    endTime: "11:30",
    timeDisplay: "09:30 AM - 11:30 AM",
    durationMinutes: 120,
    durationHours: 2.0,
    courseCode: "CSE-301",
    subjectName: "Data Structures & Algorithms",
    shortSubject: "DSA / DBMS Clinic",
    batch: "CSE-5A",
    semester: "5th Sem",
    sessionType: "Review",
    location: "Seminar Hall A, 3rd Floor",
    roomShort: "Seminar Hall A",
    roomType: "Auditorium & Seminar Hall",
    enrolledStudents: 75,
    syllabusUnit: "Academic Remedial & Doubt Clearing",
    lectureTopic: "Mid-Term Exam Remedial Clinic: Complexities, Trees & Dynamic Programming",
    attendanceStatus: "Upcoming",
    attendanceRate: null,
    notes: "Open attendance for students with <75% attendance or seeking score improvement.",
    colorTheme: "emerald",
  },
  {
    id: "sch-sat-2",
    day: "Saturday",
    dayIndex: 5,
    startTime: "12:00",
    endTime: "13:00",
    timeDisplay: "12:00 PM - 01:00 PM",
    durationMinutes: 60,
    durationHours: 1.0,
    courseCode: "CSE-7A",
    subjectName: "Major Capstone Project Mentorship",
    shortSubject: "Capstone Mentorship",
    batch: "CSE-7A",
    semester: "7th Sem",
    sessionType: "Review",
    location: "Room 214, A-Block (Faculty Cabin)",
    roomShort: "Cabin 214",
    roomType: "Faculty Office & Mentorship Room",
    enrolledStudents: 16,
    syllabusUnit: "Sprint 4 Review & Architecture Approval",
    lectureTopic: "Final-Year Project Architecture Audits & Industry Internship Sign-offs",
    attendanceStatus: "Upcoming",
    attendanceRate: null,
    notes: "Review student GitHub repos, API schemas, and deployment readiness.",
    colorTheme: "teal",
  },
];

export const FACULTY_SUBSTITUTE_CANDIDATES = [
  { id: "sub-1", name: "Prof. Rajesh Sharma", department: "Computer Science", courses: ["CSE-301", "CSE-303"] },
  { id: "sub-2", name: "Dr. Sunita Kulkarni", department: "Computer Science", courses: ["CSE-302"] },
  { id: "sub-3", name: "Prof. Amit Verma", department: "Information Technology", courses: ["CSE-304"] },
  { id: "sub-4", name: "Dr. Neha Gupta", department: "Computer Science", courses: ["CSE-301", "CSE-304"] },
];

/**
 * Calculates dynamic Schedule KPIs from the dataset
 */
export function calculateTimetableKPIs(scheduleList, activeDay = "Thursday") {
  const weeklyClassesCount = scheduleList.length;

  // Classes on the selected day
  const todayClasses = scheduleList.filter((c) => c.day.toLowerCase() === activeDay.toLowerCase());
  const todayClassesCount = todayClasses.length;

  // Total teaching hours this week
  const totalWeeklyMinutes = scheduleList.reduce((acc, curr) => acc + (curr.durationMinutes || 60), 0);
  const totalWeeklyHours = (totalWeeklyMinutes / 60).toFixed(1);

  // Next upcoming or ongoing class
  const ongoingClass = todayClasses.find((c) => c.attendanceStatus === "Ongoing");
  const upcomingClass = todayClasses.find((c) => c.attendanceStatus === "Upcoming") || scheduleList.find((c) => c.attendanceStatus === "Upcoming");

  const nextClass = ongoingClass || upcomingClass || scheduleList[0];

  return {
    weeklyClassesCount,
    todayClassesCount,
    totalWeeklyHours,
    nextClass,
    activeDay,
  };
}

/**
 * Filter schedule list by subject, batch, type, and search keyword
 */
export function filterScheduleEntries(scheduleList, filters = {}) {
  const { subject = "all", batch = "all", type = "all", search = "", day = null } = filters;
  const query = search.trim().toLowerCase();

  return scheduleList.filter((item) => {
    // Filter by day if specified
    if (day && day !== "all" && item.day.toLowerCase() !== day.toLowerCase()) {
      return false;
    }

    // Filter by subject
    if (subject !== "all" && item.courseCode !== subject) {
      return false;
    }

    // Filter by batch
    if (batch !== "all" && item.batch !== batch) {
      return false;
    }

    // Filter by session type
    if (type !== "all" && item.sessionType !== type) {
      return false;
    }

    // Search query
    if (query) {
      const matchSubject = item.subjectName.toLowerCase().includes(query);
      const matchCode = item.courseCode.toLowerCase().includes(query);
      const matchBatch = item.batch.toLowerCase().includes(query);
      const matchRoom = item.location.toLowerCase().includes(query) || item.roomShort.toLowerCase().includes(query);
      const matchTopic = item.lectureTopic.toLowerCase().includes(query) || item.syllabusUnit.toLowerCase().includes(query);

      if (!matchSubject && !matchCode && !matchBatch && !matchRoom && !matchTopic) {
        return false;
      }
    }

    return true;
  });
}
